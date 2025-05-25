import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { createClient } from '@/lib/supabase/server'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { prompt } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
    }

    // Generate landing page content using AI
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are an expert landing page designer. Generate a complete landing page structure based on the user's prompt. 
          Return a JSON object with the following structure:
          {
            "title": "Page title",
            "slug": "url-friendly-slug",
            "description": "Brief description",
            "hero": {
              "headline": "Main headline",
              "subheadline": "Supporting text",
              "ctaText": "Call to action button text",
              "imagePrompt": "Description for hero image"
            },
            "features": [
              {
                "title": "Feature title",
                "description": "Feature description",
                "icon": "icon name (e.g., 'rocket', 'shield', 'zap')"
              }
            ],
            "benefits": {
              "headline": "Benefits section headline",
              "items": ["Benefit 1", "Benefit 2", "Benefit 3"]
            },
            "cta": {
              "headline": "Final CTA headline",
              "subheadline": "Supporting text",
              "buttonText": "CTA button text"
            },
            "style": {
              "primaryColor": "hex color",
              "theme": "modern|minimal|bold|playful"
            }
          }`
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.8,
    })

    const pageData = JSON.parse(completion.choices[0].message.content || '{}')
    
    // Save to database
    const { data, error } = await supabase
      .from('landing_pages')
      .insert({
        user_id: user.id,
        title: pageData.title,
        slug: pageData.slug,
        description: pageData.description,
        content: pageData,
        published: true
      })
      .select()
      .single()

    if (error) {
      // If slug already exists, add a random number
      if (error.code === '23505') {
        pageData.slug = `${pageData.slug}-${Math.random().toString(36).substr(2, 9)}`
        const { data: retryData, error: retryError } = await supabase
          .from('landing_pages')
          .insert({
            user_id: user.id,
            title: pageData.title,
            slug: pageData.slug,
            description: pageData.description,
            content: pageData,
            published: true
          })
          .select()
          .single()
        
        if (retryError) {
          throw retryError
        }
        return NextResponse.json(retryData)
      }
      throw error
    }

    return NextResponse.json(data)
  } catch (error: any) {
    console.error('Error generating landing page:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to generate landing page' },
      { status: 500 }
    )
  }
}
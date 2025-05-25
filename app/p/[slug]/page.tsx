import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import LandingPageTemplate from './template'

export default async function LandingPage({ params }: { params: { slug: string } }) {
  const supabase = await createClient()
  
  const { data: page, error } = await supabase
    .from('landing_pages')
    .select('*')
    .eq('slug', params.slug)
    .eq('published', true)
    .single()

  if (error || !page) {
    notFound()
  }

  return <LandingPageTemplate page={page} />
}
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { PlusCircle, Globe, Eye, Trash2, Loader2, Copy, ExternalLink, Sparkles } from 'lucide-react'
import { toast } from 'sonner'

interface LandingPage {
  id: string
  title: string
  description: string
  slug: string
  content: any
  created_at: string
  published: boolean
}

export default function DashboardPage() {
  const router = useRouter()
  const supabase = createClient()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [landingPages, setLandingPages] = useState<LandingPage[]>([])
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [creating, setCreating] = useState(false)
  const [prompt, setPrompt] = useState('')

  useEffect(() => {
    checkUser()
    fetchLandingPages()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  async function checkUser() {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/')
      } else {
        setUser(user)
      }
    } catch (error) {
      console.error('Error:', error)
      router.push('/')
    } finally {
      setLoading(false)
    }
  }

  async function fetchLandingPages() {
    try {
      const response = await fetch('/api/landing-pages')
      if (response.ok) {
        const data = await response.json()
        setLandingPages(data)
      }
    } catch (error) {
      console.error('Error fetching landing pages:', error)
    }
  }

  async function generateLandingPage() {
    if (!prompt.trim()) {
      toast.error('Please describe your landing page idea')
      return
    }

    setCreating(true)
    try {
      const response = await fetch('/api/generate-landing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate landing page')
      }

      const newPage = await response.json()
      setLandingPages([newPage, ...landingPages])
      setShowCreateForm(false)
      setPrompt('')
      toast.success('Landing page created successfully!')
    } catch (error) {
      console.error('Error creating landing page:', error)
      toast.error('Failed to create landing page')
    } finally {
      setCreating(false)
    }
  }

  async function deletePage(id: string) {
    if (confirm('Are you sure you want to delete this landing page?')) {
      try {
        const response = await fetch(`/api/landing-pages?id=${id}`, {
          method: 'DELETE',
        })
        
        if (response.ok) {
          setLandingPages(landingPages.filter(page => page.id !== id))
          toast.success('Landing page deleted')
        } else {
          throw new Error('Failed to delete')
        }
      } catch (error) {
        console.error('Error deleting page:', error)
        toast.error('Failed to delete landing page')
      }
    }
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text)
    toast.success('Copied to clipboard')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 max-w-7xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Your Landing Pages</h1>
          <p className="text-muted-foreground mt-2">Create beautiful landing pages with AI in seconds</p>
        </div>
        <Button onClick={() => setShowCreateForm(true)} size="lg">
          <PlusCircle className="mr-2 h-5 w-5" />
          Create New Page
        </Button>
      </div>

      {showCreateForm && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Generate New Landing Page</CardTitle>
            <CardDescription>Describe your business or idea, and AI will create a stunning landing page</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="prompt">What's your landing page about?</Label>
                <Textarea
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Example: A SaaS tool that helps developers automate their deployment process. It should have a modern, tech-focused design with features like CI/CD integration, monitoring, and team collaboration."
                  rows={4}
                  className="resize-none"
                />
                <p className="text-sm text-muted-foreground">
                  Be as specific as you like - mention your business type, target audience, key features, design preferences, etc.
                </p>
              </div>

              <div className="flex gap-4 pt-4">
                <Button 
                  onClick={generateLandingPage} 
                  disabled={creating || !prompt.trim()}
                  size="lg"
                  className="flex-1"
                >
                  {creating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating with AI...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate Landing Page
                    </>
                  )}
                </Button>
                <Button variant="outline" onClick={() => {
                  setShowCreateForm(false)
                  setPrompt('')
                }} size="lg">
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {landingPages.map((page) => (
          <Card key={page.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="line-clamp-1">{page.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{page.description}</CardDescription>
                </div>
                <Globe className="h-5 w-5 text-muted-foreground flex-shrink-0" />
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Created: {new Date(page.created_at).toLocaleDateString()}</span>
                  {page.published && (
                    <span className="text-green-600 font-medium">• Live</span>
                  )}
                </div>
                
                <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
                  <span className="text-sm truncate flex-1">
                    {typeof window !== 'undefined' ? `${window.location.origin}/p/${page.slug}` : `/p/${page.slug}`}
                  </span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(`${window.location.origin}/p/${page.slug}`)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => window.open(`/p/${page.slug}`, '_blank')}
                  >
                    <Eye className="mr-2 h-3 w-3" />
                    View
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => deletePage(page.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {landingPages.length === 0 && !showCreateForm && (
          <Card className="col-span-full">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <Globe className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No landing pages yet</h3>
              <p className="text-muted-foreground mb-6 text-center">
                Create your first AI-powered landing page in seconds
              </p>
              <Button onClick={() => setShowCreateForm(true)} size="lg">
                <PlusCircle className="mr-2 h-5 w-5" />
                Create Your First Page
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
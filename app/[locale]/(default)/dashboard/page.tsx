'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { PlusCircle, Globe, Eye, Download, Trash2, Loader2, Copy, ExternalLink } from 'lucide-react'
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
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    businessType: '',
    targetAudience: '',
    features: '',
    callToAction: ''
  })

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
    // TODO: Fetch from database
    setLandingPages([])
  }

  async function generateLandingPage() {
    setCreating(true)
    try {
      // TODO: Call AI API to generate landing page
      const slug = formData.title.toLowerCase().replace(/\s+/g, '-')
      const newPage: LandingPage = {
        id: Date.now().toString(),
        title: formData.title,
        description: formData.description,
        slug: slug,
        content: {
          hero: {
            title: formData.title,
            subtitle: formData.description,
            cta: formData.callToAction
          },
          features: formData.features.split(',').map(f => f.trim()),
          targetAudience: formData.targetAudience,
          businessType: formData.businessType
        },
        created_at: new Date().toISOString(),
        published: false
      }
      
      setLandingPages([...landingPages, newPage])
      setShowCreateForm(false)
      setFormData({
        title: '',
        description: '',
        businessType: '',
        targetAudience: '',
        features: '',
        callToAction: ''
      })
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
      setLandingPages(landingPages.filter(page => page.id !== id))
      toast.success('Landing page deleted')
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
          <h1 className="text-3xl font-bold">Landing Page Generator</h1>
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
            <CardDescription>Fill in your business details and let AI create your landing page</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Business Name</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="My Awesome Business"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="description">Tagline / Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="The best solution for your needs..."
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="businessType">Business Type</Label>
                  <Input
                    id="businessType"
                    value={formData.businessType}
                    onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                    placeholder="SaaS, E-commerce, Agency..."
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="targetAudience">Target Audience</Label>
                  <Input
                    id="targetAudience"
                    value={formData.targetAudience}
                    onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                    placeholder="Developers, Small businesses..."
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="features">Key Features (comma separated)</Label>
                <Input
                  id="features"
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  placeholder="Fast delivery, 24/7 support, Easy to use..."
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="callToAction">Call to Action Text</Label>
                <Input
                  id="callToAction"
                  value={formData.callToAction}
                  onChange={(e) => setFormData({ ...formData, callToAction: e.target.value })}
                  placeholder="Get Started Now"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button 
                  onClick={generateLandingPage} 
                  disabled={creating || !formData.title || !formData.description}
                  size="lg"
                  className="flex-1"
                >
                  {creating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Globe className="mr-2 h-4 w-4" />
                      Generate Landing Page
                    </>
                  )}
                </Button>
                <Button variant="outline" onClick={() => setShowCreateForm(false)} size="lg">
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
                    <span className="text-green-600 font-medium">• Published</span>
                  )}
                </div>
                
                <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
                  <Input 
                    value={`${window.location.origin}/p/${page.slug}`}
                    readOnly
                    className="text-sm"
                  />
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(`${window.location.origin}/p/${page.slug}`)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Eye className="mr-2 h-3 w-3" />
                    Preview
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Download className="mr-2 h-3 w-3" />
                    Export
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
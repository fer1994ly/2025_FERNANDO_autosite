'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { PlusCircle, Globe, Edit, Trash2, Loader2 } from 'lucide-react'
import { useTranslations } from 'next-intl'

interface LandingPage {
  id: string
  title: string
  description: string
  url: string
  created_at: string
}

export default function DashboardPage() {
  const router = useRouter()
  const t = useTranslations('public.auth')
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
    primaryColor: '#000000'
  })

  useEffect(() => {
    checkUser()
    fetchLandingPages()
  }, [])

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
    // Simulated data for now
    setLandingPages([
      {
        id: '1',
        title: 'My First Landing Page',
        description: 'A beautiful landing page for my startup',
        url: 'https://example.com/landing1',
        created_at: new Date().toISOString()
      }
    ])
  }

  async function createLandingPage() {
    setCreating(true)
    try {
      // Here you would call your AI API to generate the landing page
      // For now, we'll simulate it
      const newPage: LandingPage = {
        id: Date.now().toString(),
        title: formData.title,
        description: formData.description,
        url: `https://example.com/${formData.title.toLowerCase().replace(/\s+/g, '-')}`,
        created_at: new Date().toISOString()
      }
      
      setLandingPages([...landingPages, newPage])
      setShowCreateForm(false)
      setFormData({
        title: '',
        description: '',
        businessType: '',
        targetAudience: '',
        primaryColor: '#000000'
      })
    } catch (error) {
      console.error('Error creating landing page:', error)
    } finally {
      setCreating(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Landing Page Dashboard</h1>
          <p className="text-muted-foreground mt-2">Create and manage your AI-generated landing pages</p>
        </div>
        <Button onClick={() => setShowCreateForm(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New Page
        </Button>
      </div>

      {showCreateForm && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Create New Landing Page</CardTitle>
            <CardDescription>Fill in the details and let AI generate your landing page</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Page Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="My Awesome Product"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe what your product or service does..."
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="businessType">Business Type</Label>
                <Input
                  id="businessType"
                  value={formData.businessType}
                  onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                  placeholder="SaaS, E-commerce, Agency, etc."
                />
              </div>
              <div>
                <Label htmlFor="targetAudience">Target Audience</Label>
                <Input
                  id="targetAudience"
                  value={formData.targetAudience}
                  onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                  placeholder="Developers, Small businesses, etc."
                />
              </div>
              <div>
                <Label htmlFor="primaryColor">Primary Color</Label>
                <Input
                  id="primaryColor"
                  type="color"
                  value={formData.primaryColor}
                  onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                />
              </div>
              <div className="flex gap-4">
                <Button onClick={createLandingPage} disabled={creating || !formData.title}>
                  {creating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    'Generate Landing Page'
                  )}
                </Button>
                <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {landingPages.map((page) => (
          <Card key={page.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="truncate">{page.title}</span>
                <Globe className="h-4 w-4 text-muted-foreground" />
              </CardTitle>
              <CardDescription>{page.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Created: {new Date(page.created_at).toLocaleDateString()}
                </p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Edit className="mr-2 h-3 w-3" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    Preview
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {landingPages.length === 0 && !showCreateForm && (
          <Card className="col-span-full">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Globe className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No landing pages yet</h3>
              <p className="text-muted-foreground mb-4">Create your first AI-generated landing page</p>
              <Button onClick={() => setShowCreateForm(true)}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Your First Page
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
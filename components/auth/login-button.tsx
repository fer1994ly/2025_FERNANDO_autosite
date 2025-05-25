'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { createClient } from "@/utils/supabase/client"
import { User } from '@supabase/supabase-js'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useTranslations } from 'next-intl'
import { toast } from "sonner"
import EmailAuthForm from './email-auth-form'

type UserProfile = {
  credits: number;
}

export default function LoginButton() {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [credits, setCredits] = useState<number | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)
  const [showAuthDialog, setShowAuthDialog] = useState(false)
  const supabase = createClient()
  const t = useTranslations('public.auth')

  // Fetch user profile from server
  const fetchUserProfile = useCallback(async () => {
    try {
      const response = await fetch('/api/profile')
      if (!response.ok) {
        throw new Error('Failed to fetch profile')
      }
      const data: UserProfile = await response.json()
      setCredits(data.credits)
    } catch (error) {
      console.error('Error fetching user profile:', error)
      toast.error('Failed to fetch user profile')
    }
  }, [])

  // Check and create user profile
  const checkAndCreateProfile = useCallback(async () => {
    try {
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Failed to create profile')
      }
      
      await fetchUserProfile()
    } catch (error) {
      console.error('Error checking/creating profile:', error)
      toast.error('Failed to create user profile')
    }
  }, [fetchUserProfile])

  // Initialize user session
  const initializeSession = useCallback(async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error && error.message === 'Auth session missing!') {
        setUser(null)
        return
      }
      if (error) throw error
      
      setUser(user)
      if (user) {
        await checkAndCreateProfile()
      }
    } catch (error: any) {
      console.error('Error initializing session:', error)
      if (error.message !== 'Auth session missing!') {
        toast.error('Failed to initialize session')
      }
    } finally {
      setIsInitialized(true)
    }
  }, [supabase.auth, checkAndCreateProfile])

  useEffect(() => {
    initializeSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN') {
        setUser(session?.user ?? null)
        if (session?.user) {
          await checkAndCreateProfile()
        }
        setShowAuthDialog(false)
      } else if (event === 'SIGNED_OUT') {
        setUser(null)
        setCredits(null)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase.auth, checkAndCreateProfile, initializeSession])

  const handleSignOut = async () => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      toast.success('Signed out successfully')
    } catch (error) {
      console.error('Error signing out:', error)
      toast.error('Failed to sign out')
    } finally {
      setLoading(false)
    }
  }

  // Show loading state while initializing
  if (!isInitialized) {
    return <Button variant="ghost" disabled>Loading...</Button>
  }

  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="w-full flex items-center justify-center gap-2"
          >
            <Avatar className="h-6 w-6">
              <AvatarImage 
                src={user.user_metadata?.avatar_url} 
                alt={user.user_metadata?.full_name || user.email} 
              />
              <AvatarFallback>
                {user.email?.[0]?.toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            <span className="truncate max-w-[150px]">
              {user.email}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <div className="flex items-center justify-start gap-2 p-2">
            <div className="flex flex-col space-y-1 leading-none">
              {user.email && (
                <p className="w-[200px] truncate text-sm text-muted-foreground">
                  {user.email}
                </p>
              )}
              {credits !== null && (
                <p className="text-sm text-muted-foreground">
                  Credits: {credits}
                </p>
              )}
            </div>
          </div>
          <DropdownMenuItem
            className="cursor-pointer text-red-600 focus:text-red-600"
            onClick={handleSignOut}
          >
            {t('signOut')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <>
      <Button
        onClick={() => setShowAuthDialog(true)}
        disabled={loading}
        variant="outline"
      >
        {t('signIn')}
      </Button>
      <EmailAuthForm 
        open={showAuthDialog}
        onOpenChange={setShowAuthDialog}
      />
    </>
  )
}
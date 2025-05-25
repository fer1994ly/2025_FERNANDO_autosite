'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createClient } from "@/utils/supabase/client"
import { useTranslations } from 'next-intl'
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface EmailAuthFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function EmailAuthForm({ open, onOpenChange }: EmailAuthFormProps) {
  const [loading, setLoading] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const supabase = createClient()
  const t = useTranslations('public.auth')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (isSignUp) {
        // Sign up
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          }
        })

        if (error) throw error

        if (data?.user?.identities?.length === 0) {
          toast.error('An account with this email already exists')
          return
        }

        toast.success('Check your email for the confirmation link!')
        onOpenChange(false)
      } else {
        // Sign in
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error) throw error

        toast.success('Signed in successfully!')
        onOpenChange(false)
      }
    } catch (error: any) {
      console.error('Auth error:', error)
      toast.error(error.message || 'Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isSignUp ? t('signUp') : t('signIn')}</DialogTitle>
          <DialogDescription>
            {isSignUp 
              ? (t.has('signUpDescription') ? t('signUpDescription') : 'Create an account to get started')
              : (t.has('signInDescription') ? t('signInDescription') : 'Enter your email and password to sign in')}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              minLength={6}
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading 
              ? (isSignUp ? (t.has('signingUp') ? t('signingUp') : 'Creating account...') : t('signingIn'))
              : (isSignUp ? (t.has('signUp') ? t('signUp') : 'Sign up') : t('signIn'))}
          </Button>
          <div className="text-center text-sm">
            {isSignUp ? (
              <>
                {t.has('alreadyHaveAccount') ? t('alreadyHaveAccount') : 'Already have an account?'}{' '}
                <button
                  type="button"
                  onClick={() => setIsSignUp(false)}
                  className="text-primary hover:underline"
                >
                  {t('signIn')}
                </button>
              </>
            ) : (
              <>
                {t.has('dontHaveAccount') ? t('dontHaveAccount') : "Don't have an account?"}{' '}
                <button
                  type="button"
                  onClick={() => setIsSignUp(true)}
                  className="text-primary hover:underline"
                >
                  {t.has('signUp') ? t('signUp') : 'Sign up'}
                </button>
              </>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, AlertCircle, Loader2, Lock } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const supabase = createClient()

      // Sign in the user
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      })

      if (authError) throw authError

      // Check if user has admin role
      if (data.user) {
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .single()

        if (profileError) throw profileError

        // Verify admin role
        if (profile?.role !== 'admin') {
          // Sign out non-admin users
          await supabase.auth.signOut()
          setError('Access denied. Admin credentials required.')
          setIsLoading(false)
          return
        }

        // Redirect to admin dashboard
        router.push('/admin/dashboard')
      }
    } catch (err: unknown) {
      console.error('[v0] Admin login error:', err)
      setError(err instanceof Error ? err.message : 'Invalid admin credentials')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <Card className="w-full max-w-md shadow-2xl border-slate-700 bg-slate-800/50 backdrop-blur">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-red-900/30 border-2 border-red-800">
            <Shield className="size-8 text-red-500" />
          </div>
          <CardTitle className="text-3xl font-bold text-white">Admin Access</CardTitle>
          <CardDescription className="text-slate-300">
            Restricted area - Administrator credentials required
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex items-start gap-2 rounded-md bg-red-950/50 p-3 text-sm text-red-200 border border-red-800">
                <AlertCircle className="size-5 shrink-0 mt-0.5" />
                <p>{error}</p>
              </div>
            )}

            <div className="rounded-lg bg-amber-950/30 p-3 border border-amber-800/50">
              <div className="flex items-start gap-2">
                <Lock className="size-5 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-sm text-amber-200">
                  This login is restricted to authorized administrators only. Unauthorized access attempts are logged and monitored.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-200">Admin Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="admin@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isLoading}
                autoComplete="email"
                className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-200">Admin Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={isLoading}
                autoComplete="current-password"
                className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <Shield className="mr-2 size-4" />
                  Admin Sign In
                </>
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <div className="w-full border-t border-slate-700" />
          <div className="text-center text-sm text-slate-400">
            Not an admin?{' '}
            <Link
              href="/auth/login"
              className="text-blue-400 hover:text-blue-300 font-medium underline underline-offset-4"
            >
              Regular Login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

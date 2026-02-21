'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, Mail, Sprout, Tractor } from 'lucide-react'

export default function SignupSuccessPage() {
  const searchParams = useSearchParams()
  const role = searchParams.get('role') || 'user'

  const roleConfig = {
    farmer: {
      icon: Sprout,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      title: 'Farmer Account Created',
      description: 'Welcome to the farming community',
    },
    owner: {
      icon: Tractor,
      color: 'text-amber-600',
      bgColor: 'bg-amber-100',
      title: 'Equipment Owner Account Created',
      description: 'Start listing your equipment today',
    },
  }

  const config = roleConfig[role as keyof typeof roleConfig] || roleConfig.farmer
  const Icon = config.icon

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-4">
      <Card className="w-full max-w-md shadow-lg text-center">
        <CardHeader className="space-y-4">
          <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="size-10 text-green-600" />
          </div>
          <div className={`mx-auto flex size-16 items-center justify-center rounded-full ${config.bgColor}`}>
            <Icon className={`size-8 ${config.color}`} />
          </div>
          <CardTitle className="text-2xl font-bold text-balance">{config.title}</CardTitle>
          <CardDescription className="text-base text-balance">{config.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-blue-50 p-4 border border-blue-200">
            <div className="flex items-start gap-3">
              <Mail className="size-5 text-blue-600 shrink-0 mt-0.5" />
              <div className="text-left space-y-1">
                <p className="text-sm font-medium text-blue-900">Verify your email</p>
                <p className="text-sm text-blue-700">
                  We have sent a verification link to your email address. Please check your inbox and click the link to activate your account.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2 text-sm text-muted-foreground">
            <p>Did not receive the email?</p>
            <p>Check your spam folder or contact support for assistance.</p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Button asChild className="w-full" size="lg">
            <Link href="/auth/login">Go to Login</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/">Back to Home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

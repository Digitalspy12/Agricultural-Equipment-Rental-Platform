import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Sprout, Tractor, ArrowRight } from 'lucide-react'

export default function SignupSelectionPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-4">
      <div className="w-full max-w-4xl space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-balance mb-3">Choose Your Account Type</h1>
          <p className="text-lg text-muted-foreground text-balance">
            Select how you would like to join our agricultural equipment rental platform
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Farmer Card */}
          <Card className="relative overflow-hidden border-2 hover:border-green-500 transition-colors">
            <CardHeader className="space-y-4">
              <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-green-100">
                <Sprout className="size-10 text-green-700" />
              </div>
              <div className="text-center">
                <CardTitle className="text-2xl mb-2">I'm a Farmer</CardTitle>
                <CardDescription className="text-base">
                  I want to rent agricultural equipment for my farm
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="size-1.5 rounded-full bg-green-600" />
                  Access modern farming equipment
                </li>
                <li className="flex items-center gap-2">
                  <div className="size-1.5 rounded-full bg-green-600" />
                  Pay on delivery (Cash on Arrival)
                </li>
                <li className="flex items-center gap-2">
                  <div className="size-1.5 rounded-full bg-green-600" />
                  Flexible rental periods
                </li>
                <li className="flex items-center gap-2">
                  <div className="size-1.5 rounded-full bg-green-600" />
                  No long-term commitments
                </li>
              </ul>
              <Button asChild className="w-full bg-green-600 hover:bg-green-700" size="lg">
                <Link href="/auth/signup/farmer">
                  Sign Up as Farmer
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Owner Card */}
          <Card className="relative overflow-hidden border-2 hover:border-amber-500 transition-colors">
            <CardHeader className="space-y-4">
              <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-amber-100">
                <Tractor className="size-10 text-amber-700" />
              </div>
              <div className="text-center">
                <CardTitle className="text-2xl mb-2">I'm an Owner</CardTitle>
                <CardDescription className="text-base">
                  I want to list my equipment and earn from rentals
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="size-1.5 rounded-full bg-amber-600" />
                  List your equipment for rental
                </li>
                <li className="flex items-center gap-2">
                  <div className="size-1.5 rounded-full bg-amber-600" />
                  Earn income from idle equipment
                </li>
                <li className="flex items-center gap-2">
                  <div className="size-1.5 rounded-full bg-amber-600" />
                  Manage bookings easily
                </li>
                <li className="flex items-center gap-2">
                  <div className="size-1.5 rounded-full bg-amber-600" />
                  Track payments securely
                </li>
              </ul>
              <Button asChild className="w-full bg-amber-600 hover:bg-amber-700" size="lg">
                <Link href="/auth/signup/owner">
                  Sign Up as Owner
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-green-600 hover:text-green-700 font-medium underline underline-offset-4">
            Login here
          </Link>
        </div>
      </div>
    </div>
  )
}

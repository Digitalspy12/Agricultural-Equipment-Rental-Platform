'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import { Booking } from '@/lib/types/booking'
import { CheckCircle2, Calendar, Phone, MapPin, Package, AlertCircle } from 'lucide-react'

function SuccessContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [booking, setBooking] = useState<Booking | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const bookingId = searchParams.get('id')

  useEffect(() => {
    const fetchBooking = async () => {
      if (!bookingId) {
        setIsLoading(false)
        return
      }

      const supabase = createClient()
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('id', bookingId)
        .single()

      if (error) {
        console.error('[v0] Error fetching booking:', error)
      } else {
        setBooking(data)
      }
      setIsLoading(false)
    }

    fetchBooking()
  }, [bookingId])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block size-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
          <p className="mt-4 text-muted-foreground">Loading booking details...</p>
        </div>
      </div>
    )
  }

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="max-w-md">
          <CardHeader>
            <div className="flex items-center gap-2 text-amber-600">
              <AlertCircle className="size-6" />
              <CardTitle>Booking Not Found</CardTitle>
            </div>
            <CardDescription>We couldn't find the booking details.</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => router.push('/')} className="w-full">
              Go to Home
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
      <div className="mx-auto max-w-2xl px-4 py-12">
        {/* Success Message */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center size-20 rounded-full bg-green-100 dark:bg-green-900 mb-4">
            <CheckCircle2 className="size-10 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-balance text-3xl font-bold text-green-900 dark:text-green-100 mb-2">
            Booking Confirmed!
          </h1>
          <p className="text-green-700 dark:text-green-300">
            Your equipment rental has been successfully booked
          </p>
        </div>

        {/* Booking Details Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Booking Details</CardTitle>
            <CardDescription>Booking ID: {booking.id.slice(0, 8).toUpperCase()}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Equipment */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Package className="size-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">Equipment</span>
              </div>
              <p className="font-semibold">{booking.equipment_name}</p>
              <p className="text-sm text-muted-foreground">{booking.equipment_type}</p>
            </div>

            {/* Rental Period */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="size-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">Rental Period</span>
              </div>
              <p className="text-sm">
                <span className="font-medium">{new Date(booking.rental_start_date).toLocaleDateString('en-IN', { dateStyle: 'medium' })}</span>
                {' to '}
                <span className="font-medium">{new Date(booking.rental_end_date).toLocaleDateString('en-IN', { dateStyle: 'medium' })}</span>
              </p>
            </div>

            {/* Delivery Location */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="size-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">Delivery Location</span>
              </div>
              <p className="text-sm">{booking.renter_location}</p>
            </div>

            {/* Contact */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Phone className="size-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">Your Contact</span>
              </div>
              <p className="text-sm">{booking.renter_phone}</p>
            </div>

            {/* Total Cost */}
            <div className="border-t pt-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Total Amount</span>
                <span className="text-2xl font-bold text-green-700 dark:text-green-400">
                  ₹{booking.total_cost.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Instructions */}
        <Card className="border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950">
          <CardHeader>
            <CardTitle className="text-amber-900 dark:text-amber-100">Payment Instructions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-amber-900 dark:text-amber-100">
            <p className="flex items-start gap-2">
              <span className="font-semibold flex-shrink-0">1.</span>
              <span>The equipment owner will contact you shortly to arrange delivery</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="font-semibold flex-shrink-0">2.</span>
              <span>Please keep the total amount (₹{booking.total_cost.toLocaleString('en-IN')}) ready in cash</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="font-semibold flex-shrink-0">3.</span>
              <span>Pay the owner upon delivery of the equipment to your location</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="font-semibold flex-shrink-0">4.</span>
              <span>Inspect the equipment before making payment</span>
            </p>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Button onClick={() => router.push('/')} className="flex-1" size="lg">
            Browse More Equipment
          </Button>
          <Button onClick={() => router.push('/bookings')} variant="outline" className="flex-1" size="lg">
            View My Bookings
          </Button>
        </div>

        {/* Support Info */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>Need help? Contact the equipment owner:</p>
          <p className="font-medium text-foreground mt-1">
            {booking.owner_name} - {booking.owner_phone}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block size-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  )
}

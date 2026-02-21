'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import { BookingFormData } from '@/lib/types/booking'
import { Calendar, Truck, DollarSign, User, Phone, MapPin, Package } from 'lucide-react'

// Mock data for demo - in production, this would come from previous page/state
const DEMO_BOOKING_DATA: BookingFormData = {
  equipment_name: 'John Deere Tractor',
  equipment_type: 'Tractor',
  rental_start_date: '2024-03-15',
  rental_end_date: '2024-03-20',
  total_cost: 15000,
  renter_name: 'Rajesh Kumar',
  renter_phone: '+91 98765 43210',
  renter_location: 'Village Madhopur, Punjab',
  owner_name: 'Amit Singh',
  owner_phone: '+91 98123 45678'
}

export default function CheckoutPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  // In production, get this from URL params or global state
  const bookingData = DEMO_BOOKING_DATA

  // Calculate rental duration
  const startDate = new Date(bookingData.rental_start_date)
  const endDate = new Date(bookingData.rental_end_date)
  const durationDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))

  const handleConfirmBooking = async () => {
    setIsLoading(true)
    console.log('[v0] Starting booking confirmation...')

    try {
      const { data, error } = await supabase
        .from('bookings')
        .insert([
          {
            ...bookingData,
            booking_status: 'confirmed',
            payment_status: 'pending'
          }
        ])
        .select()
        .single()

      if (error) {
        console.error('[v0] Booking error:', error)
        alert('Failed to create booking. Please try again.')
        return
      }

      console.log('[v0] Booking created successfully:', data)
      router.push(`/booking/success?id=${data.id}`)
    } catch (err) {
      console.error('[v0] Unexpected error:', err)
      alert('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
      <div className="mx-auto max-w-4xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-balance text-3xl font-bold text-green-900 dark:text-green-100">
            Review Your Booking
          </h1>
          <p className="mt-2 text-green-700 dark:text-green-300">
            Please review the details below and confirm your equipment rental
          </p>
        </div>

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Booking Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Equipment Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="size-5 text-green-600" />
                  Equipment Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-lg">{bookingData.equipment_name}</p>
                    <p className="text-sm text-muted-foreground">{bookingData.equipment_type}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Rental Period */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="size-5 text-green-600" />
                  Rental Period
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Start Date</span>
                  <span className="font-medium">{new Date(bookingData.rental_start_date).toLocaleDateString('en-IN', { dateStyle: 'long' })}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">End Date</span>
                  <span className="font-medium">{new Date(bookingData.rental_end_date).toLocaleDateString('en-IN', { dateStyle: 'long' })}</span>
                </div>
                <div className="flex items-center justify-between border-t pt-3">
                  <span className="font-medium">Total Duration</span>
                  <span className="font-semibold text-green-700 dark:text-green-400">
                    {durationDays} {durationDays === 1 ? 'day' : 'days'}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Renter Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="size-5 text-green-600" />
                  Your Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <User className="size-4 text-muted-foreground" />
                  <span>{bookingData.renter_name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="size-4 text-muted-foreground" />
                  <span>{bookingData.renter_phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="size-4 text-muted-foreground" />
                  <span>{bookingData.renter_location}</span>
                </div>
              </CardContent>
            </Card>

            {/* Owner Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="size-5 text-green-600" />
                  Equipment Owner
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <User className="size-4 text-muted-foreground" />
                  <span>{bookingData.owner_name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="size-4 text-muted-foreground" />
                  <span>{bookingData.owner_phone}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pricing & Payment Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="size-5 text-green-600" />
                  Payment Summary
                </CardTitle>
                <CardDescription>Cash on Delivery</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Rental Cost</span>
                    <span>₹{bookingData.total_cost.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Duration</span>
                    <span>{durationDays} days</span>
                  </div>
                  <div className="flex items-center justify-between border-t pt-3 font-semibold text-lg">
                    <span>Total Amount</span>
                    <span className="text-green-700 dark:text-green-400">₹{bookingData.total_cost.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="rounded-lg bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 p-4">
                  <p className="text-sm font-medium text-amber-900 dark:text-amber-100">
                    Pay on Arrival
                  </p>
                  <p className="mt-1 text-xs text-amber-700 dark:text-amber-300">
                    Payment will be collected in cash when the equipment is delivered to your location
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex-col gap-3">
                <Button
                  onClick={handleConfirmBooking}
                  disabled={isLoading}
                  className="w-full"
                  size="lg"
                >
                  {isLoading ? 'Processing...' : 'Confirm Booking'}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => router.back()}
                  disabled={isLoading}
                  className="w-full"
                >
                  Go Back
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

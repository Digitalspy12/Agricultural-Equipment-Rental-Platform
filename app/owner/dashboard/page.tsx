'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Booking } from '@/lib/types/booking'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, Package, MapPin, Phone, User, DollarSign, CheckCircle2 } from 'lucide-react'

export default function OwnerDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  const fetchBookings = async () => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('[v0] Error fetching bookings:', error)
    } else {
      setBookings(data || [])
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchBookings()
  }, [])

  const handleMarkAsPaid = async (bookingId: string) => {
    setUpdatingId(bookingId)
    console.log('[v0] Marking booking as paid:', bookingId)

    const supabase = createClient()
    const { error } = await supabase
      .from('bookings')
      .update({
        payment_status: 'paid',
        booking_status: 'delivered',
        updated_at: new Date().toISOString()
      })
      .eq('id', bookingId)

    if (error) {
      console.error('[v0] Error updating booking:', error)
      alert('Failed to update booking. Please try again.')
    } else {
      console.log('[v0] Booking updated successfully')
      // Refresh bookings
      await fetchBookings()
    }

    setUpdatingId(null)
  }

  const pendingBookings = bookings.filter(b => b.payment_status === 'pending')
  const paidBookings = bookings.filter(b => b.payment_status === 'paid')

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block size-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
          <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-balance text-3xl font-bold text-blue-900 dark:text-blue-100">
              Owner Dashboard
            </h1>
            <p className="mt-2 text-blue-700 dark:text-blue-300">
              Manage your equipment rentals and payments
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="outline" size="sm">
              <a href="/auth/login">Login</a>
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-6 mb-8 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              <Package className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{bookings.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Payment</CardTitle>
              <DollarSign className="size-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingBookings.length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                ₹{pendingBookings.reduce((sum, b) => sum + b.total_cost, 0).toLocaleString('en-IN')}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle2 className="size-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{paidBookings.length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                ₹{paidBookings.reduce((sum, b) => sum + b.total_cost, 0).toLocaleString('en-IN')}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Pending Bookings */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-blue-900 dark:text-blue-100">
            Pending Payments ({pendingBookings.length})
          </h2>
          {pendingBookings.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                No pending payments
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {pendingBookings.map((booking) => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  onMarkAsPaid={handleMarkAsPaid}
                  isUpdating={updatingId === booking.id}
                />
              ))}
            </div>
          )}
        </div>

        {/* Paid Bookings */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-blue-900 dark:text-blue-100">
            Completed Bookings ({paidBookings.length})
          </h2>
          {paidBookings.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                No completed bookings yet
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {paidBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

interface BookingCardProps {
  booking: Booking
  onMarkAsPaid?: (id: string) => void
  isUpdating?: boolean
}

function BookingCard({ booking, onMarkAsPaid, isUpdating }: BookingCardProps) {
  const isPending = booking.payment_status === 'pending'

  return (
    <Card className={isPending ? 'border-amber-200 dark:border-amber-800' : ''}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{booking.equipment_name}</CardTitle>
            <CardDescription>{booking.equipment_type}</CardDescription>
          </div>
          <Badge variant={isPending ? 'outline' : 'default'} className={isPending ? 'bg-amber-100 dark:bg-amber-900 text-amber-900 dark:text-amber-100' : 'bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100'}>
            {booking.payment_status === 'paid' ? 'Paid' : 'Pending'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Renter Info */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <User className="size-4 text-muted-foreground" />
            <span className="font-medium">{booking.renter_name}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Phone className="size-4 text-muted-foreground" />
            <span>{booking.renter_phone}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="size-4 text-muted-foreground" />
            <span className="text-muted-foreground">{booking.renter_location}</span>
          </div>
        </div>

        {/* Dates */}
        <div className="flex items-center gap-2 text-sm border-t pt-3">
          <Calendar className="size-4 text-muted-foreground" />
          <span className="text-muted-foreground">
            {new Date(booking.rental_start_date).toLocaleDateString('en-IN', { dateStyle: 'medium' })}
            {' - '}
            {new Date(booking.rental_end_date).toLocaleDateString('en-IN', { dateStyle: 'medium' })}
          </span>
        </div>

        {/* Amount */}
        <div className="flex items-center justify-between border-t pt-3">
          <span className="text-sm text-muted-foreground">Total Amount</span>
          <span className="text-lg font-bold">₹{booking.total_cost.toLocaleString('en-IN')}</span>
        </div>

        {/* Action Button */}
        {isPending && onMarkAsPaid && (
          <Button
            onClick={() => onMarkAsPaid(booking.id)}
            disabled={isUpdating}
            className="w-full"
            size="sm"
          >
            {isUpdating ? 'Updating...' : 'Mark as Paid'}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

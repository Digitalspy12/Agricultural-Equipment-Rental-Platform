/**
 * Script to create test users in Supabase
 * Run this once to set up test accounts
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

const testUsers = [
  {
    email: 'farmer@test.com',
    password: 'farmer123',
    role: 'farmer',
    full_name: 'Test Farmer',
    phone: '+1234567890',
    farm_name: 'Green Valley Farm',
    farm_size_acres: 250,
    farm_location: 'Iowa, USA',
    crop_types: 'Corn, Soybeans, Wheat',
  },
  {
    email: 'owner@test.com',
    password: 'owner123',
    role: 'owner',
    full_name: 'Test Equipment Owner',
    phone: '+1234567891',
    business_name: 'AgriEquip Rentals',
    property_address: '123 Farm Road, Nebraska, USA',
    equipment_count: 15,
    service_area: 'Nebraska, Iowa, Kansas',
  },
  {
    email: 'admin@test.com',
    password: 'admin123',
    role: 'admin',
    full_name: 'System Administrator',
    phone: '+1234567892',
  },
]

async function createTestUsers() {
  console.log('Creating test users...\n')

  for (const user of testUsers) {
    console.log(`Creating ${user.role}: ${user.email}`)

    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: user.email,
      password: user.password,
      email_confirm: true, // Auto-confirm email
      user_metadata: {
        role: user.role,
        full_name: user.full_name,
        phone: user.phone,
      },
    })

    if (authError) {
      console.error(`Error creating ${user.email}:`, authError.message)
      continue
    }

    console.log(`✓ Auth user created: ${authData.user.id}`)

    // Update profile with role-specific data
    if (user.role === 'farmer') {
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          farm_name: user.farm_name,
          farm_size_acres: user.farm_size_acres,
          farm_location: user.farm_location,
          crop_types: user.crop_types,
        })
        .eq('id', authData.user.id)

      if (updateError) {
        console.error(`Error updating farmer profile:`, updateError.message)
      } else {
        console.log(`✓ Farmer profile updated`)
      }
    } else if (user.role === 'owner') {
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          business_name: user.business_name,
          property_address: user.property_address,
          equipment_count: user.equipment_count,
          service_area: user.service_area,
        })
        .eq('id', authData.user.id)

      if (updateError) {
        console.error(`Error updating owner profile:`, updateError.message)
      } else {
        console.log(`✓ Owner profile updated`)
      }
    }

    console.log('')
  }

  console.log('Test users created successfully!')
  console.log('\nCredentials:')
  testUsers.forEach((user) => {
    console.log(`${user.role}: ${user.email} / ${user.password}`)
  })
}

createTestUsers()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Fatal error:', error)
    process.exit(1)
  })

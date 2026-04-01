// Create a simple API route: /api/keep-alive
// File: app/api/keep-alive/route.ts

import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  const { data, error } = await supabase
    .from('users')
    .select('count')
    .single()
  
  if (error) {
    return NextResponse.json({ status: 'error', error: error.message }, { status: 500 })
  }
  
  return NextResponse.json({ 
    status: 'alive', 
    timestamp: new Date().toISOString(),
    count: data?.count 
  })
}
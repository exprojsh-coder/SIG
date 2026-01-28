import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    // Test 1: Check if we can connect
    const { data: testData, error: testError } = await supabase
      .from('users')
      .select('count')
      .limit(1)
      .single()

    // Test 2: Try to insert a test user
    const testEmail = `test-${Date.now()}@example.com`
    const testUser = {
      email: testEmail,
      name: 'Test User',
      google_id: `test-${Date.now()}`,
    }

    const { data: insertData, error: insertError } = await supabase
      .from('users')
      .insert([testUser])
      .select()
      .single()

    // Test 3: Try to read it back
    const { data: readData, error: readError } = await supabase
      .from('users')
      .select('*')
      .eq('email', testEmail)
      .single()

    // Clean up: Delete test user
    if (readData) {
      await supabase.from('users').delete().eq('id', readData.id)
    }

    return NextResponse.json({
      success: true,
      tests: {
        connection: testError ? 'FAILED' : 'OK',
        connectionError: testError,
        insert: insertError ? 'FAILED' : 'OK',
        insertError: insertError,
        insertData: insertData,
        read: readError ? 'FAILED' : 'OK',
        readError: readError,
        readData: readData,
      }
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      stack: error.stack
    }, { status: 500 })
  }
}
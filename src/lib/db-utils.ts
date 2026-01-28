import { supabase } from './supabase'

export async function createUser(email: string, name?: string, image?: string, googleId?: string) {
  try {
    const userData = {
      email,
      name: name || null,
      image: image || null,
      google_id: googleId || null,
    }

    console.log('Creating user with data:', userData)

    const { data, error } = await supabase
      .from('users')
      .insert([userData])
      .select()
      .single()

    if (error) {
      console.error('Create user error:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint
      })
      
      // If it's a duplicate, try to fetch the existing user
      if (error.code === '23505') {
        console.log('User already exists, fetching...')
        const { data: existingUser } = await supabase
          .from('users')
          .select('*')
          .eq('email', email)
          .maybeSingle()
        return existingUser
      }
      
      throw error
    }

    return data
  } catch (error: any) {
    console.error('Failed to create user:', error)
    throw error
  }
}

export async function getUserByEmail(email: string) {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .maybeSingle()

    if (error) {
      console.error('Get user error:', error)
      throw error
    }

    return data
  } catch (error) {
    console.error('Failed to get user:', error)
    throw error
  }
}

export async function getOrCreateUser(email: string, name?: string, image?: string, googleId?: string) {
  try {
    // Try to get existing user
    const existingUser = await getUserByEmail(email)
    
    if (existingUser) {
      console.log('Found existing user:', existingUser.id)
      return existingUser
    }

    // Create new user if doesn't exist
    console.log('Creating new user for:', email)
    const newUser = await createUser(email, name, image, googleId)
    
    if (!newUser) {
      throw new Error('Failed to create user')
    }

    console.log('Created new user:', newUser.id)
    return newUser
  } catch (error) {
    console.error('Failed to get or create user:', error)
    throw error
  }
}
import { supabase } from './supabase'

export interface User {
  id: string
  email: string
  name?: string
  image?: string
  google_id?: string
  created_at: string
}

export async function syncUserToDatabase(user: any) {
  try {
    console.log('Syncing user to database:', user.email)
    
    // First, check if user exists by email with all fields
    const { data: existingUser, error: queryError } = await supabase
      .from('users')
      .select('*')
      .eq('email', user.email)
      .maybeSingle()

    if (queryError) {
      console.error('Error checking user existence:', queryError)
      return null
    }

    if (existingUser) {
      console.log('User exists, updating:', existingUser.id)
      // Update existing user with current data
      const { data, error: updateError } = await supabase
        .from('users')
        .update({
          name: user.name || existingUser.name,
          image: user.image || existingUser.image,
          google_id: user.google_id || user.id,
        })
        .eq('email', user.email)
        .select()
        .single()
      
      if (updateError) {
        console.error('Error updating user:', updateError)
        return null
      }
      
      return data
    } else {
      console.log('Creating new user:', user.email)
      // Create new user
      const { data, error: insertError } = await supabase
        .from('users')
        .insert([
          {
            email: user.email,
            name: user.name,
            image: user.image,
            google_id: user.google_id || user.id,
          }
        ])
        .select()
        .single()
      
      if (insertError) {
        console.error('Error creating user:', insertError)
        return null
      }
      
      return data
    }
  } catch (error) {
    console.error('Error syncing user to database:', error)
    return null
  }
}

export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    console.log('Getting user by email:', email)
    
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .maybeSingle()
    
    if (error) {
      console.error('Error getting user by email:', error)
      return null
    }
    
    return data
  } catch (error) {
    console.error('Error getting user by email:', error)
    return null
  }
}

export async function getUserById(id: string): Promise<User | null> {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .maybeSingle()
    
    if (error) {
      console.error('Error getting user by id:', error)
      return null
    }
    
    return data
  } catch (error) {
    console.error('Error getting user by id:', error)
    return null
  }
}

export async function getUserApplications(userId: string) {
  try {
    const { data, error } = await supabase
      .from('volunteer_applications')
      .select(`
        *,
        sig:sigs (*)
      `)
      .eq('user_id', userId)
      .order('applied_at', { ascending: false })
    
    if (error) {
      console.error('Error getting user applications:', error)
      return []
    }
    
    return data || []
  } catch (error) {
    console.error('Error getting user applications:', error)
    return []
  }
}

export async function getUserApplicationCount(userId: string): Promise<number> {
  try {
    const { count, error } = await supabase
      .from('volunteer_applications')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('status', 'pending')
    
    if (error) {
      console.error('Error getting user application count:', error)
      return 0
    }
    
    return count || 0
  } catch (error) {
    console.error('Error getting user application count:', error)
    return 0
  }
}

export async function checkUserApplication(userId: string, sigId: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('volunteer_applications')
      .select('id')
      .eq('user_id', userId)
      .eq('sig_id', sigId)
      .maybeSingle()
    
    if (error) {
      console.error('Error checking user application:', error)
      return false
    }
    
    return !!data
  } catch (error) {
    console.error('Error checking user application:', error)
    return false
  }
}
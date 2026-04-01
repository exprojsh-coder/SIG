// /lib/admin.ts
import { supabase } from './supabase'

// Hardcoded super admin from env
const SUPER_ADMIN_EMAIL = process.env.NEXT_PUBLIC_SUPER_ADMIN_EMAIL

/**
 * Check if user is admin (hardcoded via env)
 */
export async function checkIsAdmin(userEmail: string | null | undefined): Promise<boolean> {
  if (!userEmail) return false
  
  // Check env-based super admin first
  if (userEmail === SUPER_ADMIN_EMAIL) {
    return true
  }
  
  // Optional: Also check database for additional admins
  try {
    const { data, error } = await supabase
      .from('admin_users')
      .select('email')
      .eq('email', userEmail)
      .single()
    
    if (error) {
      // If table doesn't exist or other error, just rely on env admin
      console.warn('Admin table check failed, using env fallback:', error.message)
      return false
    }
    
    return !!data
  } catch (err) {
    console.error('Admin check error:', err)
    return false
  }
}

/**
 * Get admin info for display
 */
export function getAdminEmail(): string | undefined {
  return SUPER_ADMIN_EMAIL
}
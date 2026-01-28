'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FaUser, FaEnvelope, FaCalendar, FaCheck, FaClock, FaTimes, FaHome } from 'react-icons/fa'
import { supabase } from '@/lib/supabase'

interface Application {
  id: string
  user_id: string
  sig_id: string
  status: string
  applied_at: string
  sig?: {
    id: string
    name: string
    acronym: string
    description: string
  }
}

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [dbUser, setDbUser] = useState<any>(null)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/')
    }
  }, [status, router])

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.email) {
      fetchUserData()
    }
  }, [status, session])

  const ensureUserInDatabase = async () => {
    if (!session?.user?.email) return null

    try {
      // Check if user exists by email
      const { data: existingUser } = await supabase
        .from('users')
        .select('*')
        .eq('email', session.user.email)
        .maybeSingle()

      // If user exists, return it
      if (existingUser) {
        return existingUser
      }

      // Create new user
      const userData = {
        email: session.user.email,
        name: session.user.name || null,
        image: session.user.image || null,
        google_id: session.user.id || null,
      }

      const { data: newUser, error } = await supabase
        .from('users')
        .insert([userData])
        .select()
        .single()

      // Check if we got an error object that's not null/undefined
      if (error && Object.keys(error).length > 0) {
        console.log('Insert returned error:', error)
        
        // If it's a duplicate (race condition), try to fetch again
        if (error.code === '23505') {
          const { data: retryUser } = await supabase
            .from('users')
            .select('*')
            .eq('email', session.user.email)
            .maybeSingle()
          return retryUser
        }
        
        // For other errors, still try to fetch the user
        const { data: fallbackUser } = await supabase
          .from('users')
          .select('*')
          .eq('email', session.user.email)
          .maybeSingle()
        
        if (fallbackUser) {
          console.log('Found user despite error')
          return fallbackUser
        }
        
        console.log('Could not create or find user')
        return null
      }

      // If no error or empty error object, return the new user
      return newUser
    } catch (error: any) {
      console.log('Exception in ensureUserInDatabase:', error?.message || error)
      
      // Even if there's an exception, try to fetch the user
      try {
        const { data: fallbackUser } = await supabase
          .from('users')
          .select('*')
          .eq('email', session.user.email)
          .maybeSingle()
        
        if (fallbackUser) {
          console.log('Found user after exception')
          return fallbackUser
        }
      } catch (fetchError) {
        console.log('Could not fetch user after exception')
      }
      
      return null
    }
  }

  const fetchUserData = async () => {
    setLoading(true)
    
    try {
      if (!session?.user?.email) {
        setLoading(false)
        return
      }

      // Ensure user exists in database
      const user = await ensureUserInDatabase()
      
      if (!user) {
        console.log('Could not get or create user, but continuing...')
        // Even if we couldn't get a user, we can still try to fetch applications
        // by looking up the user by email again
        const { data: existingUser } = await supabase
          .from('users')
          .select('*')
          .eq('email', session.user.email)
          .maybeSingle()
          
        if (existingUser) {
          setDbUser(existingUser)
        } else {
          setLoading(false)
          return
        }
      } else {
        setDbUser(user)
      }

      // Fetch user applications
      const { data: applicationsData } = await supabase
        .from('volunteer_applications')
        .select(`
          *,
          sig:sigs (id, name, acronym, description)
        `)
        .eq('user_id', dbUser?.id || user?.id)
        .order('applied_at', { ascending: false })

      setApplications(applicationsData || [])
    } catch (error) {
      console.log('Error in fetchUserData:', error)
      setApplications([])
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <FaCheck className="text-green-500" />
      case 'pending':
        return <FaClock className="text-yellow-500" />
      case 'rejected':
        return <FaTimes className="text-red-500" />
      default:
        return <FaClock className="text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
              <div className="flex items-center space-x-6 mb-6 md:mb-0">
                <div className="relative">
                  <img
                    src={session?.user?.image || '/default-avatar.png'}
                    alt="Profile"
                    className="h-24 w-24 rounded-full border-4 border-white shadow-lg"
                  />
                  <div className="absolute bottom-0 right-0 h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <FaUser className="h-4 w-4 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{session?.user?.name || 'User'}</h1>
                  <div className="flex items-center mt-2 text-gray-600">
                    <FaEnvelope className="mr-2" />
                    {session?.user?.email || 'No email'}
                  </div>
                  {dbUser && (
                    <div className="text-sm text-gray-500 mt-1">
                      Member since: {new Date(dbUser.created_at).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>
              <div className="px-6 py-3 bg-blue-50 rounded-lg">
                <p className="text-blue-800 font-semibold">
                  Applications: {applications.length} / 3
                </p>
                <p className="text-sm text-blue-600">Maximum 3 active applications</p>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">My Applications</h2>
              {applications.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg mb-4">No applications yet</p>
                  <button
                    onClick={() => router.push('/')}
                    className="flex items-center justify-center mx-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <FaHome className="mr-2" />
                    Browse SIGs
                  </button>
                </div>
              ) : (
                <div className="grid gap-6">
                  {applications.map((app) => (
                    <div
                      key={app.id}
                      className="border rounded-xl p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">
                            {app.sig?.name}
                          </h3>
                          <p className="text-gray-600">{app.sig?.acronym}</p>
                        </div>
                        <div className="flex items-center space-x-4 mt-4 md:mt-0">
                          <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(app.status)}`}>
                            {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                          </span>
                          <div className="flex items-center text-gray-500 text-sm">
                            <FaCalendar className="mr-2" />
                            {new Date(app.applied_at).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-4">{app.sig?.description}</p>
                      <div className="flex items-center">
                        {getStatusIcon(app.status)}
                        <span className="ml-2 text-sm text-gray-600">
                          {app.status === 'pending' && 'Your application is under review'}
                          {app.status === 'approved' && 'Congratulations! Your application was approved'}
                          {app.status === 'rejected' && 'Application not approved at this time'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Simple refresh button */}
            <div className="mt-6 text-center">
              <button
                onClick={fetchUserData}
                className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
              >
                Refresh Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
'use client'

import { useSession } from 'next-auth/react'

export default function DebugPage() {
  const { data: session, status } = useSession()

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Session Debug Information</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Session Status</h2>
        <pre className="bg-gray-50 p-4 rounded">
          {JSON.stringify({ status }, null, 2)}
        </pre>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Session Data</h2>
        <pre className="bg-gray-50 p-4 rounded overflow-auto">
          {JSON.stringify(session, null, 2)}
        </pre>
      </div>

      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">User Object</h2>
        <pre className="bg-gray-50 p-4 rounded">
          {JSON.stringify(session?.user, null, 2)}
        </pre>
      </div>
    </div>
  )
}
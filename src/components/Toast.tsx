'use client'

import { useEffect, useState } from 'react'
import { FaCheck, FaExclamation, FaTimes } from 'react-icons/fa'

interface ToastProps {
  message: string
  type: 'success' | 'error' | 'info'
  onClose: () => void
}

export default function Toast({ message, type, onClose }: ToastProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      setTimeout(onClose, 300)
    }, 3000)

    return () => clearTimeout(timer)
  }, [onClose])

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FaCheck className="text-green-500" />
      case 'error':
        return <FaExclamation className="text-red-500" />
      default:
        return null
    }
  }

  const getBgColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200'
      case 'error':
        return 'bg-red-50 border-red-200'
      default:
        return 'bg-blue-50 border-blue-200'
    }
  }

  if (!visible) return null

  return (
    <div className={`fixed bottom-4 right-4 p-4 rounded-lg border ${getBgColor()} shadow-lg z-50 animate-fade-in`}>
      <div className="flex items-center space-x-3">
        {getIcon()}
        <p className="font-medium">{message}</p>
        <button
          onClick={() => {
            setVisible(false)
            onClose()
          }}
          className="text-gray-500 hover:text-gray-700"
        >
          <FaTimes />
        </button>
      </div>
    </div>
  )
}
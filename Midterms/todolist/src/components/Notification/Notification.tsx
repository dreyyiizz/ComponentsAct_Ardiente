'use client'

import type React from 'react'

import { useState, useEffect } from 'react'
import { AlertCircle, X } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'

// Observer Pattern Implementation
interface NotificationProps {
  children: React.ReactNode
  duration?: number
}

export function Notification({ children, duration = 0 }: NotificationProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setVisible(false)
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [duration])

  if (!visible) return null

  return (
    <Alert
      variant="destructive"
      className="mb-6 flex items-center justify-between"
    >
      <div className="flex items-center">
        <AlertCircle className="h-4 w-4 mr-2" />
        <AlertDescription>{children}</AlertDescription>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setVisible(false)}
        className="h-6 w-6"
      >
        <X className="h-4 w-4" />
      </Button>
    </Alert>
  )
}
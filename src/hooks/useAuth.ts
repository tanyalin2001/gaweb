'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import jwt from 'jsonwebtoken'

interface AuthPayload {
  email: string
  role: string
  username: string
}

export function useAuth() {
  const router = useRouter()

  const [auth, setAuth] = useState<AuthPayload | null>(null)

  const logout = () => {
    localStorage.removeItem('token')
    setAuth(null)
    router.push('/login')
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return

    try {
      const decoded = jwt.decode(token)
      if (typeof decoded === 'object' && decoded && 'email' in decoded && 'role' in decoded) {
        setAuth(decoded as AuthPayload)
      }
    } catch (err) {
      console.error('Invalid token', err)
    }
  }, [])

  return {
    email: auth?.email || '',
    role: auth?.role || '',
    username: auth?.username || '',
    logout,
    isLoggedIn: !!auth,
  }
}

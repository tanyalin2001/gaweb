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

  const decodeToken = () => {
    const token = localStorage.getItem('token')
    if (!token) {
      setAuth(null)
      return
    }

    try {
      const decoded = jwt.decode(token)
      if (typeof decoded === 'object' && decoded && 'email' in decoded && 'role' in decoded) {
        setAuth(decoded as AuthPayload)
      } else {
        setAuth(null)
      }
    } catch (err) {
      console.error('無法解析 token', err)
      setAuth(null)
    }
  }

  useEffect(() => {
    decodeToken()
  }, [])

  const logout = () => {
    localStorage.removeItem('token')
    setAuth(null)
    router.push('/login')
  }

  return {
    email: auth?.email || '',
    role: auth?.role || '',
    username: auth?.username || '',
    logout,
    isLoggedIn: !!auth,
    refresh: decodeToken,
  }
}

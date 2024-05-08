'use client'
import React, { useState } from 'react'

export const LoginPage: React.FC = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <div className="login-page">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
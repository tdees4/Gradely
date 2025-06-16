import { useEffect, useState } from 'react'
import { supabase, auth } from './lib/supabase'
import { useNavigate } from 'react-router-dom'

import './App.css';

function App() {
  const [showSignUp, setShowSignUp] = useState(false)
  const [showSignIn, setShowSignIn] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  // Handle sign-up authentication with supabase
  const handleSignUp = async () => {
    if (!email || !password) {
      alert('Please fill in all fields')
      return
    }
    
    setLoading(true)

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password
    })

    if (error != null || data == null) {
      alert('ERROR: Please try again')
      return
    }

    setLoading(false)
    setShowSignUp(false)
    setEmail('')
    setPassword('')

    if (data.session == null) {
      alert('Confirm your email in order to sign in')
      setShowSignIn(true)
    }
  }

  // Handle sign-in authentication with supabase
  const handleSignIn = async () => {
    if (!email || !password) {
      alert('Please fill in all fields')
      return
    }
    
    setLoading(true)
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    })

    if (error != null || data == null) {
      alert('ERROR: Please try again')
      return
    }

    setLoading(false)
    setShowSignUp(false)
    setEmail('')
    setPassword('')
  }

  // Reset sign-up/sign-in stateful variables
  const resetForm = () => {
    setShowSignUp(false)
    setShowSignIn(false)
    setEmail('')
    setPassword('')
  }

  return (
    <div>
      <div>
        
        {/* Logo/Title */}
        <div class="logo">
          <h1>
            <img src="/src/assets/website-logo.svg" alt="Gradely"></img>
          </h1>
          <p>
            Your smart GPA calculator
          </p>
        </div>

        {/* Default State - Show Buttons */}
        {!showSignUp && !showSignIn && (
          <div>
            <button
              onClick={() => setShowSignUp(true)}
              class="main-page-button"
            >
              Sign Up
            </button>
            
            <button
              onClick={() => setShowSignIn(true)}
              class="main-page-button"
            >
              Sign In
            </button>

            <div>
              <p>
                Track your grades • Calculate your GPA • Plan your future
              </p>
            </div>
          </div>
        )}

        {/* Sign Up Form */}
        {showSignUp && (
          <div>
            <div>
              <h2>
                Create Account
              </h2>
              <p>
                Join other students tracking their grades
              </p>
            </div>

            <div>
              <div>
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  class="sign-up-in-item"
                />
              </div>
              
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  class="sign-up-in-item"
                />
              </div>

              <button
                onClick={handleSignUp}
                disabled={loading}
                class="sign-up-in-item"
              >
                {loading ? 'Creating Account...' : 'Sign Up'}
              </button>
            </div>

            <div>
              <button
                onClick={resetForm}
              >
                Back to main page
              </button>
            </div>
          </div>
        )}

        {/* Sign In Form */}
        {showSignIn && (
          <div>
            <div>
              <h2>
                Welcome Back
              </h2>
              <p>
                Sign in to your account
              </p>
            </div>

            <div>
              <div>
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  class="sign-up-in-item"
                />
              </div>
              
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  class="sign-up-in-item"
                />
              </div>

              <button
                onClick={handleSignIn}
                disabled={loading}
                class="sign-up-in-item"
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </div>

            <div>
              <button
                onClick={() => {
                  setShowSignIn(false)
                  setShowSignUp(true)
                }}
                class="sign-in-bottom-button"
              >
                Don't have an account? Sign up
              </button>
              
              <button
                onClick={resetForm}
                class="sign-in-bottom-button"
              >
                Back to main page
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}


export default App
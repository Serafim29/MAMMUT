import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import { FiEye, FiEyeOff, FiArrowLeft } from 'react-icons/fi'
import backgroundImg from '../assets/background-sign.jpg'

function SignUp({ session }) {
  const navigate = useNavigate()
  
  const [isSignUp, setIsSignUp] = useState(true)
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const [dob, setDob] = useState('')
  const [country, setCountry] = useState('')
  const [shoppingPreference, setShoppingPreference] = useState('')
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)

  if (session) {
    return <Navigate to="/" replace />
  }

  const handleAuth = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ type: '', text: '' })

    try {
      if (isSignUp) {
        if (step === 1) {
          setStep(2)
          setLoading(false)
          return
        }

        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: {
              dob,
              country,
              shopping_preference: shoppingPreference,
              newsletter_subscribed: subscribeNewsletter,
            }
          }
        })

        if (error) throw error

        if (data.user && data.session === null) {
          setMessage({
            type: 'success',
            text: 'Sign up successful! Please check your email for a confirmation link.',
          })
        } else {
          setMessage({
            type: 'success',
            text: 'Sign up successful! Redirecting...',
          })
          setTimeout(() => navigate('/'), 1500)
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        })

        if (error) throw error

        setMessage({
          type: 'success',
          text: 'Logged in successfully! Redirecting...',
        })
        setTimeout(() => navigate('/'), 1000)
      }
    } catch (err) {
      setMessage({
        type: 'error',
        text: err.message || 'An error occurred during authentication.',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat px-4 relative"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <div className="bg-white w-full max-w-[430px] p-10 md:p-12 shadow-2xl flex flex-col justify-between min-h-[560px] border border-neutral-100 relative">
        
        <div className="text-center mt-2 relative">
          {isSignUp && step === 2 && (
            <button
              type="button"
              onClick={() => {
                setStep(1)
                setMessage({ type: '', text: '' })
              }}
              className="absolute left-0 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black transition-colors cursor-pointer"
              aria-label="Go back"
            >
              <FiArrowLeft size={20} />
            </button>
          )}
          <h1 className="text-4xl font-extrabold tracking-[0.15em] text-black select-none font-sans uppercase">
            MAMMUT
          </h1>
          <p className="text-xs text-neutral-400 mt-2 font-medium tracking-wide uppercase">
            {isSignUp && step === 2 ? 'COMPLETE YOUR PROFILE' : (isSignUp ? 'CREATE YOUR ACCOUNT' : 'WELCOME BACK')}
          </p>
        </div>

        <div className="flex-1 flex flex-col justify-center mt-8">
          {message.text && (
            <div
              className={`p-3 text-xs mb-5 font-medium border ${
                message.type === 'success'
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                  : 'bg-red-50 border-red-200 text-red-800'
              }`}
            >
              {message.text}
            </div>
          )}

          {(!isSignUp || step === 1) && (
            <form onSubmit={handleAuth} className="flex flex-col">
              <div className="relative mb-5">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-black px-4 py-4 text-sm outline-none rounded-none focus:ring-1 focus:ring-black text-black placeholder-transparent"
                  required
                  id="email-input"
                  placeholder="Email address"
                />
                <label
                  htmlFor="email-input"
                  className="absolute left-3 -top-[9px] bg-white px-1.5 text-[11px] font-semibold text-neutral-700 tracking-wide select-none"
                >
                  Email address*
                </label>
              </div>

              <div className="relative mb-6">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-neutral-200 px-4 py-4 pr-12 text-sm outline-none rounded-none focus:border-black focus:ring-1 focus:ring-black text-black"
                  placeholder="Password*"
                  required
                  id="password-input"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black transition-colors cursor-pointer"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-4 font-bold text-sm tracking-widest hover:bg-neutral-950 active:bg-neutral-900 transition-all duration-150 rounded-none uppercase cursor-pointer disabled:bg-neutral-400 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : 'Continue'}
              </button>
            </form>
          )}

          {isSignUp && step === 2 && (
            <form onSubmit={handleAuth} className="flex flex-col">
              <h2 className="text-base font-bold text-black mb-5 select-none font-sans uppercase tracking-wider text-center">
                Complete your profile
              </h2>

              <div className="relative mb-4">
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full border border-neutral-200 px-4 py-3 text-sm outline-none rounded-none focus:border-black focus:ring-1 focus:ring-black text-black"
                  required
                  id="dob-input"
                />
                <label
                  htmlFor="dob-input"
                  className="absolute left-3 -top-[9px] bg-white px-1.5 text-[11px] font-semibold text-neutral-700 tracking-wide select-none"
                >
                  Date of birth*
                </label>
              </div>

              <div className="relative mb-4">
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full border border-neutral-200 px-4 py-3 text-sm outline-none rounded-none focus:border-black focus:ring-1 focus:ring-black text-black bg-white appearance-none cursor-pointer"
                  required
                  id="country-input"
                >
                  <option value="" disabled>Select country</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Romania">Romania</option>
                  <option value="Germany">Germany</option>
                  <option value="United States">United States</option>
                  <option value="Switzerland">Switzerland</option>
                  <option value="France">France</option>
                </select>
                <label
                  htmlFor="country-input"
                  className="absolute left-3 -top-[9px] bg-white px-1.5 text-[11px] font-semibold text-neutral-700 tracking-wide select-none"
                >
                  Country*
                </label>
                <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-neutral-500">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wide mb-2 select-none">
                  Shopping preferences
                </label>
                <div className="flex flex-col gap-2">
                  <label className={`flex items-center justify-between border px-4 py-2.5 cursor-pointer transition-all ${
                    shoppingPreference === 'Female' ? 'border-black bg-neutral-50' : 'border-neutral-200 hover:border-neutral-300'
                  }`}>
                    <span className="text-sm font-medium text-black">Female</span>
                    <input
                      type="radio"
                      name="shoppingPreference"
                      value="Female"
                      checked={shoppingPreference === 'Female'}
                      onChange={() => setShoppingPreference('Female')}
                      className="w-4 h-4 accent-black cursor-pointer"
                      required
                    />
                  </label>
                  <label className={`flex items-center justify-between border px-4 py-2.5 cursor-pointer transition-all ${
                    shoppingPreference === 'Male' ? 'border-black bg-neutral-50' : 'border-neutral-200 hover:border-neutral-300'
                  }`}>
                    <span className="text-sm font-medium text-black">Male</span>
                    <input
                      type="radio"
                      name="shoppingPreference"
                      value="Male"
                      checked={shoppingPreference === 'Male'}
                      onChange={() => setShoppingPreference('Male')}
                      className="w-4 h-4 accent-black cursor-pointer"
                    />
                  </label>
                </div>
              </div>

              <label className="flex items-start gap-3 mb-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={subscribeNewsletter}
                  onChange={(e) => setSubscribeNewsletter(e.target.checked)}
                  className="w-4 h-4 mt-0.5 accent-black cursor-pointer rounded-none border-neutral-300"
                />
                <span className="text-xs text-neutral-600 leading-tight">
                  I would like to subscribe to the newsletter
                </span>
              </label>

              <label className="flex items-start gap-3 mb-5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-4 h-4 mt-0.5 accent-black cursor-pointer rounded-none border-neutral-300"
                  required
                />
                <span className="text-xs text-neutral-600 leading-tight">
                  I agree to the <a href="#" className="underline font-semibold text-black hover:text-neutral-700">Terms of Use</a> and have read the <a href="#" className="underline font-semibold text-black hover:text-neutral-700">Privacy Policy</a> *
                </span>
              </label>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-4 font-bold text-sm tracking-widest hover:bg-neutral-950 active:bg-neutral-900 transition-all duration-150 rounded-none uppercase cursor-pointer disabled:bg-neutral-400 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : 'Continue'}
              </button>
            </form>
          )}
        </div>

        {step === 1 && (
          <div className="text-left mt-6 text-xs text-neutral-600">
            {isSignUp ? (
              <span>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(false)
                    setStep(1)
                    setMessage({ type: '', text: '' })
                  }}
                  className="underline font-bold text-black hover:text-neutral-700 cursor-pointer transition-colors"
                >
                  Log in
                </button>
              </span>
            ) : (
              <span>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(true)
                    setStep(1)
                    setMessage({ type: '', text: '' })
                  }}
                  className="underline font-bold text-black hover:text-neutral-700 cursor-pointer transition-colors"
                >
                  Sign up
                </button>
              </span>
            )}
          </div>
        )}

      </div>
    </div>
  )
}

export default SignUp

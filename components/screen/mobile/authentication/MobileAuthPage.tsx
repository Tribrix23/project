'use client'
import React, { useState } from 'react'
import Infos from './components/Infos'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import TermsPolicy from './pages/TermsPolicy'

type MobileAuthPageProps = {
  onAuthenticated?: () => void
}

type FormData = {
  username: string
  firstName: string
  middleName: string
  lastName: string
  email: string
  phone: string
  password: string
  confirmPassword: string
}

const MobileAuthPage = ({ onAuthenticated }: MobileAuthPageProps) => {
  const [path, setPath] = useState<number>(2)
  const [termsAgreed, setTermsAgreed] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    username: '',
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })

  const handleTermsAgree = () => {
    setTermsAgreed(true)
    setPath(2)
  }

  const handleGoBackToRegister = () => {
    setPath(2)
  }

  return (
    <div className='w-full h-full flex flex-col relative overflow-hidden'>
        {path === 0  && (
            <Infos 
            onLogin={() => setPath(1)}
            onRegister={() => setPath(2)}
            />
        )}
        {path === 1  && (
            <Login 
              onForgotPassword={() => setPath(6)} 
              onGoBack={() => {
                setTermsAgreed(false)
                setPath(0)
              }}
              onRegister={() => setPath(2)}
            />
        )}
        {path === 2  && (
            <Register 
              onGoBack={() => {
                setTermsAgreed(false)
                setPath(0)
              }} 
              termsAndServices={() => setPath(10)}
              isTermsAgreed={termsAgreed}
              onLogin={() => setPath(1)}
              formData={formData}
              setFormData={setFormData}
            />
        )}
        {path === 6  && (
            <ForgotPassword onGoBack={() => setPath(1)}/>
        )}
        {path === 10  && (
            <TermsPolicy 
              onGoBack={handleGoBackToRegister}
              onAgree={handleTermsAgree}
            />
        )}
    </div>
  )
}

export default MobileAuthPage
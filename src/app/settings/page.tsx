'use client'

import { useState } from 'react'
import { Bell, Lock, Eye, EyeOff, Moon, Sun } from 'lucide-react'
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Switch } from "~/components/ui/switch"
import SettingsSidebar from '~/components/sidebar/settings-sidebar'
import AccountSettingsPage from './account/page'
import BillingPage from './billing/page'
import ProfilePage from './profile/page'

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    darkMode: true,
    twoFactorAuth: false,
  })
  const [activePage, setActivePage] = useState('Profile');

  const [passwordFields, setPasswordFields] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  })

  const handleSettingChange = (setting: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [setting]: !prev[setting] }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordFields(prev => ({ ...prev, [name]: value }))
  }

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the updated settings and password to your backend
    console.log('Updated settings:', settings)
    console.log('Password change request:', passwordFields)
  }

  return (
    <main className="min-h-screen bg-gray-900 text-gray-100">
          <div className="flex h-screen bg-gray-900 text-gray-100">
            <SettingsSidebar activePage={activePage} setActivePage={setActivePage} />
        <div className='flex flex-col w-full'>

        <h1 className='mt-8 ml-8 mb-0 text-5xl'>{activePage}</h1>
        {activePage === 'Profile' && <ProfilePage />}

        {activePage === 'Account' && <AccountSettingsPage />}
        {activePage === 'Billing' && <BillingPage />}
        </div>
      </div>
    </main>
  )
}


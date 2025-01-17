'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "~/components/ui/dialog"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { submitEmail } from '../server/actions'
import { Label } from './ui/label'
import Loading from './Loading'

export function WaitlistModal() {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(name : string, email : string) {
    
    const result = await submitEmail(name, email)
    .then(res => {
      setLoading(false)
      setMessage(res.message)
      setSuccess(res.statusCode?.toString().startsWith('2') ?? false)
    })
    .catch(err => {
      setLoading(false)
      console.log('err', err)
    })
    console.log('res', result)
  }

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  function handleChange(e: any) {
    setName(e.target.value)
  }

  function handleEmailChange(e: any) {
    setEmail(e.target.value)
  }
  return (
    <>
      <Button 
        onClick={() => setOpen(true)}
        className="bg-red-600 mx-auto hover:bg-red-500 text-white font-bold sm: py-4 md:py-8 sm:text-xl lg:text-2xl md:text-3xl md:pd-8 lg:p-8 rounded-full"    
      >
        Sign up for Beta
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white border-red-400">
            <DialogTitle>Join the Beta Waitlist</DialogTitle>
          <DialogHeader>
            <DialogDescription>
              Enter your email to be notified when we launch the Beta program. We will be taking in
              batches of 50 people at a time. By signing up, you agree to our 
              <a href="/privacy" className="underline">Privacy Policy</a>.
            </DialogDescription>
          </DialogHeader>
          <div>
            <div className="grid gap-4 py-4">
              <Label htmlFor='name'>Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={handleChange}
                className="bg-gray-800 border-gray-700 text-white"
                required
              />
              <Label htmlFor='email'>Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your email"
                className="bg-gray-800 border-gray-700 text-white"
                required
              />
              {loading && <Loading text='Submitting...' /> }
              <Button
              className={"bg-red-400 hover:bg-red-500 text-red-950 " + (loading && 'hidden')}
              onClick={() => {
                setLoading(true)
                setMessage('');
                handleSubmit(name, email)
              }}
              >
              Submit
              </Button>
            </div>
          </div>
          {message && <p className={"mt-2 " + (success ? "text-green-400" : "text-red-400")}>{message}</p>}
        </DialogContent>
      </Dialog>
    </>
  )
}


'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "~/components/ui/dialog"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { submitEmail } from '../server/actions'
import { Label } from './ui/label'

export function WaitlistModal() {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')

  async function handleSubmit(formData: FormData) {
    console.log('submitting join...', formData.get('email'))
    const result = await submitEmail(formData)
    console.log('res', result)
    setMessage(result.message)
  }

  return (
    <>
      <Button 
        onClick={() => setOpen(true)}
        className="bg-red-400 hover:bg-red-500 text-red-950 font-bold py-2 px-4 rounded"
      >
        Get Notified When Beta Opens
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white border-red-400">
          <DialogHeader>
            <DialogTitle>Join the Beta Waitlist</DialogTitle>
            <DialogDescription>
              Enter your email to be notified when we launch the Beta program. We will be taking in
              batches of 50 people at a time. By signing up, you agree to our 
              <a href="/privacy" className="underline">Privacy Policy</a>.
            </DialogDescription>
          </DialogHeader>
          <form action={handleSubmit}>
            <div className="grid gap-4 py-4">
              <Label htmlFor='name'>Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your name"
                className="bg-gray-800 border-gray-700 text-white"
                required
              />
              <Label htmlFor='email'>Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 border-gray-700 text-white"
                required
              />
              <Button type="submit" className="bg-red-400 hover:bg-red-500 text-red-950">
                Submit
              </Button>
            </div>
          </form>
          {message && <p className="text-green-400 mt-2">{message}</p>}
        </DialogContent>
      </Dialog>
    </>
  )
}


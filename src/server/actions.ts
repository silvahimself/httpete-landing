'use server'

import axios from "axios"
import { headers } from 'next/headers'

export async function submitEmail(formData: FormData) {
  const email = formData.get('email')
  const name = formData.get('name')
  const base = "https://api.httpete.dev/"
  
  // Get IP address from headers
  const headersList = await headers()
  const forwarded = headersList.get('x-forwarded-for')
  const clientIp = forwarded ? forwarded.split(',')[0] : headersList.get('x-real-ip')
  
  let result = -1
  let message = ""

  try {
    const response = await axios.post(base + 'api/landing/join-waitlist', {
      name,
      email,
      clientIp
    })
    
    console.log(`Email submitted: ${email} - ${response.data.message}`)
    result = 1
    message = "Thank you for joining!"
  } catch (err) {
    console.error('Error submitting to waitlist:', err)
    result = -1
    message = 'An error occurred while joining the waitlist: ' + err;
  }

  return { success: result !== -1, message }
}
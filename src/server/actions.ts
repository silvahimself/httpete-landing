'use server'

import axios from "axios"
import { headers } from 'next/headers'

interface WaitlistResponse {
  result: boolean
  message: string
  statusCode: number
}

export async function submitEmail(name:string, email:string) {
  
  const base = process.env.NEXT_PUBLIC_API_URL 
    ?? "https://api.httpete.dev/api";
  
  // Get IP address from headers
  const headersList = await headers()
  const forwarded = headersList.get('x-forwarded-for')
  const clientIp = forwarded ? forwarded.split(',')[0] : headersList.get('x-real-ip')

  try {
    const response = await axios.post<WaitlistResponse>(base + '/landing/join-waitlist', {
      name,
      email,
      clientIp
    })
    
    return {
      success: response.data.result,
      message: response.data.message,
      statusCode: response.data.statusCode
    };
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.data?.message) {
      // If we have a structured error response from the API, use that message
      return {
        success: false,
        message: err.response.data.message,
        statusCode: err.response.status
      }
    }
    
    // Fallback for network/other errors
    return {
      success: false,
      message: 'An error occurred while joining the waitlist. Please try again later.'
    }
  }
}
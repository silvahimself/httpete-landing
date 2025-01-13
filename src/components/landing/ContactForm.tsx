'use client'

import axios from 'axios'
import { CircleUserRound, LoaderPinwheel, LoaderPinwheelIcon } from 'lucide-react';
import { useState } from 'react'
import { baseUrl } from '~/model'
import toastr from "toastr";

export default function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [contacted, setContacted] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault()
    if (contacted) {
      return;
    }
    axios.post(baseUrl + '/api/landing/contact', formData)
    .then(res => {
      setFormData({
        email: formData.email,
        name: formData.name,
        message: res.data.toString()
      })
      toastr.success('Successfully sent message!')
      setContacted(true);
    })
    .catch(err => { toastr.error('An error occurred', err)})
    .finally(() => setIsLoading(false))
  }

  return (
    <section id='contact' className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-2">Contact Us</h2>
        {!contacted ? <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              {isLoading ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </form>
        : 
        <>
          <div className='text-center mb-8'>
            <span>
              Your message 
              </span>
            <span style={{fontWeight: '700', color: 'green', marginLeft:'0.25rem', marginRight:'0.5rem'}}>
              has been sent!
              </span>
            <span>
              We will get back to you as soon as we can!
              </span>
              </div>
        <div style={{backgroundColor:'#1F2937', padding:'10px', maxHeight:'600px', overflow:"visible"}}>
          <p style={{color:'gray'}}>
            <span style={{fontWeight:800, marginRight:'0.25rem' }}>From:</span>
            <span>{formData.name}{" "}({formData.email})</span>
            </p>
          <p style={{color:'gray'}}>
            <span  
  style={{ fontWeight: 800, marginRight:'0.25rem' }}>Message:</span>
  <div      dangerouslySetInnerHTML={{ __html: formData.message.toString() }}></div>
            </p>
        </div>
        </>}
      </div>
    </section>
  )
}
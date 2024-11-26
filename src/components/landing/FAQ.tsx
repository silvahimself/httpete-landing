'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

const faqs = [
  {
    question: 'How does HttPete differ from Postman?',
    answer: 'HttPete combines API testing functionality similar to Postman with integrated documentation capabilities, allowing you to test and document your APIs in one seamless workflow.'
  },
  {
    question: 'Can I migrate my existing Postman collections to HttPete?',
    answer: 'Yes, HttPete provides an import feature that allows you to easily migrate your existing Postman collections, ensuring a smooth transition.'
  },
  {
    question: 'How does the AI-powered assistance work?',
    answer: 'Our AI analyzes your API requests, responses, and existing documentation to suggest relevant content, helping you create comprehensive documentation more quickly and efficiently.'
  },
  {
    question: 'Is there a limit to the number of API calls I can make?',
    answer: 'The Free plan has a limit of 1000 API calls per month. The Pro plan offers unlimited API calls. For Enterprise plans, we can customize limits based on your needs.'
  },
  {
    question: 'Can I use HttPete for both internal and public API documentation?',
    answer: 'HttPete is designed to handle both internal and public API documentation needs, with features to control access and visibility of your documentation.'
  }
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id='faq' className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-gray-700 rounded-lg">
              <button
                className="flex justify-between items-center w-full p-4 text-left"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>
              {openIndex === index && (
                <div className="p-4 pt-0">
                  <p className="text-gray-300">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


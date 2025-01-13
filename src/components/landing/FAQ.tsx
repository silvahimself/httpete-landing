'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import React from 'react'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'


const faqs = [
  {
    question: 'How does HttPete differ from Postman?',
    answer: <p className="text-gray-300">
      HttPete combines API testing functionality similar to Postman with integrated documentation capabilities, allowing you to test and document your APIs in one seamless workflow.
    </p>
  },
  {
    question: 'Can I migrate my existing Postman collections to HttPete?',
    answer: <p className="text-gray-300">Yes, HttPete provides an import feature that allows you to easily migrate your existing Postman collections, ensuring a smooth transition.</p>
  },
  {
    question: 'How does the AI-powered assistance work?',
    answer:
      <p className="text-gray-300">

        <Tooltip>
        <TooltipTrigger asChild>
          <span className='text-yellow-400 hover:cursor-pointer hover:ring-2 ring-yellow-500 mr-0 hover:text-black hover:bg-yellow-400 p-1 rounded-full'>
            Pete
          </span>

        </TooltipTrigger>
        <TooltipContent
          side="right"
          align="center"
          className='bg-slate-300 px-2 py-1'
          > 
          <div className='max-w-xs'>

          Pete is HttPete's AI assistant. Currently it integrates with Claude Sonnet 3.5 to achieve things like generating documents and even diagrams.
          </div>
        </TooltipContent>
      </Tooltip>
        can help with formatting, transforming request data, suggesting tests, structuring documentation, and even generating step-by-step guides and technical documentation based on request data.
      </p>

  },
  {
    question: 'Is there a limit to the number of API calls I can make?',
    answer: <p className="text-gray-300">Absolutely not! HttPete is an API client, all requests are made from your machine, so it would make no sense for us to limit that.
    There are certain usage limits on the free plan, such as number of documents or maximum document length, but those are associated with real costs on our end. Making API calls
    is HttPete's main feature and will <b className='text-gray-100'><u>always</u></b> be <b className='text-gray-100'><u>free and unlimited</u></b>
    </p>
  },
  {
    question: 'Can I use HttPete for both internal and public API documentation?',
    answer: <p className="text-gray-300">
      Yes! HttPete allows for endpoint specific documentation, as well as generalized documentation. Additionally,
      HttPete supports different Categories, Tags, and even diagrams!
    </p>
  }
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id='faq' style={{ maxWidth: '1000px' }} className="py-20 mx-auto my-10 px-4 sm:px-6 lg:px-8 bg-gray-800">
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
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface FAQ {
  question: string
  answer: React.ReactElement
}

interface FAQAccordionProps {
  faq: FAQ
  index: number
}

export function FAQAccordion({ faq, index }: FAQAccordionProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border border-red-400 rounded-lg overflow-hidden">
      <header 
        onClick={() => setIsOpen(!isOpen)}
        className={`flex justify-between items-center p-4 cursor-pointer transition-colors hover:bg-red-500 ${
          isOpen ? 'bg-red-500' : ''
        }`}
      >
        <h3 className="text-lg font-medium">{faq.question}</h3>
        <ChevronDown 
          className={`w-6 h-6 text-red-500 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </header>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="p-4 pt-4 text-gray-300">
          {faq.answer}
        </div>
      </div>
    </div>
  )
}


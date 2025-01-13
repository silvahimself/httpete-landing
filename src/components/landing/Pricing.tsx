'use client'

import { ArrowRight, Check, X } from 'lucide-react'
import { Button } from '../ui/button'

const plans = [
  {
    name: 'Free',
    price: '$0',
    features: [
      'Basic API testing',
      '1 Organization',
      '1 project',
      '1GB storage',
      'Up to 100 documents', 
      'Up to 5000 characters per document',
      'Community support'
    ],
    notIncluded: [
      'AI-powered assistance',
      'Team collaboration',
      'Advanced integrations'
    ]
  },
  {
    name: 'Pro',
    price: '$19',
    features: [
      'Advanced API testing',
      'Unlimited documentation of any size',
      'Unlimited projects',
      '20GB storage',
      'AI-powered assistance',
      'Team collaboration',
      'E-mail Support'
    ],
    notIncluded: [
      'Custom integrations'
    ]
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    features: [
      'Everything in Pro',
      'Unlimited storage',
      'Custom integrations',
      'Dedicated account manager',
      'Priority Support',
      'SLA',
      'On-premise deployment option'
    ],
    notIncluded: []
  }
]

export default function Pricing({openWaitlistModal} : {openWaitlistModal: () => void}) {
  return (
    <section id='pricing' className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto">
        <h2 className="text-7xl font-bold text-center mb-12">Pricing</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div key={index} className="bg-gray-800 p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
              <p className="text-4xl font-bold mb-6">{plan.price}</p>
              <ul className="mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center mb-2">
                    <Check className="w-5 h-5 text-green-500 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
                {plan.notIncluded.map((feature, i) => (
                  <li key={i} className="flex items-center mb-2 text-gray-500">
                    <X className="w-5 h-5 text-red-500 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg inline-flex items-center transition duration-300"
              onClick={openWaitlistModal}
              >
                Join Waitlist
              <ArrowRight className="ml-2" />
            </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


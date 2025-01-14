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
      <div className="text-gray-300">
        <Tooltip>
          <TooltipTrigger asChild>
            <span className='text-yellow-400 -ml-1 hover:cursor-pointer hover:ring-2 ring-yellow-500 mr-0 hover:text-black hover:bg-yellow-400 p-1 rounded-full'>
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
      </div>
  },
  {
    question: 'Is there a limit to the number of API calls I can make?',
    answer: <p className="text-gray-300">Absolutely not! HttPete is an API client, all requests are made from your machine, so it would make no sense for us to limit that.
    If you choose to self-host, there are no costs for you. If you decide to go with our cloud hosting, there are certain usage limits on the free plan, such as number of documents or maximum document length, as those 
    are associated with real costs on our end. However, you'll always be able to host everything yourself and lift these limits.
    </p>
  },
  {
    question: 'Can I use HttPete for both internal and public API documentation?',
    answer: <p className="text-gray-300">
      Yes! HttPete allows for endpoint-specific documentation, as well as generalized documentation. Additionally,
      HttPete will also be able to generate static html 
      websites from your documentation, making sharing documentation just one click away.
    </p>
  },
  {
    question: 'What platforms does HttPete support?',
    answer: <p className="text-gray-300">
      HttPete is a cross-platform application, supporting Windows, macOS, and Linux, ensuring compatibility with [almost] any development environment.
    </p>
  },
  {
    question: 'Is HttPete open source?',
    answer: <p className="text-gray-300">
      Not yet, but we are working on it! We will be open sourcing the project as soon as we have a stable version ready for public use.
    </p>
  },
  {
    question: 'Does HttPete offer team collaboration features?',
    answer: <p className="text-gray-300">
      Yes! HttPete supports team collaboration by allowing you to share API documentation, collections, and test results with your team members.
    </p>
  }
]


import React from 'react'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import { FAQAccordion } from '../FAQAccordion'


export default function FAQ() {
  return (
    <section 
      id='faq' 
      style={{ maxWidth: '1400px' }} 
      className="py-20 mx-auto my-10 px-4 bg-gray-900 border-8 rounded-lg border-gray-800"
    >
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h1>
        
        {/* Static content for SEO */}
        <div className="hidden">
          {faqs.map((faq, index) => (
            <div key={index}>
              <h2>{faq.question}</h2>
              <div>{faq.answer}</div>
            </div>
          ))}
        </div>

        {/* Interactive accordion */}
        <article className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQAccordion
            index={index}
            key={index}
              faq={faq}
            />
          ))}
        </article>
      </div>
    </section>
  )
}
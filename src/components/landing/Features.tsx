import { Code, BookOpen, Zap, Users } from 'lucide-react'
import Pete from './Pete'

const features = [
  {
    icon: <Code className="w-12 h-12 text-red-500" />,
    title: 'Powerful API Testing',
    description: 'Test your API endpoints with ease, save requests/responses, and manage your testing workflow efficiently.'
  },
  {
    icon: <BookOpen className="w-12 h-12 text-red-500" />,
    title: 'Integrated Documentation',
    description: 'Write comprehensive documentation for your API endpoints directly within the testing environment.'
  },
  {
    icon: <Zap className="w-12 h-12 text-red-500" />,
    title: 'AI-Powered Assistance',
    description: 'Leverage AI to analyze your API data and get suggested documentation content, streamlining the process.'
  },
  {
    icon: <Users className="w-12 h-12 text-red-500" />,
    title: 'Collaboration & Workflow',
    description: 'Enable team collaboration on API testing and documentation with version control and access management.'
  }
]

export default function Features() {
  return (
    <section id='features' style={{maxWidth:'1400px'}} className=" rounded-lg py-10 mt-8 md:m-8 lg:m-8 px-8 border-8 border-gray-800">
      <div className="mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-700 p-6 rounded-lg shadow-lg">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
        {/* <Pete /> */}
      </div>
    </section>
  )
}


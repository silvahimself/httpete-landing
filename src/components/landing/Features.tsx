import { Code, BookOpen, Zap, Users, FileJson, Pencil } from 'lucide-react'
import Pete from './Pete'

const features = [
  {
    icon: <FileJson className="w-12 h-12 text-red-500" />,
    title: 'OpenAPI & Postman Import',
    description: 'Import OpenAPI specs or Postman Collections to automatically generate comprehensive endpoint documentation.'
  },
  {
    icon: <Pencil className="w-12 h-12 text-red-500" />,
    title: 'Rich Markdown Documentation',
    description: 'Create detailed markdown documents for each endpoint, including images, diagrams, and custom content not supported in OpenAPI.'
  },
  {
    icon: <Code className="w-12 h-12 text-red-500" />,
    title: 'Built-in API Client',
    description: 'Test endpoints, embed responses directly in docs, and automatically track necessary environment variables.'
  },
  {
    icon: <Zap className="w-12 h-12 text-red-500" />,
    title: 'Dynamic Spec Updates',
    description: 'Automatically detect changes in API requests and update the OpenAPI spec to reflect actual usage.'
  },
  {
    icon: <BookOpen className="w-12 h-12 text-red-500" />,
    title: 'Centralized Documentation',
    description: 'Manage endpoint-specific and general documentation in a separate, organized tab for easy access and maintenance.'
  },
  {
    icon: <Users className="w-12 h-12 text-red-500" />,
    title: 'Collaboration & Workflow',
    description: 'Enable team collaboration on API documentation and testing with version control and access management.'
  }
]

export default function Features() {
  return (
    <section id='features' style={{maxWidth:'1400px'}} className="rounded-lg py-10 mt-8 md:m-8 lg:m-8 px-8 border-8 border-gray-800">
      <div className="mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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



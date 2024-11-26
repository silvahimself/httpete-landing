import Link from 'next/link'
import { Code, Twitter, GitlabIcon as GitHub, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center">
              <Code className="w-8 h-8 text-red-500 mr-2" />
              <span className="text-xl font-bold">HttPete</span>
            </Link>
            <p className="mt-2 text-sm">API Testing & Documentation in One</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><Link href="#features" className="hover:text-red-500 transition duration-300">Features</Link></li>
              <li><Link href="#pricing" className="hover:text-red-500 transition duration-300">Pricing</Link></li>
              <li><Link href="#" className="hover:text-red-500 transition duration-300">Documentation</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:text-red-500 transition duration-300">About Us</Link></li>
              <li><Link href="#" className="hover:text-red-500 transition duration-300">Careers</Link></li>
              <li><Link href="#" className="hover:text-red-500 transition duration-300">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-red-500 transition duration-300">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition duration-300">
                <GitHub className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition duration-300">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} HttPete. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}


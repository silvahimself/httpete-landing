import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function Hero() {
  return (
    <section id='hero' className="py-10 lg:py-52 px-4 sm:px-6 lg:px-8">
      <div className="max-w-full lg:mx-20 md:mx-14 sm:mx-8">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              HttPete: API Testing & Documentation in One
            </h1>
            <p className="text-xl mb-8">
              Combine the power of Postman's API testing with seamless documentation capabilities. Streamline your workflow and boost efficiency.
            </p>
            <Link href='/register' className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg inline-flex items-center transition duration-300">
              Get Started Free
              <ArrowRight className="ml-2" />
            </Link>
          </div>
          <div className="lg:w-1/2 mt-12 lg:mt-0">
            <Image
              src="https://utfs.io/f/5VzIfIO6yTtGrGtm0ZUA7NwZ2GvUhkHEfeyx9bBPKiJVFjm0"
              alt="API Testing Illustration"
              width={1200}
              height={800}
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}


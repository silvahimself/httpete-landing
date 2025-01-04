import { WaitlistModal } from '~/components/WaitlistModal'
import { ImageModal } from '~/components/ImageModal'
import Features from '~/components/landing/Features'
import FAQ from '~/components/landing/FAQ'

export default function ComingSoon() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <div className="mt-8 mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-red-400">
          HttPete - Making APIs Great Again
        </h1>
        <p className="text-xl mb-8 text-gray-300">
          Streamline your API workflow: Test and document simultaneously. 
          Coming soon to revolutionize backend development.
        </p>
        
          <ImageModal 
            src="https://utfs.io/f/5VzIfIO6yTtGrGtm0ZUA7NwZ2GvUhkHEfeyx9bBPKiJVFjm0" 
            alt="API Testing Platform Interface"
          />
        <WaitlistModal />
      </div>
      <div className='m-4'>
        <Features/>
      </div>
      <div className='m-4 w-full'>
        <FAQ/>
      </div>
    </div>
  )
}
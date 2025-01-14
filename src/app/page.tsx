import { WaitlistModal } from '~/components/WaitlistModal'
import { ImageModal } from '~/components/ImageModal'
import Features from '~/components/landing/Features'
import FAQ from '~/components/landing/FAQ'
import { SocialIcon } from 'react-social-icons'
import { Separator } from '~/components/ui/separator'
import RoadmapTimeline from '~/components/RoadmapTimeline'

export default function ComingSoon() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <div className="mt-8 mx-auto text-center w-full" style={{maxWidth:'1400px'}} >
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-red-400">
          HttPete
        </h1>
        <h3 className="text-3xl font-bold mb-6 text-red-400">
          The last API Client You'll ever need
        </h3>
        <div className='border-8 py-8 rounded-lg border-gray-800 w-full p-8'>

        <p className="text-xl mb-8 text-gray-300">
          Streamline your API workflow: Test and document simultaneously.
          Coming soon to revolutionize backend development.
        </p>

    <div className='hidden md:block lg:block'>
        <ImageModal
          src="https://4h8dx3lodh.ufs.sh/f/5VzIfIO6yTtGyVOHuFShGSbxpocvdO2lHB3AsiTCLP8KND0R"
          alt="API Testing Platform Interface"
          />
    </div>
        <WaitlistModal />

        <div className="mt-12 flex flex-col text-center justify-center">
  <div className='flex flex-row text-sm items-center justify-center text-gray-400'>
    <Separator
      className='w-1/3'
      orientation="horizontal"
      style={{ backgroundColor: '#cb2c2c' }}
    />
    <p className='w-1/5 text-white'>Join the Community</p>
    <Separator
      className='w-1/3'
      orientation="horizontal"
      style={{ backgroundColor: '#cb2c2c' }}
    />

  </div>
  <div className="mt-4 flex justify-center space-x-4">
    <SocialIcon
      url="https://discord.gg/ur7RB6XydJ"
      network="discord"
      bgColor="#cb2c2c"
      className="m-2 hover:border-4 hover:border-white rounded-full transition-opacity"
    />
    <SocialIcon
      url="https://www.linkedin.com/company/httpete"
      network="linkedin"
      bgColor="#cb2c2c"
      className="m-2 hover:border-4 hover:border-white rounded-full transition-opacity"
    />
    <SocialIcon
      url="https://www.reddit.com/r/httpete/"
      network="reddit"
      bgColor="#cb2c2c"
      className="m-2 hover:border-4 hover:border-white rounded-full transition-opacity"
    />
  </div>
  {/* <Separator
      className='w-full mx-auto mt-4'
      orientation="horizontal"
      style={{ backgroundColor: '#cb2c2c' }}
    /> */}
</div>

        </div>
      </div>
      <div className='m-4'>
        <Features />
      </div>
      <div className='m-4 w-full'>
        <RoadmapTimeline/>
      </div>
      <div className='m-4 w-full'>
        <FAQ />
      </div>
    </div>
  )
}


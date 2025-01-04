import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import HeroVideoDialog from '../ui/hero-video-dialog'
import { Button } from '../ui/button'

export default function Hero({openWaitlistModal} : {openWaitlistModal: () => void}) {
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
            <Button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg inline-flex items-center transition duration-300"
              onClick={openWaitlistModal}
            >
              Join Waitlist
              <ArrowRight className="ml-2" />
            </Button>
          </div>
          <div className="lg:w-2/3 mt-12 lg:mt-0">
            <div className="relative">
              <HeroVideoDialog
                className="dark:hidden block"
                animationStyle="from-center"
                videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
                thumbnailSrc="https://media.giphy.com/media/eMPnElfp2FJrgFoVOV/giphy.gif?cid=790b76116urzjpl1uczc2jnl2enyx0v2fvmrk3pip3fd7ccg&ep=v1_gifs_search&rid=giphy.gif&ct=g"
                thumbnailAlt="Hero Video"
              />
              <HeroVideoDialog
                className="hidden dark:block"
                animationStyle="from-center"
                videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
                thumbnailSrc="https://startup-template-sage.vercel.app/hero-dark.png"
                thumbnailAlt="Hero Video"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react';
import HeroVideoDialog from '../ui/hero-video-dialog';

const Pete = () => {
    return (
        <section id='pete' className="py-10 lg:py-52 px-4 sm:px-6 lg:px-8 bg-slate-800 border-2 mt-8 border-gray-600 rounded-xl">
            <div className="max-w-full lg:mx-20 md:mx-14 sm:mx-8">
                <div className="flex flex-col-reverse lg:flex-row-reverse gap-8 items-cente">
                    <div className="lg:w-1/3 lg:pr-1">
                        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                            Magic Pete
                        </h1>
                        <p className="text-xl mb-8">
                            Your powerful AI companion, tailored for developer work.
                        </p>
                        <Link href='/register' className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg inline-flex items-center transition duration-300">
                            Get Started Free
                            <ArrowRight className="ml-2" />
                        </Link>
                    </div>
                    <div className="lg:w-2/3 mt-12 lg:mt-0">
                        <div className="relative">
                            <HeroVideoDialog
                                className="dark:hidden block"
                                animationStyle="from-center"
                                videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
                                thumbnailSrc="https://startup-template-sage.vercel.app/hero-light.png"
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

export default Pete;
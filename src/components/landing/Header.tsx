'use client'
import Link from 'next/link'
import Image from 'next/image';

export default function Header() {  

  function isMobile(): boolean {
    const width = window.innerWidth;
    const height = window.innerHeight;
    // Define mobile breakpoint (e.g., 768px)
    const mobileBreakpoint = 768; // Common breakpoint for mobile devices


    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const isMobileAgent = /android|avantgo|blackberry|bada|bb10|iemobile|opera mini|opera mobi|phone|mobile|mini|wap/i.test(userAgent);

    return width < mobileBreakpoint || isMobileAgent;
  }

  return (
    <header className="bg-gray-800 py-4 sticky relative top-0">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <>
            <Image src="https://utfs.io/f/5VzIfIO6yTtGnHrN3BtGQJcDXfzP96NBie4G3S2vqupKLw58" alt="HttPete Logo" width={64} height={40} className="mr-4" />
            </>
          </Link>
          <nav>
            <ul className="flex space-x-4">
              <li><Link href="#features" className="hover:text-red-500 transition duration-300">Features</Link></li>
              <li><Link href="#faq" className="hover:text-red-500 transition duration-300">FAQ</Link></li>
              <li><Link href="#pricing" className="hover:text-red-500 transition duration-300">Pricing</Link></li>
              <li><Link href="#contact" className="hover:text-red-500 transition duration-300">Contact</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}


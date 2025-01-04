'use client'

import { useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import { Dialog, DialogContent } from "~/components/ui/dialog"

interface ImageModalProps {
  src: string
  alt: string
}

export function ImageModal({ src, alt }: ImageModalProps) {
  const [open, setOpen] = useState(false)
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const imageRef = useRef<HTMLDivElement>(null)

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault()
    setScale(prevScale => Math.max(1, prevScale + e.deltaY * -0.01))
  }, [])

  return (
    <>
      <div 
        className="relative w-full max-w-2xl mx-auto aspect-video rounded-lg overflow-hidden cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className=""
        />
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 border-2 m-6 rounded-xl">
          <div 
          style={{ height: '100vh'}}
            onWheel={handleWheel}
            ref={imageRef}
          >
            <Image
              src={src}
              alt={alt}
              fill
              className="p-0"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}


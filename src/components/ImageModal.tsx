'use client'

import { useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import { Dialog, DialogContent, DialogTitle } from "~/components/ui/dialog"

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
        className="relative mx-auto w-3/4 aspect-video rounded-lg overflow-hidden cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="p-8"
        />
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 border-4 border-opacity-80 border-red-400 m-6 rounded-xl">
          <DialogTitle className="text-xl font-bold">
          HttPete</DialogTitle>
            {alt}
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


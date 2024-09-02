'use client'

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { MiraiIcon } from "@/components/brand/MiraiIcon"
import Link from "next/link"

const Landing = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [showContent, setShowContent] = useState(false)
  const [opacity, setOpacity] = useState(0)
  const [translateY, setTranslateY] = useState(-10)
  const [scale, setScale] = useState(0.95)
  const [blur, setBlur] = useState(0)

  useEffect(() => {
    const video = videoRef.current

    if (video) {
      const onTimeUpdate = () => {
        if (video.duration - video.currentTime <= 2) {
          setShowContent(true)
        }
      }

      video.addEventListener("timeupdate", onTimeUpdate)
      video.play()

      return () => {
        video.removeEventListener("timeupdate", onTimeUpdate)
      }
    }
  }, [])

  useEffect(() => {
    if (showContent) {
      const duration = 1000 // 1 second transition
      const steps = 60 // 60 steps for smooth transition (assumes 60fps)
      const interval = duration / steps

      let step = 0
      const timer = setInterval(() => {
        const progress = step / steps
        setOpacity(progress)
        setTranslateY(-10 * (1 - progress))
        setScale(0.95 + 0.05 * progress)
        setBlur(10 * progress) // Gradually increase blur up to 10px

        step++
        if (step > steps) {
          clearInterval(timer)
        }
      }, interval)

      return () => clearInterval(timer)
    }
  }, [showContent])

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-48 relative">
      <video
        ref={videoRef}
        src="/reversed_cloud_video.mp4"
        className="absolute top-0 left-0 w-full h-full object-cover"
        muted
        playsInline
      />

      <div
        className={`absolute inset-0 flex flex-col items-center justify-center transition-transform duration-1000 ease-in-out`}
        style={{
          opacity: opacity,
          transform: `translateY(${translateY}%) scale(${scale})`,
          pointerEvents: showContent ? 'auto' : 'none'
        }}
      >
        <div className="w-full max-w-2xl space-y-8">
          <div 
            className="rounded-3xl p-8 space-y-6 text-center border-2 bg-white/30"
            style={{
              backdropFilter: `blur(${blur}px)`,
              WebkitBackdropFilter: `blur(${blur}px)`,
            }}
          >
            <div className="flex justify-center items-center">
              <MiraiIcon width={48} height={48} />
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Take the Leap into AI for Education.
            </h1>
            <p className="text-xl text-gray-600">
              Sign up to our waitlist and get the coolest and newest updates.
            </p>
            <div className="mt-10">
              <Link href="/api/auth/signin">
                <Button className="w-full py-6 h-14 text-lg font-medium bg-black text-white hover:bg-gray-800 rounded-full">
                  Sign In
                </Button>
              </Link>
            </div>
            {/* <Button className="w-1/2 py-6 h-14 text-lg font-medium bg-black text-white hover:bg-gray-800 rounded-full">
              Sign Up
            </Button> */}
          </div>

          <div 
            className="rounded-3xl p-6 flex items-center justify-between bg-white/20"
            style={{
              backdropFilter: `blur(${blur}px)`,
              WebkitBackdropFilter: `blur(${blur}px)`,
            }}
          >
            <div className="text-left">
              <p className="text-lg font-medium text-grey-900">
                Get in touch with us.
              </p>
            </div>
            <div className="flex space-x-4">
              <Button variant="outline" className="rounded-full">
                Follow us on X
              </Button>
              <Button variant="outline" className="rounded-full">
                Join Community
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing;

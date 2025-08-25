'use client'
import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import Button from './Button'
import { TiLocationArrow } from 'react-icons/ti'

import { ScrollTrigger, SplitText } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger, SplitText);

const Hero = () => {
   const [currentIndex, setCurrentIndex] = useState(1)
   const [hasClicked, setHasClicked] = useState(false)
   const [isLoading, setIsLoading] = useState(true)
   const [loadedVideos, setLoadedVideos] = useState(0)
   const totalVideos = 4;

   const currentVideoRef = useRef<HTMLVideoElement | null>(null);
   const nextVideoRef = useRef<HTMLVideoElement | null>(null);
   const backgroundVideoRef = useRef<HTMLVideoElement | null>(null);

   const upcomingVideoIndex = (currentIndex % totalVideos) + 1;

   useEffect(() => {
      if (loadedVideos === totalVideos - 1) {
         setIsLoading(false);
      }
   }, [loadedVideos])

   useGSAP(() => {
      if (hasClicked) {
         gsap.set('#next-video', { visibility: 'visible' });
         gsap.to('#next-video', {
            transformOrigin: 'center center',
            scale: 1,
            width: '100%',
            height: '100%',
            duration: 1.5,
            ease: 'power1.inOut',
            onStart: () => { nextVideoRef.current?.play(); }
         })
         gsap.from('#current-video', {
            transformOrigin: 'center center',
            scale: 0,
            duration: 1.5,
            ease: 'power1.inOut'
         })
      }
   }, { dependencies: [currentIndex], revertOnUpdate: true })

   useGSAP(() => {
      gsap.timeline({
         scrollTrigger: {
            trigger: '#video-frame',
            start: 'center center',
            end: 'bottom center',
            scrub: true
         }
      }).fromTo('#video-frame', {
         clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%);',
         borderRadius: '0 0 0 0',
      }, {
         clipPath: 'polygon(14% 0, 72% 0%, 90% 90%, 0% 100%)',
         borderRadius: '0 0 40% 10%',
         duration: 1,
         ease: 'power1.inOut',
      })
   })

   const handleVideoClick = () => {
      setHasClicked(true)
      if (nextVideoRef.current) {
         nextVideoRef.current.pause();
         nextVideoRef.current.currentTime = 0;
      }
      setCurrentIndex(upcomingVideoIndex)
   }

   const handleVideoLoad = () => {
      setLoadedVideos(prev =>  prev + 1);
   }

   const getVideoSrc = (index: number) => `videos/hero-${index}.mp4`;

   return (
      <section className='relative h-dvh w-screen overflow-x-hidden'>
         {isLoading && (
            <div className='flex-center absolute inset-0 z-[100] h-dvh w-screen overflow-hidden bg-violet-50'>
               <div className='three-body'>
                  <div className='three-body__dot' />
                  <div className='three-body__dot' />
                  <div className='three-body__dot' />
               </div>
            </div>
         )}
         <div id='video-frame' className='relative z-10 h-dvh overflow-hidden w-screen rounded-lg bg-blue-75'>
            <div>
               <div className='mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg'>
                  <div className='origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100' onClick={handleVideoClick}>
                     <video
                        ref={currentVideoRef}
                        src={getVideoSrc(upcomingVideoIndex)}
                        loop muted id='current-video'
                        className='size-64 origin-center scale-150 object-cover object-center'
                        preload='auto'
                        onLoadedData={handleVideoLoad}
                        onCanPlay={handleVideoLoad}
                     />
                  </div>
               </div>
               <video
                  ref={nextVideoRef}
                  src={getVideoSrc(currentIndex)}
                  loop muted id='next-video'
                  className='absolute-center invisible absolute z-20 size-64 object-cover object-center'
                  preload='auto'
                  onLoadedData={handleVideoLoad}
                  onCanPlay={handleVideoLoad}
               />
               <video
                  ref={backgroundVideoRef}
                  src={getVideoSrc(currentIndex === totalVideos - 1 ? 1 : currentIndex)}
                  autoPlay loop muted
                  className='absolute left-0 top-0 size-full object-cover'
                  preload='auto'
                  onLoadedData={handleVideoLoad}
                  onCanPlay={handleVideoLoad}
               />
            </div>
            <div className='absolute left-0 top-0 z-40 size-full'>
               <div className='mt-24 px-5 md:px-10'>
                  <h1 className='special-font hero-heading text-blue-100'>redefi<b>n</b>e</h1>
                  <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
                     Enter the Metageme Layer <br /> Unleash the Play Economy
                  </p>
                  <Button id="watch-trailer" title="Watch Trailer" leftIcon={<TiLocationArrow />} containerClass='!bg-yellow-300 flex-center gap-1' />
               </div>
            </div>
            <h1 className='special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75'>G<b>a</b>ming</h1>
         </div>
         <h1 className='special-font hero-heading absolute bottom-5 right-5 text-black'>G<b>a</b>ming</h1>
      </section>
   )
}

export default Hero
'use client'
import React, { useRef } from 'react'
import AnimatedTitle from './AnimatedTitle'
import Image from 'next/image'
import gsap from 'gsap'
import RoundedCorner from './RoundedCorner'
import Button from './Button'

const Story = () => {
   const frameRef = useRef<HTMLImageElement | null>(null);
   const handleMouseLeave = () => {
      gsap.to(frameRef?.current, {
         rotateX: 0,
         rotateY: 0,
         duration: 0.3,
         ease: 'power1.inOut'
      });
   }
   const handleMouseMove = (e: React.MouseEvent) => {
      const { clientX, clientY } = e;
      const element = frameRef.current;
      if (!element) return;
      const { left, top, width, height } = element.getBoundingClientRect();
      const x = (clientX - left);
      const y = (clientY - top);

      const centerX = width / 2;
      const centerY = height / 2;

      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      gsap.to(element, {
         rotateX,
         rotateY,
         duration: 0.3,
         transformPerspective: 500,
         ease: 'power1.inOut'
      });
   }
   return (
      <section id='story' className='min-h-dvh w-screen bg-black text-blue-50'>
         <div className="flex size-full flex-col items-center py-10 pb-24">
            <p className='font-general text-sm uppercase md:text-[10px]'>the mutiversal ip world</p>
            <div className="relative size-full">
               <AnimatedTitle title="The st<b>o</b>ry of <br /> a hidden real<b>m</b>" containerClass='mt-5 pointer-events-none mix-blend-difference relative z-10' />
               <div className='story-img-container'>
                  <div className='story-img-mask'>
                     <div className='story-img-content'>
                        <Image
                           onMouseLeave={handleMouseLeave}
                           onMouseEnter={handleMouseLeave}
                           onMouseUp={handleMouseLeave}
                           onMouseMove={handleMouseMove}
                           ref={frameRef}
                           src={'/img/entrance.webp'}
                           alt='Entrance'
                           className='size-full object-contain object-center'
                           height={500}
                           width={500}
                        />
                     </div>
                  </div>
                  <RoundedCorner />
               </div>
            </div>
            <div className="-mt-40 flex w-full justify-center md:-mt-64 md:me-44 md:justify-end">
               <div className="flex h-full w-fit flex-col items-center md:items-start">
                  <p className="mt-3 max-w-sm md:pr-4 text-center font-circular-web text-violet-50 md:text-start">
                     Where realms converge, lies Zentry and the boundless pillar.
                     Discover its secrets and shape your fate amidst infinite
                     opportunities.
                  </p>

                  <Button
                     id="realm-btn"
                     title="discover prologue"
                     containerClass="mt-5"
                  />
               </div>
            </div>
         </div>
      </section>
   )
}

export default Story
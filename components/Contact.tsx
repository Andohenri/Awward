"use client"
import Image from 'next/image'
import React from 'react'
import Button from './Button';
import AnimatedTitle from './AnimatedTitle';

const ImageClipBox = ({ src, alt, clipClass }: { src: string; alt: string; clipClass: string }) => {
   return (
      <div className={clipClass}>
         <Image src={src} height={300} width={300} alt={alt} />
      </div>
   )
}

const Contact = () => {
   return (
      <section id='contact' className='my-20 min-h-96 w-screen px-10'>
         <div className='relative rounded-lg bg-black py-24 text-blue-50 sm:overflow-hidden'>
            <div className='absolute -left-20 -top-0 hidden  h-full w-72 overflow-hidden sm:block lg:left-20 lg:w-96'>
               <ImageClipBox src={'/img/contact-1.webp'} alt='Contact Image 1' clipClass='contact-clip-path-1' />
               <ImageClipBox src={'/img/contact-2.webp'} alt='Contact Image 2' clipClass='contact-clip-path-2 lg:translate-y-60 translate-y-60' />
            </div>
            <div className='absolute -top-40 left-30 w-60 sm:top-1/2 md:left-auto md:right-10 lg:top-20 lg:w-80'>
               <ImageClipBox src={'/img/swordman-partial.webp'} alt='Swordman Partial' clipClass='absolute md:scale-125 ' />
               <ImageClipBox src={'/img/swordman.webp'} alt='Swordman Partial' clipClass='sword-man-clip-path md:scale-125' />
            </div>
            <div className="flex flex-col items-center text-center">
               <p className='font-general text-[10px] uppercase'>
                  Join zentry
               </p>
               <AnimatedTitle containerClass='mt-10 text-5xl leading-[0.9] md:text-[6rem]' title="Let's b<b>u</b>ild the <br /> n<b>e</b>w era of <br /> g<b>a</b>ming t<b>o</b>gether" />
               <Button title='contact us' id='contact-btn' containerClass='mt-10' />
            </div>
         </div>
      </section>
   )
}

export default Contact
"use client"
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image';
import Button from './Button';
import { TiLocationArrow } from 'react-icons/ti';
import Link from 'next/link';
import { useWindowScroll } from 'react-use';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const navItems = [
   { title: 'Nexus', href: '#nexus' },
   { title: 'Vault', href: '#vault' },
   { title: 'Prolog', href: '#prolog' },
   { title: 'About', href: '#about' },
   { title: 'Contact', href: '#contact' },
];

const NavBar = () => {
   const [isAudioPlaying, setIsAudioPlaying] = useState(false);
   const [isIndicatorActive, setIsIndicatorActive] = useState(false);
   const [lastScrollY, setLastScrollY] = useState(0);
   const [isNavVisible, setIsNavVisible] = useState(false);

   const navContainerRef = useRef<HTMLDivElement>(null);
   const audioElementRef = useRef<HTMLAudioElement>(null);
   const { y: currentScrollY } = useWindowScroll();

   useEffect(() => {
      if (currentScrollY === 0) {
         setIsNavVisible(true);
         navContainerRef.current?.classList.remove('floating-nav');
      }else if (currentScrollY > lastScrollY) {
         setIsNavVisible(false);
         navContainerRef.current?.classList.add('floating-nav');
      }else if (currentScrollY < lastScrollY) {
         setIsNavVisible(true);
         navContainerRef.current?.classList.add('floating-nav');
      }
      setLastScrollY(currentScrollY);
   }, [currentScrollY]);

   useGSAP(() => {
      gsap.to(navContainerRef.current, {
         y: isNavVisible ? 0 : -100,
         opacity: isNavVisible ? 1 : 0,
         duration: 0.3,
         ease: 'power2.out',
      });

   }, [isNavVisible])

   const toggleAudioIndicator = () => {
      setIsAudioPlaying((prev) => !prev);
      setIsIndicatorActive((prev) => !prev);
   }
   useEffect(() => {
      if (isAudioPlaying) {
         audioElementRef.current?.play();
      } else {
         audioElementRef.current?.pause();
      }
   }, [isAudioPlaying]);
   return (
      <div ref={navContainerRef} className='fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6'>
         <header className='absolute top-1/2 w-full -translate-y-1/2'>
            <nav className='flex size-full  items-center justify-between p-4'>
               <div className='flex items-center gap-4'>
                  <Image src={'/img/logo.png'} alt='Logo' width={40} height={40} />
                  <Button id='product-button' title='Product' leftIcon={<TiLocationArrow />} containerClass='bg-blue-500 md:flex hidden items-center justify-center gap-1' />
               </div>
               <div className='flex h-full items-center'>
                  <div className='hidden md:block'>
                     {navItems.map((item, index) => (
                        <Link className='nav-hover-btn' key={index} href={item.href}>{item.title}</Link>
                     ))}
                  </div>
                  <button className='ml-10 flex cursor-pointer items-center space-x-0.5' onClick={toggleAudioIndicator}>
                     <audio className='hidden' src="/audio/loop.mp3" ref={audioElementRef} loop />
                     {[1, 2, 3, 4].map((bar) => (
                        <div key={bar} className={`indicator-line ${isIndicatorActive ? 'active' : ''}`} style={{ animationDelay: `${bar * 0.1}s` }} />
                     ))}
                  </button>
               </div>
            </nav>
         </header>
      </div>
   )
}

export default NavBar
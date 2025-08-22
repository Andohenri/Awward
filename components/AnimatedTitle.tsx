import gsap from "gsap";
import { useEffect, useRef } from "react";

type AnimatedTitleProps = {
   title: string;
   containerClass?: string;
};

const AnimatedTitle = ({ title, containerClass }: AnimatedTitleProps) => {
   const containerRef = useRef<HTMLDivElement>(null);
   useEffect(() => {
      const ctx = gsap.context(() => {
         const titleAnimation = gsap.timeline({
            scrollTrigger: {
               trigger: containerRef.current,
               start: "100 bottom",
               end: "center bottom",
               toggleActions: "play none none reverse",
            }
         });

         titleAnimation.to('.animated-word', { 
            transform: 'translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)', 
            opacity: 1, 
            ease: 'power2.out',
            stagger: 0.02,
         });
         return () => ctx.revert();
      }, containerRef);
   }, []);
   return (
      <div ref={containerRef} className={`animated-title ${containerClass}`}>
         {title.split('<br />').map((line, index) => (
            <div key={index} className="flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3">
               {line.split(' ').map((word, wordIndex) => (
                  <span key={wordIndex} className="special-font animated-word" dangerouslySetInnerHTML={{ __html: word }} />
               ))}
            </div>
         ))}
      </div>
   )
}

export default AnimatedTitle
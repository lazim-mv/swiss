"use client";
import React, { useRef } from 'react';
import { swissVillagePillars } from './container2data';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Container2 = () => {
    const imageRefs = useRef([]);

    useGSAP(() => {
        // Animate each image with clip-path reveal from top to bottom
        imageRefs.current.forEach((imageContainer, index) => {
            if (imageContainer) {
                gsap.fromTo(
                    imageContainer,
                    {
                        clipPath: 'inset(100% 0% 0% 0%)', // Start fully clipped from top
                    },
                    {
                        clipPath: 'inset(0% 0% 0% 0%)', // Reveal completely
                        duration: 1.5,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: imageContainer,
                            start: 'top 80%',
                            end: 'top 30%',
                            scrub: 1, // Smooth scrubbing tied to scroll
                        },
                    }
                );
            }
        });
    }, []);

    return (
        <div className='mt-20 md:mt-36 px-6 md:px-16 lg:px-28' id='foundation'>
            <div className='hidden md:flex items-center justify-center gap-4 md:gap-8 mb-12 md:mb-16  '>
                <hr className='bg-black h-[2px] w-full' />
                <h4 className='text-black w-max whitespace-nowrap text-sm md:text-base'>{swissVillagePillars.title}</h4>
                <hr className='bg-black h-[2px] w-full' />
            </div>
            <h2 className="md:hidden text-left text-black max-w-full md:max-w-[500px] mb-6 md:mb-8">
                {swissVillagePillars.title}
            </h2>
            <div className='flex flex-col md:flex-row items-start justify-between gap-8 md:gap-6 lg:gap-8'>
                {swissVillagePillars.pillars.map((pillar, index) => (
                    <div key={pillar.key} className={`flex flex-col items-center justify-center w-full md:w-auto ${index === 1 ? 'md:mt-28' : ''}`}>
                        <div
                            ref={(el) => (imageRefs.current[index] = el)}
                            className='group w-full md:w-[300px] lg:w-[400px] xl:w-[520px] h-[400px] md:h-[500px] lg:h-[615px] overflow-hidden rounded-xl grayscale-[80%] hover:grayscale-0 relative transition-all duration-700 ease-out'
                            style={{ clipPath: 'inset(100% 0% 0% 0%)' }}
                        >
                            <Image
                                src={pillar.image}
                                alt={pillar.title}
                                className='object-cover absolute top-0 left-0 w-full h-full transition-transform duration-700 ease-out group-hover:scale-150'
                            />
                        </div>
                        <div className='pt-6 md:pt-8 pl-0 md:ml-8 lg:ml-16 md:pl-6 border-l-0 md:border-l-2 border-[#dbdbdb] w-full'>
                            <h3 className='text-black mb-4 md:mb-6 text-left'>{pillar.title}</h3>
                            <p className='text-black text-left text-sm md:text-base'>{pillar.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Container2
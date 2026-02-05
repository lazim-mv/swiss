"use client";
import Image from 'next/image';
import React, { useRef, useState, useEffect } from 'react';
import img1 from '../../../../public/about/2.jpg';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CTAButton from '../CTAButton1';
import Button from '../Button';
import { useWindowSize } from '@react-hook/window-size';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const aboutRef = useRef(null);
    const imageContainerRef = useRef(null);
    const [width] = useWindowSize();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);
    const isMobile = mounted && width < 768;

    useGSAP(() => {
        if (isMobile) return;

        const aboutSection = aboutRef.current;
        const imageContainer = imageContainerRef.current;

        // Scale animation on about container
        gsap.fromTo(
            aboutSection,
            {
                scale: 0.95,
            },
            {
                scale: 1,
                ease: 'none',
                scrollTrigger: {
                    trigger: aboutSection,
                    start: 'top bottom',
                    end: 'top top',
                    scrub: 1,
                    markers: false,
                },
            }
        );

        // Border-radius animation on image container
        gsap.fromTo(
            imageContainer,
            {
                borderTopRightRadius: '1000px',
                borderBottomRightRadius: '1000px',
            },
            {
                borderTopRightRadius: '50px',
                borderBottomRightRadius: '50px',
                ease: 'none',
                scrollTrigger: {
                    trigger: aboutSection,
                    start: 'top bottom',
                    end: 'top top',
                    scrub: 1,
                    markers: false,
                },
            }
        );
    }, [isMobile]);

    return (
        <div
            id="aboutComponent"
            ref={aboutRef}
            className="relative w-full h-auto md:h-screen min-h-[600px] overflow-hidden flex items-center justify-center md:mt-20 md:mt-36"
        >
            <div className='flex flex-col md:flex-row items-center justify-between w-full px-6 md:px-0 py-12 md:py-0'>
                <div className='w-full md:w-[45%] md:pl-28 mb-8 md:mb-0'>
                    <h2 className="text-left text-black max-w-full md:max-w-[500px] mb-6 md:mb-8">
                        The Craft of Enduring Living
                    </h2>

                    <p className="text-left text-black max-w-full md:max-w-[800px] mb-6 md:mb-8">
                        At Swiss Village Villas, excellence is defined by restraint, precision, and purpose. Rooted in Swiss design philosophy, every estate reflects deliberate craftsmanship, honest materials, and enduring quality.
                        Inspired by traditional chalet architecture and refined through modern engineering, our villas blend timeless elegance with sustainable innovation creating homes that exist in harmony with nature and are designed to last for generations.
                    </p>
                    <Button text="Explore Us" href="https://example.com" variant='outline' />
                </div>
                <div
                    ref={imageContainerRef}
                    className='w-full md:w-[45%] h-[400px] md:h-screen relative overflow-hidden'
                    style={{
                        borderTopRightRadius: isMobile ? '0px' : '1000px',
                        borderBottomRightRadius: isMobile ? '0px' : '1000px',
                    }}
                >
                    <Image src={img1} alt="swiss villa architecture precision" fill className="object-cover" />
                </div>
            </div>
        </div>
    );
};

export default About;
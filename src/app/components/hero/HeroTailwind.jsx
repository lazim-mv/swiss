"use client";
import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Button from '../Button';

const HeroTailwind = () => {
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const descriptionRef = useRef(null);
    const overlayRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        // Animate overlay fade in
        tl.fromTo(
            overlayRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 1 }
        );

        // Animate title with subtle slide up and fade
        tl.fromTo(
            titleRef.current,
            {
                opacity: 0,
                y: 40,
                scale: 0.95
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1.2,
                ease: "power3.out"
            },
            "-=0.5"
        );

        // Animate subtitle with delay
        tl.fromTo(
            subtitleRef.current,
            {
                opacity: 0,
                y: 30
            },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.out"
            },
            "-=0.8"
        );

        // Animate description
        tl.fromTo(
            descriptionRef.current,
            {
                opacity: 0,
                y: 20
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.9,
                ease: "power2.out"
            },
            "-=0.7"
        );

    }, []);

    return (
        <div className="relative w-full h-screen min-h-[600px] overflow-hidden flex items-center justify-center bg-white">
            {/* Video Background */}
            <video
                className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 z-1 object-cover md:object-contain"
                autoPlay
                loop
                muted
                playsInline
            >
                <source src="/hero.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Overlay */}
            <div
                ref={overlayRef}
                className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-black/40 via-black/50 to-black/60 z-2"
            ></div>

            {/* Content */}
            <div className="relative z-3 text-center text-white px-5">
                <h1
                    ref={titleRef}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 leading-tight tracking-tight max-w-[1024px]"
                >
                    Welcome to Swiss <br /> Village Zakho
                </h1>

                <p
                    ref={subtitleRef}
                    className="text-xl sm:text-2xl md:text-3xl font-medium mb-8 text-gray-100 italic"
                >
                    Where luxury living meets serenity.
                </p>

                <p
                    ref={descriptionRef}
                    className="text-base sm:text-lg md:text-xl leading-relaxed mb-6 text-gray-200 max-w-[800px] mx-auto"
                >
                    A private residential community designed to bring comfort, elegance, and family-focused living to the city of Zakho. Surrounded by open landscapes and premium amenities, Swiss Village offers modern villas with exceptional architectural standards and a peaceful lifestyle just 8 minutes from the city center.
                </p>

                <Button text="Explore More" variant="outline-white" />
            </div>
        </div>
    );
};

export default HeroTailwind;

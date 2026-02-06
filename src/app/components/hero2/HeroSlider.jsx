"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import React from 'react'
import styles from './Hero.module.css'
import Button from "../Button";

const HeroSlider = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const images = Array.from({ length: 5 }, (_, i) => `/hero/${i + 1}.jpg`);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [images.length]);
    return (
        <div className="relative h-[92vh] w-full overflow-hidden mt-20">
            {/* Background Carousel */}
            {images.map((src, index) => (
                <div
                    key={src}
                    className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${index === currentImage ? "opacity-100" : "opacity-0"
                        }`}
                >
                    <Image
                        src={src}
                        alt={`Luxury Villa ${index + 1}`}
                        fill
                        className="object-cover object-center"
                        priority={index === 0}
                        quality={100}
                    />
                    <div
                        // ref={overlayRef}
                        className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-black/20 via-black/30 to-black/40 z-2"
                    ></div>
                </div>
            ))}

            {/* Content Overlay */}
            <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
                <div className="animate-fade-in flex flex-col items-center justify-center">
                    <div className="mb-6 inline-block border border-white/30 px-6 py-2">
                        <p className="text-xs font-normal uppercase tracking-[0.3em] text-white/90">
                            Est. 2025
                        </p>
                    </div>

                    <div className="relative z-3 text-center text-white px-5">
                        <h1
                            // ref={titleRef}
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 leading-tight tracking-tight max-w-[1024px]"
                        >
                            Welcome to Swiss <br /> Village Zakho
                        </h1>

                        <p
                            // ref={subtitleRef}
                            className="text-xl sm:text-2xl md:text-3xl font-medium mb-8 text-gray-100 italic"
                        >
                            Where luxury living meets serenity.
                        </p>

                        <p
                            // ref={descriptionRef}
                            className="text-base sm:text-lg md:text-xl leading-relaxed mb-6 text-gray-200 max-w-[800px] mx-auto"
                        >
                            A private residential community designed to bring comfort, elegance, and family-focused living to the city of Zakho. Surrounded by open landscapes and premium amenities, Swiss Village offers modern villas with exceptional architectural standards and a peaceful lifestyle just 8 minutes from the city center.
                        </p>

                        <Button text="Download Brochure" variant="outline-white" />
                    </div>


                </div>

                {/* Carousel Indicators */}
                <div className="absolute bottom-12 left-1/2 flex max-w-md -translate-x-1/2 flex-wrap justify-center gap-2">
                    {images.map((src, index) => (
                        <button
                            key={src}
                            type="button"
                            onClick={() => setCurrentImage(index)}
                            className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${index === currentImage
                                ? "scale-150 bg-white"
                                : "bg-white/40 hover:bg-white/60"
                                }`}
                            aria-label={`Go to image ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default HeroSlider
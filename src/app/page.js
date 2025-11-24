"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [currentImage, setCurrentImage] = useState(0);
  const images = Array.from({ length: 21 }, (_, i) => `/${i + 2}.jpg`);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Carousel */}
      {images.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
            index === currentImage ? "opacity-100" : "opacity-0"
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
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60" />
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

          <h1 className="mb-6 font-[family-name:var(--font-libre)] text-6xl font-normal tracking-[0.15em] md:text-8xl lg:text-9xl">
            SWISS VILLAGE VILLAS
          </h1>

          <div className="mb-8 flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-white/40" />
            <div className="h-1.5 w-1.5 rotate-45 bg-white/60" />
            <div className="h-px w-16 bg-white/40" />
          </div>

          <p className="mb-4 font-[family-name:var(--font-libre)] text-xl font-normal tracking-[0.2em] text-white/95 md:text-2xl lg:text-3xl">
            Exclusive Luxury Estates
          </p>

          <p className="mb-16 max-w-xl text-sm font-light leading-relaxed tracking-wide text-white/70 md:text-base">
            Blending traditional chalet aesthetics with modern sustainable
            technology, Swiss design emphasizes durability and harmonious
            integration with nature.
          </p>

          {/* <div className="mb-8 flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-white/40" />
            <div className="h-1.5 w-1.5 rotate-45 bg-white/60" />
            <div className="h-px w-16 bg-white/40" />
          </div> */}

          <h2 className="font-[family-name:var(--font-playfair)] text-7xl font-light italic tracking-wide text-white md:text-8xl lg:text-9xl">
            Coming Soon
          </h2>

          <p className="mt-6 text-xs uppercase tracking-[0.4em] text-white/60">
            Launching 2026
          </p>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-12 left-1/2 flex max-w-md -translate-x-1/2 flex-wrap justify-center gap-2">
          {images.map((src, index) => (
            <button
              key={src}
              type="button"
              onClick={() => setCurrentImage(index)}
              className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                index === currentImage
                  ? "scale-150 bg-white"
                  : "bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

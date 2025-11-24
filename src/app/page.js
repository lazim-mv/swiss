"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [currentImage, setCurrentImage] = useState(0);
  const images = ["/1.jpg", "/2.jpg"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Carousel */}
      {images.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImage ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={src}
            alt={`Luxury Villa ${index + 1}`}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      ))}

      {/* Content Overlay */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
        <h1 className="mb-4 text-5xl font-light tracking-wider md:text-7xl lg:text-8xl">
          SWISS VILLA
        </h1>
        <div className="mb-8 h-px w-24 bg-white/60" />
        <p className="mb-12 max-w-2xl text-lg font-light tracking-wide md:text-xl lg:text-2xl">
          Exclusive Luxury Real Estate
        </p>
        <p className="mb-16 text-sm font-light uppercase tracking-widest text-white/80 md:text-base">
          Coming Soon
        </p>

        {/* Carousel Indicators */}
        <div className="flex gap-3">
          {images.map((src, index) => (
            <button
              key={src}
              type="button"
              onClick={() => setCurrentImage(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentImage
                  ? "w-12 bg-white"
                  : "w-2 bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

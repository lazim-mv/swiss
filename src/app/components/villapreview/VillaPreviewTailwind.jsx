"use client";
import React, { useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { villaPreviewContent } from './villaPreviewContent';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const VillaPreviewTailwind = () => {
    const gridItemsRef = useRef([]);
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Ensure we're on the client side
    useEffect(() => {
        setMounted(true);
    }, []);

    useGSAP(() => {
        // Animate each grid item on scroll
        gridItemsRef.current.forEach((item, index) => {
            if (item) {
                gsap.fromTo(
                    item,
                    {
                        opacity: 0,
                        y: 50,
                        scale: 0.95,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: item,
                            start: 'top 85%',
                            end: 'top 50%',
                            toggleActions: 'play none none none',
                        },
                        delay: (index % 3) * 0.1,
                    }
                );
            }
        });
    }, []);

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isLightboxOpen) return;

            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                goToPrevious();
            } else if (e.key === 'ArrowRight') {
                goToNext();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isLightboxOpen, selectedImageIndex]);

    // Prevent body scroll when lightbox is open
    useEffect(() => {
        if (isLightboxOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isLightboxOpen]);

    const openLightbox = (index) => {
        setSelectedImageIndex(index);
        setIsLightboxOpen(true);
    };

    const closeLightbox = () => {
        setIsLightboxOpen(false);
        setTimeout(() => setSelectedImageIndex(null), 300);
    };

    const goToNext = () => {
        setSelectedImageIndex((prev) =>
            prev === villaPreviewContent.length - 1 ? 0 : prev + 1
        );
    };

    const goToPrevious = () => {
        setSelectedImageIndex((prev) =>
            prev === 0 ? villaPreviewContent.length - 1 : prev - 1
        );
    };

    // Lightbox component
    const lightboxContent = isLightboxOpen && selectedImageIndex !== null && (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: 'fadeIn 0.3s ease-out',
            }}
            onClick={closeLightbox}
        >
            {/* Close Button */}
            <button
                onClick={closeLightbox}
                className="fixed top-6 right-6 md:top-10 md:right-10 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
                style={{ zIndex: 10001 }}
                aria-label="Close lightbox"
            >
                <X className="w-6 h-6 md:w-7 md:h-7 text-white" />
            </button>

            {/* Previous Button */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    goToPrevious();
                }}
                className="fixed left-6 md:left-10 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
                style={{ zIndex: 10001 }}
                aria-label="Previous image"
            >
                <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </button>

            {/* Next Button */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    goToNext();
                }}
                className="fixed right-6 md:right-10 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
                style={{ zIndex: 10001 }}
                aria-label="Next image"
            >
                <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </button>

            {/* Image Container */}
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    position: 'relative',
                    width: '90vw',
                    height: '85vh',
                    maxHeight: '100vh',
                }}
            >
                <Image
                    src={villaPreviewContent[selectedImageIndex].img}
                    alt={villaPreviewContent[selectedImageIndex].title}
                    fill
                    style={{
                        objectFit: 'contain',
                        animation: 'zoomIn 0.3s ease-out',
                    }}
                    priority
                />
            </div>

            {/* Image Info */}
            {/* <div className="fixed bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 text-center" style={{ zIndex: 10001 }}>
                <h3 className="text-white text-lg md:text-2xl font-semibold mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>
                    {villaPreviewContent[selectedImageIndex].title}
                </h3>
                <p className="text-white/70 text-sm md:text-base">
                    {selectedImageIndex + 1} / {villaPreviewContent.length}
                </p>
            </div> */}
        </div>
    );

    return (
        <>
            <div className="mt-20 md:mt-36 px-6 md:px-16 lg:px-28" id='villas'>
                {/* Header */}
                <div className="hidden md:flex items-center justify-center gap-4 md:gap-8 mb-12 md:mb-16">
                    <hr className="bg-black h-[2px] w-full border-none" />
                    <h4 className="text-black whitespace-nowrap text-sm md:text-base">Villa Preview</h4>
                    <hr className="bg-black h-[2px] w-full border-none" />
                </div>

                <h2 className="md:hidden text-left text-black max-w-full md:max-w-[500px] mb-6 md:mb-8">
                    Villa Preview
                </h2>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-[400px]">
                    {villaPreviewContent.map((item, index) => (
                        <div
                            key={index}
                            ref={(el) => (gridItemsRef.current[index] = el)}
                            className={`relative overflow-hidden rounded-xl row-span-1 ${item.orientation === 'portrait'
                                    ? 'md:row-span-2'
                                    : 'md:row-span-1'
                                }`}
                        >
                            <div
                                className="relative w-full h-full overflow-hidden cursor-pointer group"
                                onClick={() => openLightbox(index)}
                            >
                                <Image
                                    src={item.img}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                />
                                {/* Overlay */}
                                {/* <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex items-end p-6 md:p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                    <div className="text-white transform translate-y-5 group-hover:translate-y-0 transition-transform duration-500">
                                        <h3 className="text-xl md:text-2xl font-semibold mb-2 text-white">
                                            {item.title}
                                        </h3>
                                        <p className="text-sm md:text-base text-white/90">
                                            {item.description}
                                        </p>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Fullscreen Lightbox - Rendered via Portal */}
            {mounted && lightboxContent && ReactDOM.createPortal(
                lightboxContent,
                document.body
            )}

            <style jsx global>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes zoomIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
            `}</style>
        </>
    );
};

export default VillaPreviewTailwind;

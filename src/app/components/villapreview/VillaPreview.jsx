"use client";
import React, { useRef, useState, useEffect } from 'react';
import styles from './VillaPreview.module.css';
import { villaPreviewContent } from './villaPreviewContent';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const VillaPreview = () => {
    const gridItemsRef = useRef([]);
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);

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
                        delay: (index % 3) * 0.1, // Stagger by row
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

    return (
        <>
            <div className={styles.container} id='villas'>
                <div className={`hidden md:flex ${styles.header}`}>
                    <hr className={styles.line} />
                    <h4 className={styles.title}>Villa Preview</h4>
                    <hr className={styles.line} />
                </div>

                <h2 className="md:hidden text-left text-black max-w-full md:max-w-[500px] mb-6 md:mb-8">
                    Villa Preview
                </h2>

                <div className={styles.grid}>
                    {villaPreviewContent.map((item, index) => (
                        <div
                            key={index}
                            ref={(el) => (gridItemsRef.current[index] = el)}
                            className={`${styles.gridItem} ${item.orientation === 'portrait' ? styles.portrait : styles.landscape
                                }`}
                        >
                            <div
                                className={styles.imageWrapper}
                                onClick={() => openLightbox(index)}
                            >
                                <Image
                                    src={item.img}
                                    alt={item.title}
                                    fill
                                    className={styles.image}
                                />
                                <div className={styles.overlay}>
                                    <div className={styles.textContent}>
                                        <h3>{item.title}</h3>
                                        <p>{item.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Fullscreen Lightbox */}
            {isLightboxOpen && selectedImageIndex !== null && (
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
                        style={{
                            position: 'fixed',
                            top: '1.5rem',
                            right: '1.5rem',
                            width: '3rem',
                            height: '3rem',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(10px)',
                            border: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.3s',
                            zIndex: 10001,
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
                        aria-label="Close lightbox"
                    >
                        <X className="w-6 h-6 text-white" />
                    </button>

                    {/* Previous Button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            goToPrevious();
                        }}
                        style={{
                            position: 'fixed',
                            left: '1.5rem',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: '3rem',
                            height: '3rem',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(10px)',
                            border: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.3s',
                            zIndex: 10001,
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
                        aria-label="Previous image"
                    >
                        <ChevronLeft className="w-6 h-6 text-white" />
                    </button>

                    {/* Next Button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            goToNext();
                        }}
                        style={{
                            position: 'fixed',
                            right: '1.5rem',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: '3rem',
                            height: '3rem',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(10px)',
                            border: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.3s',
                            zIndex: 10001,
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
                        aria-label="Next image"
                    >
                        <ChevronRight className="w-6 h-6 text-white" />
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
                    <div
                        style={{
                            position: 'fixed',
                            bottom: '2rem',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            textAlign: 'center',
                            zIndex: 10001,
                        }}
                    >
                        <h3
                            style={{
                                color: 'white',
                                fontSize: '1.5rem',
                                fontWeight: '600',
                                marginBottom: '0.5rem',
                                fontFamily: 'var(--font-playfair)',
                            }}
                        >
                            {villaPreviewContent[selectedImageIndex].title}
                        </h3>
                        <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '1rem' }}>
                            {selectedImageIndex + 1} / {villaPreviewContent.length}
                        </p>
                    </div>
                </div>
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

export default VillaPreview;

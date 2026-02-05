"use client";
import React, { useRef } from 'react';
import styles from './VillaPreview.module.css';
import { villaPreviewContent } from './villaPreviewContent';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const VillaPreview = () => {
    const gridItemsRef = useRef([]);

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

    return (
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
                        <div className={styles.imageWrapper}>
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
    );
};

export default VillaPreview;

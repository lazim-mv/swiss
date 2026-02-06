"use client";
import React, { useRef } from 'react';
import { MapPin, Clock, Hospital, Route } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Location = () => {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const contentRef = useRef(null);
    const mapRef = useRef(null);
    const featureRefs = useRef([]);

    useGSAP(() => {
        // Animate section title
        gsap.fromTo(
            titleRef.current,
            {
                opacity: 0,
                y: 30,
            },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                },
            }
        );

        // Animate content
        gsap.fromTo(
            contentRef.current,
            {
                opacity: 0,
                y: 40,
            },
            {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: contentRef.current,
                    start: 'top 75%',
                    toggleActions: 'play none none none',
                },
            }
        );

        // Animate map
        gsap.fromTo(
            mapRef.current,
            {
                opacity: 0,
                scale: 0.95,
            },
            {
                opacity: 1,
                scale: 1,
                duration: 1.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: mapRef.current,
                    start: 'top 75%',
                    toggleActions: 'play none none none',
                },
            }
        );

        // Animate feature items
        featureRefs.current.forEach((feature, index) => {
            if (feature) {
                gsap.fromTo(
                    feature,
                    {
                        opacity: 0,
                        x: -20,
                    },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.8,
                        delay: index * 0.15,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: feature,
                            start: 'top 85%',
                            toggleActions: 'play none none none',
                        },
                    }
                );
            }
        });
    }, []);

    const locationFeatures = [
        {
            icon: <Clock className="w-5 h-5 md:w-6 md:h-6" />,
            text: "8 minutes to Downtown Zakho",
        },
        {
            icon: <Hospital className="w-5 h-5 md:w-6 md:h-6" />,
            text: "Close to hospitals, main roads, and essential services",
        },
        {
            icon: <Route className="w-5 h-5 md:w-6 md:h-6" />,
            text: "Accessible from major city entrances",
        },
    ];

    return (
        <div
            ref={sectionRef}
            className="px-6 md:px-16 lg:px-28"
            id="location"
        >
            {/* Section Title */}
            <div ref={titleRef} className="mb-8 md:mb-12">
                <h2 className="text-left text-black max-w-full mb-3">
                    Location
                </h2>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
                {/* Left Content */}
                <div ref={contentRef} className="flex flex-col justify-center">


                    <p className="text-black mb-8 md:mb-10 leading-relaxed">
                        Swiss Village sits in Zakho Bedar, adjacent to Bedar Hospital, offering quick access while maintaining a peaceful distance from the busy city center.
                    </p>

                    {/* Location Features */}
                    <div className="space-y-4 md:space-y-5 mb-8">
                        {locationFeatures.map((feature, index) => (
                            <div
                                key={index}
                                ref={(el) => (featureRefs.current[index] = el)}
                                className="flex items-center gap-4 group"
                            >
                                <div className="shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-[#1f322f] flex items-center justify-center group-hover:bg-[#1f322f] text-[#1f322f] group-hover:text-white transition-all duration-300">
                                    {feature.icon}
                                </div>
                                <p className="text-black">
                                    {feature.text}
                                </p>
                            </div>
                        ))}
                    </div>

                    <p className="text-black italic text-sm md:text-base">
                        A perfect balance between privacy and convenience.
                    </p>
                </div>

                {/* Right Map */}
                <div
                    ref={mapRef}
                    className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden border-2 border-gray-200 shadow-lg hover:shadow-2xl transition-shadow duration-500"
                >
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3168.123456789!2d42.6875!3d37.1458!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDA4JzQ0LjkiTiA0MsKwNDEnMTUuMCJF!5e0!3m2!1sen!2s!4v1234567890"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="grayscale-0 hover:grayscale-50 transition-all duration-700"
                    />

                    {/* Map Overlay Badge */}
                    <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm px-4 py-3 rounded-lg shadow-lg border border-gray-200">
                        <div className="flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-black" />
                            <div>
                                <p className="text-xs text-gray-600 font-semibold">ZAKHO - BEDAR</p>
                                <p className="text-sm text-black font-bold">Swiss Village</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Location;

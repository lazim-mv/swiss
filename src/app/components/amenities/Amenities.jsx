"use client";
import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { amenitiesContent } from './amenitiesContent';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

const Amenities = () => {
    const swiperRef = useRef(null);
    const titleRef = useRef(null);
    const sliderRef = useRef(null);

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

        // Animate slider
        gsap.fromTo(
            sliderRef.current,
            {
                opacity: 0,
                y: 50,
            },
            {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sliderRef.current,
                    start: 'top 75%',
                    toggleActions: 'play none none none',
                },
            }
        );
    }, []);

    return (
        <div className=" md:mt-36 px-6 md:px-16 lg:px-28" id='amenities'>
            {/* Header */}
            <div ref={titleRef} className="mb-6 md:mb-16">
                {/* <p className="text-xs md:text-sm text-gray-600 mb-3 uppercase tracking-wider">COMMUNITIES</p> */}
                <h2 className="text-left text-black max-w-full">Community Amenities</h2>
            </div>

            {/* <div ref={titleRef} className='flex items-center justify-center gap-4 md:gap-8 mb-12 md:mb-16'>
                <hr className='bg-black h-[2px] w-full' />
                <h4 className='text-black w-max whitespace-nowrap text-sm md:text-base'>Community Amenities</h4>
                <hr className='bg-black h-[2px] w-full' />
            </div> */}

            {/* Slider Container */}
            <div ref={sliderRef} className="relative cursor-pointer">
                <Swiper
                    ref={swiperRef}
                    modules={[Navigation, Autoplay]}
                    spaceBetween={24}
                    slidesPerView={1}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 24,
                        },
                        1280: {
                            slidesPerView: 4,
                            spaceBetween: 24,
                        },
                    }}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    className="amenities-swiper pb-4"
                >
                    {amenitiesContent.map((amenity) => (
                        <SwiperSlide key={amenity.id}>
                            <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-[-2px]">
                                <div className="text-5xl md:text-6xl mb-4">{amenity.icon}</div>
                                <h3 className="text-black text-lg md:text-xl mb-3 min-h-14">
                                    {amenity.title}
                                </h3>
                                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                                    {amenity.description}
                                </p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* <div className="custom-pagination flex justify-center gap-2 mt-8"></div> */}

                {/* Custom Navigation Buttons */}
                {/* <button
                    onClick={() => swiperRef.current?.swiper.slidePrev()}
                    className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-white border-2 border-black rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300 shadow-lg"
                    aria-label="Previous slide"
                >
                    <ChevronLeft size={20} />
                </button>

                <button
                    onClick={() => swiperRef.current?.swiper.slideNext()}
                    className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-white border-2 border-black rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300 shadow-lg"
                    aria-label="Next slide"
                >
                    <ChevronRight size={20} />
                </button> */}
            </div>

            <style jsx global>{`
                .amenities-swiper {
                 
                }

                @media (max-width: 768px) {
                    .amenities-swiper {
                      
                    }
                }
            `}</style>
        </div>
    );
};

export default Amenities;

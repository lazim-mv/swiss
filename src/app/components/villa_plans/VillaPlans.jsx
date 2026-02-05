"use client";
import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import { villaPlansContent } from './villaPlanContent';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useWindowSize } from '@react-hook/window-size';

gsap.registerPlugin(ScrollTrigger);

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const VillaPlans = () => {
    const swiperRef = useRef(null);
    const titleRef = useRef(null);
    const sliderRef = useRef(null);
    const [width] = useWindowSize();
    const [mounted, setMounted] = useState(false);
    const isMobile = mounted && width < 768;

    // Prevent hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    useGSAP(() => {
        // Animate title
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

        // Animate slider container
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
        <div className="mt-20 md:mt-36 px-6 md:px-16 lg:px-28">
            {/* Header */}
            <div ref={titleRef} className='hidden md:flex items-center justify-center gap-4 md:gap-8 mb-12 md:mb-16'>
                <hr className='bg-black h-[2px] w-full' />
                <h4 className='text-black w-max whitespace-nowrap text-sm md:text-base'>Villa Plans</h4>
                <hr className='bg-black h-[2px] w-full' />
            </div>

            <h2 className="md:hidden text-left text-black max-w-full md:max-w-[500px] mb-6 md:mb-8">
                Villa Plans
            </h2>



            {/* Slider Container */}
            <div ref={sliderRef} className="relative cursor-pointer">
                <Swiper
                    ref={swiperRef}
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={20}
                    slidesPerView={1}
                    pagination={{
                        clickable: true,
                        el: '.custom-pagination',
                    }}
                    // autoplay={{
                    //     delay: 10000,
                    //     disableOnInteraction: false,
                    // }}
                    loop={true}
                    className="villa-plans-swiper"
                >
                    <div className='w=full'>
                        {villaPlansContent.map((plan) => (
                            <SwiperSlide key={plan.id}>
                                <div className='flex flex-col md:flex-row w-full justify-between md:px-36'>
                                    <div className="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-16 pb-0 md:pb-16">
                                        {/* Left Content */}
                                        <div className="w-full lg:w-[80%] flex flex-col justify-center">
                                            <h3 className="text-black mb-8 md:mb-12">{plan.title}</h3>

                                            <div className="space-y-6">
                                                <div>
                                                    <h5 className="text-xs md:text-sm text-black mb-2">UNIT</h5>
                                                    <p className="text-sm md:text-base text-black">{plan.unit}</p>
                                                </div>

                                                <div>
                                                    <h5 className="text-xs md:text-sm text-black mb-2">SUITE</h5>
                                                    <p className="text-sm md:text-base text-black">{plan.suite}</p>
                                                </div>

                                                <div>
                                                    <h5 className="text-xs md:text-sm text-black mb-2">BALCONY</h5>
                                                    <p className="text-sm md:text-base text-black">{plan.balcony}</p>
                                                </div>

                                                <div>
                                                    <h5 className="text-xs md:text-sm text-black mb-2">TOTAL</h5>
                                                    <p className="text-sm md:text-base text-black font-semibold">{plan.total}</p>
                                                </div>
                                            </div>

                                            {/* <button className="mt-8 md:mt-12 px-8 py-3 border-2 border-black text-black rounded-full hover:bg-black hover:text-white transition-all duration-300 text-sm md:text-base">
                                        DOWNLOAD FLOOR PLAN
                                    </button> */}
                                        </div>


                                    </div>
                                    {/* Right Image */}
                                    {/* <div className="w-full md:max-w-[650px] md:w-auto relative h-auto md:h-[400px] lg:h-[650px] -order-1 md:order-1 mb-8 md:mb-0"></div> */}
                                    <div className="w-full md:max-w-[700px] md:w-auto relative h-auto  -order-1 md:order-1 mb-8 md:mb-0">
                                        <Image
                                            src={isMobile ? plan.mobileImage : plan.image}
                                            alt={plan.title}
                                            height={650}
                                            width={0}
                                            style={{ width: 'auto', height: '100%' }}
                                            className="object-contain"
                                        />
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </div>
                </Swiper>

                {/* Custom Navigation Buttons */}
                <button
                    onClick={() => swiperRef.current?.swiper.slidePrev()}
                    className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 border border-[#dcbb9c] md:border-0 md:bg-[#dcbb9c] rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300 shadow-lg"
                    aria-label="Previous slide"
                >
                    <ChevronLeft size={24} />
                </button>

                <button
                    onClick={() => swiperRef.current?.swiper.slideNext()}
                    className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 border border-[#dcbb9c] md:border-0 md:bg-[#dcbb9c] rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300 shadow-lg"
                    aria-label="Next slide"
                >
                    <ChevronRight size={24} />
                </button>

                {/* Custom Pagination */}
                <div className="custom-pagination flex justify-center gap-2 mt-8"></div>
            </div>

            <style jsx global>{`
                .villa-plans-swiper {
                   
                    width: 100%;
                }

                @media (max-width: 768px) {
                    .villa-plans-swiper {
                        // padding: 0 2rem;
                    }
                }

                .custom-pagination .swiper-pagination-bullet {
                    width: 12px;
                    height: 12px;
                    background: #d1d5db;
                    opacity: 1;
                    transition: all 0.3s ease;
                }

                .custom-pagination .swiper-pagination-bullet-active {
                    background: #000;
                    width: 32px;
                    border-radius: 6px;
                }
            `}</style>
        </div>
    );
};

export default VillaPlans;
"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Phone, Mail, MapPin, MessageSquare } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [hoveredPhone, setHoveredPhone] = useState(null);
    const [mounted, setMounted] = useState(false);

    const titleRef = useRef(null);
    const formRef = useRef(null);
    const contactInfoRef = useRef(null);
    const phoneContainerRefs = useRef([]);

    // Set mounted state
    useEffect(() => {
        setMounted(true);
    }, []);

    // Close phone actions when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (hoveredPhone !== null) {
                const isClickInside = phoneContainerRefs.current.some(
                    ref => ref && ref.contains(event.target)
                );
                if (!isClickInside) {
                    setHoveredPhone(null);
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [hoveredPhone]);

    useGSAP(() => {
        if (!mounted) return;

        // Animate title
        gsap.fromTo(
            titleRef.current,
            { opacity: 0, y: 30 },
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

        // Animate form
        gsap.fromTo(
            formRef.current,
            { opacity: 0, x: -50 },
            {
                opacity: 1,
                x: 0,
                duration: 1.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: formRef.current,
                    start: 'top 75%',
                    toggleActions: 'play none none none',
                },
            }
        );

        // Animate contact info
        gsap.fromTo(
            contactInfoRef.current,
            { opacity: 0, x: 50 },
            {
                opacity: 1,
                x: 0,
                duration: 1.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: contactInfoRef.current,
                    start: 'top 75%',
                    toggleActions: 'play none none none',
                },
            }
        );
    }, [mounted]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Add your form submission logic here
    };

    const phoneNumbers = [
        { number: '0751 444 7722', tel: '+9647514447722' },
        { number: '0751 444 7733', tel: '+9647514447733' }
    ];

    const location = {
        address: 'Zakho – Bedar, Near Bedar Hospital',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Zakho+Bedar+Near+Bedar+Hospital'
    };

    return (
        <div id="contact" className="mt-20 md:mt-36 px-6 md:px-16 lg:px-28 pb-20">
            {/* Header */}
            <div ref={titleRef} className='flex items-center justify-center gap-4 md:gap-8 mb-12 md:mb-16'>
                <hr className='bg-black h-[2px] w-full' />
                <h4 className='text-black w-max whitespace-nowrap text-sm md:text-base'>Contact Us</h4>
                <hr className='bg-black h-[2px] w-full' />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                {/* Contact Form */}
                <div ref={formRef}>
                    <h2 className="text-black mb-6">Get In Touch</h2>
                    <p className="text-gray-600 mb-8">Fill out the form and our team will get back to you within 24 hours.</p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2c4542] focus:border-transparent outline-none transition-all placeholder:text-gray-300"
                                placeholder="John Doe"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2c4542] focus:border-transparent outline-none transition-all placeholder:text-gray-300"
                                placeholder="john@example.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2c4542] focus:border-transparent outline-none transition-all placeholder:text-gray-300"
                                placeholder="+964 xxx xxx xxxx"
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={5}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2c4542] focus:border-transparent outline-none transition-all resize-none placeholder:text-gray-300"
                                placeholder="Tell us about your requirements..."
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#2c4542] text-white py-4 rounded-lg font-medium hover:bg-[#1f322f] transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            Send Message
                        </button>
                    </form>
                </div>

                {/* Contact Information */}
                <div ref={contactInfoRef} className="space-y-8">
                    <div>
                        <h2 className="text-black mb-6">Contact Information</h2>
                        <p className="text-gray-600 mb-8">Reach out to us directly through any of the following channels.</p>
                    </div>

                    {/* Phone Numbers */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-black mb-4">Phone Numbers</h3>
                        {phoneNumbers.map((phone, index) => (
                            <div
                                key={index}
                                ref={(el) => (phoneContainerRefs.current[index] = el)}
                                className="relative"
                            >
                                <div
                                    onClick={() => setHoveredPhone(hoveredPhone === index ? null : index)}
                                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-[#2c4542] transition-all duration-300 cursor-pointer"
                                >
                                    <Phone className="text-[#2c4542]" size={24} />
                                    <span className="text-gray-800 font-medium">{phone.number}</span>
                                </div>

                                {/* Click Actions */}
                                {hoveredPhone === index && (
                                    <div className="absolute top-full left-0 right-0 mt-2 flex gap-3 z-10">
                                        <a
                                            href={`tel:${phone.tel}`}
                                            className="flex items-center justify-center gap-2 bg-[#2c4542] text-white px-6 py-3 rounded-lg hover:bg-[#1f322f] transition-all duration-300 shadow-lg"
                                        >
                                            <Phone size={18} />
                                            <span className="text-sm font-medium">Call</span>
                                        </a>
                                        <a
                                            href={`https://wa.me/${phone.tel}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center gap-2 bg-[#dcbb9c] text-[#1f322f] px-6 py-3 rounded-lg hover:bg-[#c9a889] transition-all duration-300 shadow-lg"
                                        >
                                            <MessageSquare size={18} />
                                            <span className="text-sm font-medium">WhatsApp</span>
                                        </a>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Location */}
                    <div>
                        <h3 className="text-lg font-semibold text-black mb-4">Location</h3>
                        <a
                            href={location.mapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-[#2c4542] hover:bg-white transition-all duration-300 cursor-pointer group"
                        >
                            <MapPin className="text-[#2c4542] mt-1 group-hover:scale-110 transition-transform" size={24} />
                            <div>
                                <p className="text-gray-800 font-medium group-hover:text-[#2c4542] transition-colors">
                                    {location.address}
                                </p>
                                <p className="text-sm text-gray-500 mt-1 group-hover:text-[#2c4542] transition-colors">
                                    Click to view on Google Maps
                                </p>
                            </div>
                        </a>
                    </div>

                    {/* Email */}
                    <div>
                        <h3 className="text-lg font-semibold text-black mb-4">Email</h3>
                        <a
                            href="mailto:info@swissvillage.com"
                            className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-[#2c4542] hover:bg-white transition-all duration-300 cursor-pointer group"
                        >
                            <Mail className="text-[#2c4542] group-hover:scale-110 transition-transform" size={24} />
                            <span className="text-gray-800 font-medium group-hover:text-[#2c4542] transition-colors">
                                info@swissvillage.com
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactForm;

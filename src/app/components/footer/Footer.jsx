"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../../public/logos/clogo.png';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, MessageCircle } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { name: 'Home', href: '#hero' },
        { name: 'About', href: '#aboutComponent' },
        { name: 'Villas', href: '#villas' },
        { name: 'Amenities', href: '#amenities' },
        { name: 'Contact', href: '#contact' },
    ];

    const contactInfo = [
        { icon: Phone, text: '0751 444 7722', href: 'tel:+9647514447722' },
        { icon: Phone, text: '0751 444 7733', href: 'tel:+9647514447733' },
        { icon: Mail, text: 'info@swissvillage.com', href: 'mailto:info@swissvillage.com' },
        { icon: MapPin, text: 'Zakho – Bedar, Near Bedar Hospital', href: 'https://www.google.com/maps/search/?api=1&query=Zakho+Bedar+Near+Bedar+Hospital' },
    ];

    const socialLinks = [
        { icon: Facebook, href: '#', label: 'Facebook', text: 'Facebook' },
        { icon: Instagram, href: '#', label: 'Instagram', text: 'Instagram' },
        { icon: Twitter, href: '#', label: 'Twitter', text: 'Twitter' },
        { icon: MessageCircle, href: 'https://wa.me/9647514447722', label: 'WhatsApp', text: 'WhatsApp' },
    ];

    return (
        <footer className="bg-[#1f322f] text-white mt-20 footer">
            <div className="max-w-[1920px] mx-auto px-6 md:px-16 lg:px-28 py-12 md:py-16">
                <div className="flex flex-col md:flex-row justify-between items-start gap-12 lg:gap-16">
                    {/* Logo & Description */}
                    <div className='max-w-[400px]'>
                        <Image
                            src={logo}
                            alt="Swiss Village Logo"
                            width={100}
                            height={90}
                            className="mb-6 w-auto h-32"
                        />
                        <p className="text-gray-300 text-sm leading-relaxed mb-6">
                            Experience luxury living in the heart of Zakho. Swiss Village offers premium villas with world class amenities and modern design.
                        </p>
                    </div>

                    {/* Quick Links, Contact Us, and Social Media */}
                    <div className="flex flex-col md:flex-row items-start gap-12 lg:gap-16 w-auto">
                        <div>
                            <h3 className="text-lg font-semibold mb-6 text-white">Quick Links</h3>
                            <ul className="space-y-3">
                                {quickLinks.map((link, index) => (
                                    <li key={index}>
                                        <a
                                            href={link.href}
                                            className="text-gray-300 hover:text-[#dcbb9c] transition-colors duration-300 text-sm inline-block w-max"
                                        >
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact Information */}
                        <div>
                            <h3 className="text-lg font-semibold mb-6 text-white">Contact Us</h3>
                            <ul className="space-y-3">
                                <li>
                                    <a
                                        href="tel:+9647514447722"
                                        className="text-gray-300 hover:text-[#dcbb9c] transition-colors duration-300 text-sm inline-block"
                                    >
                                        0751 444 7722
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="tel:+9647514447733"
                                        className="text-gray-300 hover:text-[#dcbb9c] transition-colors duration-300 text-sm inline-block"
                                    >
                                        0751 444 7733
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="mailto:info@swissvillage.com"
                                        className="text-gray-300 hover:text-[#dcbb9c] transition-colors duration-300 text-sm inline-block"
                                    >
                                        info@swissvillage.com
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Social Media */}
                        <div>
                            <h3 className="text-lg font-semibold mb-6 text-white">Follow Us</h3>
                            <ul className="space-y-3">
                                {socialLinks.map((social, index) => (
                                    <li key={index}>
                                        <a
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-300 hover:text-[#dcbb9c] transition-colors duration-300 text-sm inline-flex items-center gap-2"
                                        >
                                            <social.icon size={16} />
                                            {social.text}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    {/* Location Map */}
                    {/* <div>
                        
                        <div className="rounded-lg overflow-hidden border border-white/10">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.835434509374!2d42.6857!3d37.1449!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDA4JzQxLjYiTiA0MsKwNDEnMDguNSJF!5e0!3m2!1sen!2s!4v1234567890"
                                width="100%"
                                height="280"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Swiss Village Location"
                                className="grayscale hover:grayscale-0 transition-all duration-300"
                            ></iframe>
                            <a
                                href="https://www.google.com/maps/search/?api=1&query=Zakho+Bedar+Near+Bedar+Hospital"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 p-3 bg-white/5 hover:bg-white/10 transition-colors duration-300 group"
                            >
                                <MapPin size={14} className="shrink-0 text-[#dcbb9c]" />
                                <span className="text-xs text-gray-300 group-hover:text-[#dcbb9c] transition-colors">
                                    Zakho – Bedar, Near Bedar Hospital
                                </span>
                            </a>
                        </div>
                    </div> */}
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-white/10">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-400 text-sm text-center md:text-left">
                            © {currentYear} Swiss Village Zakho. All rights reserved.
                        </p>
                        <div className="flex gap-6 text-sm">
                            <a href="#" className="text-gray-400 hover:text-[#dcbb9c] transition-colors duration-300">
                                Privacy Policy
                            </a>
                            <a href="#" className="text-gray-400 hover:text-[#dcbb9c] transition-colors duration-300">
                                Terms of Service
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

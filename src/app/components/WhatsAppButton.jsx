"use client";
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Image from 'next/image';

const WhatsAppButton = () => {
    const [mounted, setMounted] = useState(false);

    // WhatsApp number from footer (using the first number)
    const whatsappNumber = '9647514447722'; // +964 751 444 7722

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleClick = () => {
        // Open WhatsApp with pre-filled message
        const message = encodeURIComponent('Hello! I am interested in Swiss Village Zakho.');
        window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
    };



    const buttonContent = (
        <button
            onClick={handleClick}
            className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-999 w-14 h-14 md:w-12 md:h-12 bg-[#25D366] hover:bg-[#20BA5A] rounded-full shadow-lg hover:shadow-2xl flex items-center justify-center transition-all duration-800 group animate-bounce hover:animate-none cursor-pointer"
            aria-label="Contact us on WhatsApp"
        >
            <Image
                src="/whatsapp.svg"
                alt="WhatsApp"
                width={32}
                height={32}
                className="group-hover:scale-110 transition-transform duration-300"
            />

            {/* Pulse effect */}
            <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-75 animate-ping"></span>
        </button>
    );

    // Render via Portal to document.body to escape ScrollSmoother wrapper
    if (!mounted) return null;

    return ReactDOM.createPortal(buttonContent, document.body);
};

export default WhatsAppButton;

"use client";
import React from 'react';
import Link from 'next/link';

const Button = ({
    text = "Click Me",
    route = null,
    href = null,
    onClick = null,
    variant = "primary", // primary, secondary, outline
    size = "medium", // small, medium, large
    className = "",
    target = "_blank",
}) => {
    // Handle click
    const handleClick = (e) => {
        if (onClick) {
            onClick(e);
        }
    };

    // Size variants
    const sizeStyles = {
        small: "px-6 py-2 text-sm",
        medium: "px-10 py-3 text-base",
        large: "px-10 py-4 text-lg",
    };

    // Variant configurations
    const variantConfig = {
        primary: {
            base: "bg-[#2c4542] text-white border-2 border-[#2c4542]",
            hoverBg: "bg-[#2c4542]",
            hoverText: "text-white",
        },
        secondary: {
            base: "bg-white text-black border-2 border-[#2c4542]",
            hoverBg: "bg-[#2c4542]",
            hoverText: "text-white",
        },
        outline: {
            base: "bg-transparent text-[#2c4542] border-2 border-[#2c4542]",
            hoverBg: "bg-[#2c4542]",
            hoverText: "text-white",
        },
        "outline-white": {
            base: "bg-transparent text-white border-2 border-white hover:border-[#2c4542]",
            hoverBg: "bg-[#2c4542]",
            hoverText: "text-white",
        },
    };

    const config = variantConfig[variant];

    // Button content with hover effect
    const ButtonContent = () => (
        <>
            {/* Background fill effect - similar to CTAButton */}
            <div
                className={`
                    absolute inset-0 ${config.hoverBg}
                    scale-x-0 group-hover:scale-x-100 group-active:scale-x-100
                    transition-transform duration-500 ease-out origin-left
                    rounded-full
                `}
            />

            {/* Text content */}
            <span className={`relative z-10 ${config.hoverText === 'text-white' ? 'group-hover:text-white' : ''} transition-colors duration-300`}>
                {text}
            </span>

            {/* Subtle border glow on hover */}
            <div
                className={`
                    absolute inset-0 rounded-full opacity-0 
                    group-hover:opacity-20 transition-opacity duration-500
                    border-2 border-[#2c4542]
                    scale-110
                `}
            />
        </>
    );

    const baseClasses = `
        group relative inline-flex items-center justify-center
        rounded-full font-medium overflow-hidden
        transition-all duration-500 ease-out
        cursor-pointer select-none
        focus:outline-none focus:ring-2 focus:ring-[#2c4542] focus:ring-offset-2
        active:scale-95 hover:shadow-lg hover:shadow-black/10
        ${config.base}
        ${sizeStyles[size]}
        ${className}
    `;

    // If it's a Next.js route, use Link
    if (route) {
        return (
            <Link href={route} className={baseClasses} onClick={handleClick}>
                <ButtonContent />
            </Link>
        );
    }

    // If it's an external href, use anchor tag
    if (href) {
        return (
            <a
                href={href}
                target={target}
                rel="noopener noreferrer"
                className={baseClasses}
                onClick={handleClick}
            >
                <ButtonContent />
            </a>
        );
    }

    // Otherwise, render as button
    return (
        <button className={baseClasses} onClick={handleClick}>
            <ButtonContent />
        </button>
    );
};

export default Button;

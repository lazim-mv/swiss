"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import logo from "../../../../public/logos/clogo.png";
import { Menu, X, Phone } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "../../utils/gsapInit";
import { ScrollSmoother } from "gsap/ScrollSmoother";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const headerRef = useRef(null);
  const pathName = usePathname();

  const menus = [
    { name: "Home", href: `/home`, isSection: true, targetId: "home" },
    { name: "About", href: `/aboutComponent`, isSection: true, targetId: "aboutComponent" },
    { name: "Villas", href: `/villas`, isSection: true, targetId: "villas" },
    { name: "Foundation", href: `/foundation`, isSection: true, targetId: "foundation" },

  ];

  const normalize = (str) => str.replace(/\/+$/, "");

  // Handle navigation - scroll to section or navigate to page
  const handleNavigation = (menu, e) => {
    if (menu.isSection && menu.targetId) {
      e.preventDefault();

      const smoother = ScrollSmoother.get();
      const targetElement = document.getElementById(menu.targetId);

      if (smoother && targetElement) {
        smoother.scrollTo(targetElement, true, "top top");
      } else if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }

      setIsOpen(false);
    } else {
      setIsOpen(false);
    }
  };

  // Hide header on scroll down, show on scroll up
  useEffect(() => {
    const smoother = window.ScrollSmoother?.get();
    let lastScroll = smoother ? smoother.scrollTop() : window.scrollY;

    const getScroll = () => (smoother ? smoother.scrollTop() : window.scrollY);

    const handleScroll = () => {
      const currentScroll = getScroll();
      const isScrollingDown = currentScroll > lastScroll && currentScroll > 100;

      gsap.to(headerRef.current, {
        y: isScrollingDown ? "-100%" : "0%",
        duration: 0.4,
        ease: "power3.out",
      });

      lastScroll = currentScroll;
    };

    const scroller = smoother?.scrollTrigger?.scroller || window;
    scroller.addEventListener("scroll", handleScroll);

    return () => {
      scroller.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Mobile menu animation
  useEffect(() => {
    if (isOpen) {
      gsap.to(mobileMenuRef.current, {
        x: "0%",
        duration: 0.5,
        ease: "power3.inOut",
      });
    } else {
      gsap.to(mobileMenuRef.current, {
        x: "100%",
        duration: 0.5,
        ease: "power3.inOut",
      });
    }
  }, [isOpen]);

  return (
    <header
      ref={headerRef}
      className="header fixed top-0 left-0 w-full bg-[#1f322f] backdrop-blur-sm shadow-sm z-50 transition-all duration-300"
    >
      <div className="max-w-[1920px] mx-auto px-6 md:px-16 lg:px-28 py-4 md:py-5 flex items-center justify-between">
        {/* Logo */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            const smoother = ScrollSmoother.get();
            const targetElement = document.getElementById("home");

            if (smoother && targetElement) {
              smoother.scrollTo(targetElement, true, "top top");
            } else if (targetElement) {
              targetElement.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className="cursor-pointer z-50"
        >
          <Image
            priority
            quality={100}
            width={0}
            height={70}
            src={logo}
            alt="Swiss Village Logo"
            className="absolute top-1/2 translate-y-[-50%] w-20 md:w-24 h-auto"
          />
        </a>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-8 xl:gap-12 ml-28">
          {menus.map((menu, index) => (
            <a
              key={index}
              href={menu.href}
              onClick={(e) => handleNavigation(menu, e)}
              className={`text-sm xl:text-base font-medium transition-colors duration-300 cursor-pointer hover:text-[#dcbb9c] ${normalize(pathName) === normalize(menu.href)
                ? "text-[#dcbb9c] font-semibold"
                : "text-white"
                }`}
            >
              {menu.name}
            </a>
          ))}
        </nav>

        {/* CTA Button - Desktop */}
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            const smoother = ScrollSmoother.get();
            const targetElement = document.getElementById("contact");

            if (smoother && targetElement) {
              smoother.scrollTo(targetElement, true, "top top");
            } else if (targetElement) {
              targetElement.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className="hidden  lg:flex items-center gap-2 px-6 py-3 bg-[#dcbb9c] text-white rounded-full hover:bg-transparent group hover:border-[#dcbb9c] border border-[#dcbb9c] transition-all duration-300 text-sm font-medium"
        >
          <Phone
            size={18}
            className="text-[#1f322f] group-hover:text-[#dcbb9c]"
          />
          <span className="text-[#1f322f] group-hover:text-[#dcbb9c]">Contact Us</span>
        </a>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden z-50 p-2 text-white hover:text-[#dcbb9c] transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className="fixed top-0 right-0 h-screen w-full md:w-[400px] bg-white shadow-2xl lg:hidden translate-x-full"
        style={{ transform: "translateX(100%)" }}
      >
        <div className="flex flex-col h-full pt-24 px-8">
          <nav className="flex flex-col gap-6">
            {menus.map((menu, index) => (
              <a
                key={index}
                href={menu.href}
                onClick={(e) => handleNavigation(menu, e)}
                className={`text-xl font-medium transition-colors duration-300 cursor-pointer hover:text-[#2c4542] py-2 border-b border-gray-100 ${normalize(pathName) === normalize(menu.href)
                  ? "text-[#2c4542] font-semibold"
                  : "text-gray-700"
                  }`}
              >
                {menu.name}
              </a>
            ))}
          </nav>

          {/* Mobile CTA */}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              const smoother = ScrollSmoother.get();
              const targetElement = document.getElementById("contact");

              if (smoother && targetElement) {
                smoother.scrollTo(targetElement, true, "top top");
              } else if (targetElement) {
                targetElement.scrollIntoView({ behavior: "smooth" });
              }
              setIsOpen(false);
            }}
            className="mt-8 flex items-center justify-center gap-3 px-6 py-4 bg-[#2c4542] text-white rounded-full hover:bg-[#1f322f] transition-all duration-300 text-base font-medium"
          >
            <Phone size={20} />
            <span>Contact Us</span>
          </a>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
        />
      )}
    </header>
  );
};

export default Header;

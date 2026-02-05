"use client";
import { useEffect, useRef } from "react";
import { ScrollSmoother } from "../utils/gsapInit";
import { usePathname } from "next/navigation";
import { cleanupGsap } from "../utils/gsapInit";
import { useGSAP } from "@gsap/react";
import Header from "../components/header2/Header";

const ScrollSmootherProvider = ({ children }) => {
  const pathname = usePathname();
  const rootDiv = useRef(null);
  const smoother = useRef(null);

  useGSAP(() => {
    const isMobile = window.innerWidth <= 768;

    if (!isMobile) {
      smoother.current = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1,
        effects: true,
        normalizeScroll: true,
        smoothTouch: false,
        ignoreMobileResize: true,
      });

      return () => {
        if (smoother.current) {
          smoother.current.kill();
        }
        cleanupGsap();
      };
    }
  }, { dependencies: [pathname] });

  return (
    <>
      <Header />
      <div id="smooth-wrapper" ref={rootDiv}>
        <div id="smooth-content">
          {children}
        </div>
      </div>
    </>
  );
};

export default ScrollSmootherProvider;
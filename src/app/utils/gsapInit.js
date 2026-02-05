"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";


gsap.registerPlugin(ScrollTrigger, ScrollSmoother);


export const cleanupGsap = () => {
  if (typeof window !== 'undefined') {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());


    if (ScrollSmoother.get()) {
      ScrollSmoother.get().kill();
    }
    ScrollTrigger.clearMatchMedia();
    ScrollTrigger.refresh();
  }
};


export { ScrollTrigger, ScrollSmoother };


export default gsap;
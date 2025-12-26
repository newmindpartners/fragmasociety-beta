import {
  motion,
  useAnimationFrame,
  useMotionValue,
} from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import bankFrickLogo from "@/assets/partners/bank-frick-new.png";
import dfnsLogo from "@/assets/partners/dfns-new.png";
import houseOfWeb3Logo from "@/assets/partners/house-of-web3.svg";
import swissquoteLogo from "@/assets/partners/swissquote-new.png";
import woudLawLogo from "@/assets/partners/woud-law-new.png";

const partners = [
  {
    name: "Bank Frick",
    logo: bankFrickLogo,
    className: "",
    url: "https://www.bankfrick.li",
  },
  { name: "DFNS", logo: dfnsLogo, className: "", url: "https://www.dfns.co" },
  {
    name: "House of Web3",
    logo: houseOfWeb3Logo,
    className: "",
    url: "https://www.houseofweb3.lu/",
  },
  {
    name: "Swissquote",
    logo: swissquoteLogo,
    className: "scale-150",
    url: "https://www.swissquote.com",
  },
  {
    name: "Woud Law Firm",
    logo: woudLawLogo,
    className: "",
    url: "https://woudlaw.com/",
  },
];

const LOOP_DURATION_S = 20;

export const SocialProof = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [setWidth, setSetWidth] = useState(0);
  const setRef = useRef<HTMLDivElement | null>(null);

  // We keep x in the range [-setWidth, 0) by wrapping, preserving overshoot.
  // This avoids any visible jump/glitch at the loop boundary.
  const x = useMotionValue(0);

  useLayoutEffect(() => {
    if (!setRef.current) return;

    const update = () => {
      const next = Math.round(setRef.current?.getBoundingClientRect().width ?? 0);
      setSetWidth(next);

      // keep x in bounds after re-measure
      if (next > 0) {
        const cur = x.get();
        if (cur <= -next) x.set(cur + next);
        if (cur > 0) x.set(cur - next);
      }
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(setRef.current);
    return () => ro.disconnect();
  }, [x]);

  useAnimationFrame((_, delta) => {
    if (isPaused || !setWidth) return;
    const speedPxPerMs = setWidth / (LOOP_DURATION_S * 1000);

    let next = x.get() - speedPxPerMs * delta;
    if (next <= -setWidth) next += setWidth;
    x.set(next);
  });

  return (
    <section className="relative w-full py-6 sm:py-10 bg-white overflow-hidden">
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 mb-4 sm:mb-6">
        <p className="text-slate-400 text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.2em] sm:tracking-[0.25em] text-center">
          Trusted Partners
        </p>
      </div>

      {/* Scrolling logos container */}
      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Fade edges - narrower on mobile */}
        <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-20 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-20 bg-gradient-to-l from-white to-transparent z-10" />

        <TooltipProvider delayDuration={100}>
          <motion.div className="flex" style={{ x, willChange: "transform" }}>
            {/* Set A (measured) */}
            <div ref={setRef} className="flex">
              {partners.map((partner) => (
                <Tooltip key={`${partner.name}-a`}>
                  <TooltipTrigger asChild>
                    <a
                      href={partner.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex-shrink-0 h-8 sm:h-12 mx-4 sm:mx-8 opacity-40 grayscale hover:opacity-70 hover:grayscale-0 active:opacity-70 active:grayscale-0 transition-all duration-300 cursor-pointer ${partner.className}`}
                    >
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="h-full w-auto object-contain max-w-[100px] sm:max-w-[150px]"
                        loading="lazy"
                      />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent
                    side="bottom"
                    className="z-50 bg-slate-900 border-slate-700 px-3 py-1.5"
                  >
                    <p className="text-xs font-medium text-white">{partner.name}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>

            {/* Set B (duplicate for seamless wrap) */}
            <div className="flex" aria-hidden="true">
              {partners.map((partner) => (
                <Tooltip key={`${partner.name}-b`}>
                  <TooltipTrigger asChild>
                    <a
                      href={partner.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      tabIndex={-1}
                      className={`flex-shrink-0 h-8 sm:h-12 mx-4 sm:mx-8 opacity-40 grayscale hover:opacity-70 hover:grayscale-0 active:opacity-70 active:grayscale-0 transition-all duration-300 cursor-pointer ${partner.className}`}
                    >
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="h-full w-auto object-contain max-w-[100px] sm:max-w-[150px]"
                        loading="lazy"
                      />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent
                    side="bottom"
                    className="z-50 bg-slate-900 border-slate-700 px-3 py-1.5"
                  >
                    <p className="text-xs font-medium text-white">{partner.name}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </motion.div>
        </TooltipProvider>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
    </section>
  );
};

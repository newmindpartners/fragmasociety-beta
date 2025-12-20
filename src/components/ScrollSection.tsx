import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

interface ScrollSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export const ScrollSection = ({ children, className = "", delay = 0 }: ScrollSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.4, 1, 1, 0.4]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.98, 1, 1, 0.98]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale }}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.22, 1, 0.36, 1]
      }}
      className={`relative ${className}`}
    >
      {children}
    </motion.div>
  );
};

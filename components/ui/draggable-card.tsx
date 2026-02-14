"use client";
import { cn } from "@/lib/utils";
import React, { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useAnimationControls,
} from "motion/react";

interface DraggableCardProps {
  className?: string;
  children?: React.ReactNode;
  /**
   * The container reference to constrain dragging within.
   * Updated to allow null to fix TypeScript strict error.
   */
  containerRef?: React.RefObject<HTMLDivElement | null>;
  initialRotate?: string;
  zIndex?: number;
}

export const DraggableCardBody = ({
  className,
  children,
  containerRef,
  initialRotate = "0deg",
  zIndex = 0,
}: DraggableCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();
  const [isDragging, setIsDragging] = useState(false);

  // Initialize rotation
  const rotateZ = useMotionValue(initialRotate); 

  // Physics for Tilt Effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 100, mass: 0.5 };

  const rotateX = useSpring(
    useTransform(mouseY, [-300, 300], [15, -15]),
    springConfig
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-300, 300], [-15, 15]),
    springConfig
  );

  const glareOpacity = useSpring(
    useTransform(mouseX, [-300, 0, 300], [0.2, 0, 0.2]),
    springConfig
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) return;

    const rect = cardRef.current?.getBoundingClientRect();
    if (rect) {
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    }
  };

  const handleMouseLeave = () => {
    if (!isDragging) {
      mouseX.set(0);
      mouseY.set(0);
    }
  };

  return (
    <motion.div
      ref={cardRef}
      drag
      // Cast the ref to the type Framer Motion expects if TS complains, 
      // but usually RefObject<HTMLDivElement | null> is accepted.
      dragConstraints={containerRef as React.RefObject<Element>}
      dragMomentum={true} 
      dragElastic={0.1} 
      
      style={{
        rotateX,
        rotateY,
        rotateZ,
        zIndex: isDragging ? 9999 : zIndex, 
        cursor: isDragging ? "grabbing" : "grab",
      }}

      animate={controls}
      whileHover={{ scale: 1.02 }}
      whileDrag={{ scale: 1.1 }}
      
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => {
        setIsDragging(false);
        mouseX.set(0);
        mouseY.set(0);
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}

      className={cn(
        "absolute flex flex-col justify-center items-center",
        "min-h-96 w-80 overflow-hidden rounded-xl bg-neutral-100 p-6 shadow-2xl transform-3d dark:bg-neutral-900",
        "touch-none select-none", 
        className
      )}
    >
      <div className="relative z-10 h-full w-full pointer-events-none [&>*]:pointer-events-auto">
        {children}
      </div>

      <motion.div
        style={{ opacity: glareOpacity }}
        className="pointer-events-none absolute inset-0 bg-white mix-blend-overlay z-20"
      />
    </motion.div>
  );
};

export const DraggableCardContainer = ({
  className,
  children,
  containerRef
}: {
  className?: string;
  children?: React.ReactNode;
  // Updated here as well
  containerRef?: React.RefObject<HTMLDivElement | null>;
}) => {
  return (
    <div 
      ref={containerRef as React.RefObject<HTMLDivElement>}
      className={cn("[perspective:3000px] overflow-hidden", className)}
    >
      {children}
    </div>
  );
};
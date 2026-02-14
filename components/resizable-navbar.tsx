"use client";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";

import React, { useRef, useState } from "react";

// --- Interfaces ---

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
  }[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

// --- Primitives ---

export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [visible, setVisible] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return (
    <motion.div
      ref={ref}
      className={cn("sticky inset-x-0 top-5 z-[100] w-full", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean }>,
              { visible },
            )
          : child,
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <motion.div
      animate={{
        // Dark theme logic
        backgroundColor: visible ? "rgba(23, 23, 23, 0.9)" : "transparent",
        backdropFilter: visible ? "blur(10px)" : "none",
        border: visible ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid transparent",
        boxShadow: visible
          ? "0 0 24px rgba(0, 0, 0, 0.5), 0 1px 1px rgba(0, 0, 0, 0.05)"
          : "none",
        // Increased width from 50% to 65% to prevent squeezing content
        width: visible ? "65%" : "100%", 
        y: visible ? 20 : 0,
        paddingTop: visible ? "10px" : "20px",
        paddingBottom: visible ? "10px" : "20px",
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      style={{
        // Increased minWidth to accommodate larger logo + links
        minWidth: visible ? "850px" : "100%", 
      }}
      className={cn(
        "relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full px-4 lg:flex",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        // Removed 'absolute inset-0' to fix overlap. 
        // Added 'flex-1' and 'justify-center' to layout items naturally between Logo and Button.
        "hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium transition duration-200 lg:flex lg:space-x-4",
        className,
      )}
    >
      {items.map((item, idx) => (
        <a
          onMouseEnter={() => setHovered(idx)}
          onClick={onItemClick}
          className="relative px-4 py-2 text-neutral-200 hover:text-white transition-colors"
          key={`link-${idx}`}
          href={item.link}
        >
          {hovered === idx && (
            <motion.div
              layoutId="hovered"
              className="absolute inset-0 h-full w-full rounded-full bg-white/10"
            />
          )}
          <span className="relative z-20 text-base md:text-lg">{item.name}</span>
        </a>
      ))}
    </motion.div>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <motion.div
      animate={{
        backgroundColor: visible ? "rgba(23, 23, 23, 0.9)" : "transparent",
        backdropFilter: visible ? "blur(10px)" : "none",
        border: visible ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid transparent",
        width: visible ? "95%" : "100%",
        borderRadius: visible ? "20px" : "0px",
        y: visible ? 20 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      className={cn(
        // Added extra padding-right (pr-6) to ensure the menu icon isn't too close to the edge
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between px-4 lg:hidden",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        // Added py-4 to give vertical breathing room
        "flex w-full flex-row items-center justify-between py-4",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
  onClose,
}: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className={cn(
            "absolute inset-x-0 top-20 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-2xl bg-neutral-900 border border-white/10 px-4 py-8 shadow-2xl",
            className,
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    // Added mr-2 to pad the icon from the right edge for symmetry
    <div className="mr-2 cursor-pointer">
      {isOpen ? (
        <IconX className="text-white w-8 h-8" onClick={onClick} />
      ) : (
        <IconMenu2 className="text-white w-8 h-8" onClick={onClick} />
      )}
    </div>
  );
};

export const NavbarLogo = () => {
  return (
    <a
      href="#"
      className="relative z-20 mr-4 flex items-center space-x-3 px-2 py-1 text-white"
    >
      <div className="h-10 w-10 md:h-14 md:w-14 bg-white rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.3)]">
         <span className="text-black font-extrabold text-xl md:text-3xl">#</span>
      </div>
      <span className="font-bold text-xl md:text-2xl text-white tracking-wide">Dheraj jolla</span>
    </a>
  );
};

export const NavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  ...props
}: {
  href?: string;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
} & (
  | React.ComponentPropsWithoutRef<"a">
  | React.ComponentPropsWithoutRef<"button">
)) => {
  const baseStyles =
    "px-6 py-2 md:py-3 rounded-full text-sm md:text-base font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center";

  const variantStyles = {
    primary: "bg-white text-black shadow-lg",
    secondary: "bg-transparent text-white border border-white/20 hover:bg-white/10",
    dark: "bg-neutral-800 text-white border border-white/10 hover:bg-neutral-700",
    gradient: "bg-gradient-to-b from-blue-500 to-blue-700 text-white",
  };

  return (
    <Tag
      href={href || undefined}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Tag>
  );
};

// --- Main Export ---

export function PortfolioNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", link: "#" },
    { name: "About", link: "#about" },
    { name: "Projects", link: "#projects" },
    { name: "Skills", link: "#skills" },
    { name: "Experience", link: "#experience" },
  ];

  return (
    <Navbar>
      {/* Desktop View */}
      <NavBody>
        <NavbarLogo />
        <NavItems items={navItems} />
        <NavbarButton href="#contact" variant="primary">Contact</NavbarButton>
      </NavBody>

      {/* Mobile View */}
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle 
            isOpen={mobileMenuOpen} 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
          />
        </MobileNavHeader>
        <MobileNavMenu 
          isOpen={mobileMenuOpen} 
          onClose={() => setMobileMenuOpen(false)}
        >
          <div className="flex flex-col gap-4 w-full">
            {navItems.map((item, idx) => (
              <a
                key={idx}
                href={item.link}
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full px-4 py-3 text-xl font-medium text-neutral-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                {item.name}
              </a>
            ))}
            <NavbarButton 
              href="#contact" 
              className="w-full mt-4"
              variant="primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact Me
            </NavbarButton>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
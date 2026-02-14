"use client";

import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const morphTime = 1.5;      // morph duration
const holdTime = 0.5;       // hold duration (including last item)
const fadeOutTime = 0.0;    // fade out duration for LAST item ONLY

interface MorphingTextProps {
  items: ReactNode[];
  className?: string;
}

export function MorphingText({ items, className }: MorphingTextProps) {
  const [, setTick] = useState(0);

  const indexRef = useRef(0);
  const phaseTimeRef = useRef(0);

  const phaseRef = useRef<"morph" | "hold" | "lastFade">("morph");
  const stoppedRef = useRef(false);

  const lastFrameRef = useRef(performance.now());

  const slot1Ref = useRef<HTMLDivElement>(null);
  const slot2Ref = useRef<HTMLDivElement>(null);

  const applyMorph = useCallback((fraction: number) => {
    const s1 = slot1Ref.current;
    const s2 = slot2Ref.current;
    if (!s1 || !s2) return;

    const inv = 1 - fraction;

    const blurCurrent = Math.min(8 / inv - 8, 100);
    const blurNext = Math.min(8 / fraction - 8, 100);

    s1.style.filter = `blur(${blurCurrent}px)`;
    s1.style.opacity = `${Math.pow(inv, 0.4)}`;

    s2.style.filter = `blur(${blurNext}px)`;
    s2.style.opacity = `${Math.pow(fraction, 0.4)}`;
  }, []);

  useEffect(() => {
    const loop = () => {
      if (stoppedRef.current) return;

      const now = performance.now();
      const dt = (now - lastFrameRef.current) / 1000;
      lastFrameRef.current = now;

      phaseTimeRef.current += dt;

      // -------------------------------------
      //            MORPH PHASE
      // -------------------------------------
      if (phaseRef.current === "morph") {
        const fraction = Math.min(phaseTimeRef.current / morphTime, 1);
        applyMorph(fraction);

        if (fraction >= 1) {
          phaseRef.current = "hold";
          phaseTimeRef.current = 0;
        }
      }

      // -------------------------------------
      //            HOLD PHASE
      // -------------------------------------
      else if (phaseRef.current === "hold") {
        if (phaseTimeRef.current >= holdTime) {

          // Check if the item we just transitioned TO (slot2) is the last item.
          // If indexRef.current is (length - 2), then the next item is (length - 1), which is the last.
          // This prevents the loop from entering a redundant "Last -> Last" morph cycle.
          if (indexRef.current >= items.length - 2) {
            phaseRef.current = "lastFade";
            phaseTimeRef.current = 0;
            return;
          }

          // Otherwise, proceed to next pair
          indexRef.current++;
          phaseRef.current = "morph";
          phaseTimeRef.current = 0;

          setTick((t) => t + 1);
        }
      }

      // -------------------------------------
      //         FADE OUT LAST ITEM
      // -------------------------------------
      else if (phaseRef.current === "lastFade") {
        const s2 = slot2Ref.current; // last item is fully visible in slot2
        if (s2) {
          const fadeFraction = Math.min(phaseTimeRef.current / fadeOutTime, 1);
          s2.style.opacity = `${1 - fadeFraction}`;
          s2.style.filter = "none";
        }

        if (phaseTimeRef.current >= fadeOutTime) {
          stoppedRef.current = true;
          return;
        }
      }

      requestAnimationFrame(loop);
    };

    loop();
  }, [applyMorph, items.length]);

  // -------------------------------------
  // Determine items (NEVER wrap)
  // -------------------------------------
  const currentIndex = indexRef.current;
  const nextIndex = Math.min(currentIndex + 1, items.length - 1);

  const current = items[currentIndex];
  const next = items[nextIndex];

  return (
    <div
      className={cn(
        "relative mx-auto h-24 w-full max-w-3xl text-center font-bold text-4xl leading-none filter-[url(#threshold)_blur(0.6px)]",
        className
      )}
    >
      {/* CURRENT ITEM (fades out during morph) */}
      <div ref={slot1Ref} className="absolute inset-0 flex items-center justify-center opacity-100">
        {current}
      </div>

      {/* NEXT ITEM (fades in during morph; LAST item lives here) */}
      <div ref={slot2Ref} className="absolute inset-0 flex items-center justify-center opacity-0">
        {next}
      </div>

      {/* Threshold Filter */}
      <svg className="fixed h-0 w-0">
        <defs>
          <filter id="threshold">
            <feColorMatrix
              type="matrix"
              values="
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
}
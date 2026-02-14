"use client";

import { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";

interface TextTypeProps {
  text: string[];
  typingSpeed?: number;
  pauseDuration?: number;
  deleteSpeed?: number;
  cursorCharacter?: string;
  showCursor?: boolean;
}

export default function TextType({
  text,
  typingSpeed = 100,
  pauseDuration = 2000,
  deleteSpeed = 50,
  cursorCharacter = "|",
  showCursor = true,
}: TextTypeProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeedState, setTypingSpeedState] = useState(typingSpeed);

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;

    const i = loopNum % text.length;
    const fullText = text[i];

    const handleTyping = () => {
      setDisplayedText((prev) =>
        isDeleting
          ? fullText.substring(0, prev.length - 1)
          : fullText.substring(0, prev.length + 1)
      );

      setTypingSpeedState(isDeleting ? deleteSpeed : typingSpeed);

      if (!isDeleting && displayedText === fullText) {
        setTimeout(() => setIsDeleting(true), pauseDuration);
      } else if (isDeleting && displayedText === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeedState);

    return () => clearTimeout(timer);
  }, [
    displayedText,
    isDeleting,
    loopNum,
    text,
    typingSpeed,
    deleteSpeed,
    pauseDuration,
    isInView,
  ]);

  return (
    <span ref={containerRef} className="inline-block">
      {displayedText}
      {showCursor && (
        <span className="animate-blink ml-1 text-blue-500">
          {cursorCharacter}
        </span>
      )}
    </span>
  );
}
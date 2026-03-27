import React, { useState, useEffect, useRef, useCallback } from "react";

interface AnimatedBlurTextProps {
  text: string;
  duration?: number;
  characters?: string;
  className?: string;
  onAnimationStart?: () => void;
  onAnimationEnd?: () => void;
}

const AnimatedBlurText: React.FC<AnimatedBlurTextProps> = ({
  text,
  duration = 1000,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()",
  className = "",
  onAnimationStart,
  onAnimationEnd,
}) => {
  const [displayText, setDisplayText] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const animateRef = useRef<((timestamp: number) => void) | null>(null);

  const getRandomCharacter = useCallback(() => {
    return characters[Math.floor(Math.random() * characters.length)];
  }, [characters]);

  const animate = useCallback((timestamp: number) => {
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp;
      if (onAnimationStart) onAnimationStart();
    }

    const elapsed = timestamp - startTimeRef.current;
    const progress = Math.min(elapsed / duration, 1);

    let intermediateText = "";
    for (let i = 0; i < text.length; i++) {
      if (progress >= (i + 1) / text.length) {
        intermediateText += text[i];
      } else {
        intermediateText += getRandomCharacter();
      }
    }

    setDisplayText(intermediateText);

    if (progress < 1) {
      animationRef.current = requestAnimationFrame(animateRef.current!);
    } else {
      setDisplayText(text);
      setIsAnimating(false);
      if (onAnimationEnd) onAnimationEnd();
    }
  }, [text, duration, onAnimationStart, onAnimationEnd, getRandomCharacter]);

  animateRef.current = animate;

  const startAnimation = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    setIsAnimating(true);
    setDisplayText("");
    startTimeRef.current = null;
    animationRef.current = requestAnimationFrame(animateRef.current!);
  }, []);

  useEffect(() => {
    startAnimation();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [text, duration, startAnimation]);

  const handleClick = () => {
    startAnimation();
  };

  return (
    <span
      className={`blured-text ${className} ${isAnimating ? "animating" : ""}`}
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      {displayText}
    </span>
  );
};

export default AnimatedBlurText;
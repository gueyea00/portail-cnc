import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface FadeInProps extends React.HTMLAttributes<HTMLDivElement> {
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
}

export function FadeIn({ children, delay = 0, direction = "up", className, ...props }: FadeInProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  const directionClasses = {
    up: "translate-y-8",
    down: "-translate-y-8",
    left: "translate-x-8",
    right: "-translate-x-8",
    none: "translate-y-0 translate-x-0"
  };

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-all duration-1000 ease-out",
        isVisible ? "opacity-100 translate-y-0 translate-x-0" : `opacity-0 ${directionClasses[direction]}`,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}


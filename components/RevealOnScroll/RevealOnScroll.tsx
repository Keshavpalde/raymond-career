"use client";

import { useEffect, useRef, useState } from "react";

import styles from "./RevealOnScroll.module.css";

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
}

export default function RevealOnScroll({
  children,
  className,
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;

    if (!el) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -60px 0px",
      }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${styles.reveal} ${
        visible ? styles.visible : ""
      } ${className || ""}`}
    >
      {children}
    </div>
  );
}

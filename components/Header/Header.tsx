"use client";

import { useEffect, useState } from "react";

import Logo from "./Logo";
import Navigation from "./Navigation";
import ApplyButton from "./ApplyButton";
import styles from "./Header.module.css";

interface HeaderProps {
  data: {
    Logo: {
      url: string;
    };
    navigation: {
      id: number;
      label: string;
      url: string;
    }[];
    ctaButton: {
      text: string;
      url: string;
    };
  };
}

export default function Header({ data }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(
        window.scrollY > window.innerHeight - 100
      );
    };

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  return (
    <header className={styles.header}>
      <div
        className={`
          ${styles.wrapper}
          ${scrolled ? styles.scrolled : ""}
        `}
      >
        <Logo logo={data.Logo} />
        <Navigation navigation={data.navigation} />
        <ApplyButton button={data.ctaButton} />
      </div>
    </header>
  );
}

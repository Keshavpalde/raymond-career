"use client";

import { useEffect, useState } from "react";

import Logo from "./Logo";
import Navigation from "./Navigation";
import ApplyButton from "./ApplyButton";
import MenuToggle from "./MenuToggle";
import MobileMenu from "./MobileMenu";
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
  const [menuOpen, setMenuOpen] = useState(false);

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

  useEffect(() => {
    document.body.style.overflow = menuOpen
      ? "hidden"
      : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className={styles.header}>
      <div
        className={`
          ${styles.wrapper}
          ${scrolled ? styles.scrolled : ""}
          ${menuOpen ? styles.menuOpenWrapper : ""}
        `}
      >
        <Logo logo={data.Logo} />
        <Navigation navigation={data.navigation} />
        <ApplyButton button={data.ctaButton} />

        <MenuToggle
          open={menuOpen}
          onToggle={() => setMenuOpen((prev) => !prev)}
        />
      </div>

      <MobileMenu
        navigation={data.navigation}
        ctaButton={data.ctaButton}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
      />
    </header>
  );
}

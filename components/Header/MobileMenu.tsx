"use client";

import Link from "next/link";
import styles from "./Header.module.css";

interface MobileMenuProps {
  navigation: {
    id: number;
    label: string | null;
    url: string | null;
  }[];
  ctaButton: {
    text: string;
    url: string;
  };
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({
  navigation,
  ctaButton,
  open,
  onClose,
}: MobileMenuProps) {
  return (
    <div
      className={`${styles.mobileMenu} ${
        open ? styles.mobileMenuOpen : ""
      }`}
      aria-hidden={!open}
    >
      <nav className={styles.mobileNav}>
        {navigation
          .filter((item) => item.label && item.url)
          .map((item) => (
            <Link
              key={item.id}
              href={item.url!}
              className={styles.mobileNavLink}
              onClick={onClose}
            >
              {item.label}
            </Link>
          ))}
      </nav>

      <Link
        href={ctaButton.url}
        className={styles.mobileButton}
        onClick={onClose}
      >
        {ctaButton.text}
      </Link>
    </div>
  );
}

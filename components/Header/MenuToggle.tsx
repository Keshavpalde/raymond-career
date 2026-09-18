"use client";

import styles from "./Header.module.css";

interface MenuToggleProps {
  open: boolean;
  onToggle: () => void;
}

export default function MenuToggle({
  open,
  onToggle,
}: MenuToggleProps) {
  return (
    <button
      type="button"
      className={`${styles.menuToggle} ${
        open ? styles.menuToggleOpen : ""
      }`}
      onClick={onToggle}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
    >
      <span />
      <span />
      <span />
    </button>
  );
}

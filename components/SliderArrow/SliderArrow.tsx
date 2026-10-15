import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";
import styles from "./SliderArrow.module.css";

/*
 * The one slider arrow used across the site. Sections only
 * position it (via className); its look lives here.
 */

interface SliderArrowProps
  extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "children" | "type"
  > {
  direction: "prev" | "next";
}

const ICON_PATHS = {
  prev: "M19 12H5M11 6l-6 6 6 6",
  next: "M5 12h14M13 6l6 6-6 6",
};

export default function SliderArrow({
  direction,
  className,
  ...props
}: SliderArrowProps) {
  return (
    <button
      type="button"
      className={clsx(styles.arrow, className)}
      {...props}
    >
      <svg
        className={styles.icon}
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
      >
        <path d={ICON_PATHS[direction]} />
      </svg>
    </button>
  );
}

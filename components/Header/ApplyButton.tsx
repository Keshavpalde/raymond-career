import Link from "next/link";
import styles from "./Header.module.css";

interface ApplyButtonProps {
  button: {
    text: string;
    url: string;
  };
}

export default function ApplyButton({ button }: ApplyButtonProps) {
  return (
    <Link
      href={button.url}
      className={styles.button}
    >
      {button.text}
    </Link>
  );
}
import Link from "next/link";
import styles from "./Header.module.css";

interface NavigationProps {
  navigation: {
    id: number;
    label: string | null;
    url: string | null;
  }[];
}

export default function Navigation({ navigation }: NavigationProps) {
  return (
    <nav className={styles.navigation}>
      {navigation
        .filter((item) => item.label && item.url)
        .map((item) => (
          <Link
            key={item.id}
            href={item.url!}
            className={styles.navLink}
          >
            {item.label}
          </Link>
        ))}
    </nav>
  );
}
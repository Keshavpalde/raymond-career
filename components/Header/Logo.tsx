import styles from "./Header.module.css";

interface LogoProps {
  logo: {
    url: string;
  };
}

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export default function Logo({ logo }: LogoProps) {
  return (
    <a href="/" className={styles.logo}>
      <img
        src={`${STRAPI_URL}${logo.url}`}
        alt="Raymond"
      />
    </a>
  );
}
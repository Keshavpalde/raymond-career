import styles from "./Header.module.css";

interface LogoProps {
  logo: {
    url: string;
  };
}

export default function Logo({ logo }: LogoProps) {
  return (
    <a href="/" className={styles.logo}>
      <img
        src={`http://localhost:1337${logo.url}`}
        alt="Raymond"
      />
    </a>
  );
}
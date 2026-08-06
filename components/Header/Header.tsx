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
  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <Logo logo={data.Logo} />
        <Navigation navigation={data.navigation} />
        <ApplyButton button={data.ctaButton} />
      </div>
    </header>
  );
}
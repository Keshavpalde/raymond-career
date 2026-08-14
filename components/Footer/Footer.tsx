"use client";

import Image from "next/image";
import Link from "next/link";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";

import styles from "./Footer.module.css";

import { FooterData } from "@/types/footer";

interface Props {
  data: FooterData;
}

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  "http://localhost:1337";

function renderHeading(heading: string) {
  const words = heading.trim().split(" ");

  const accentIndex = words.findIndex(
    (word) =>
      word.toLowerCase() === "future"
  );

  if (accentIndex === -1) {
    return heading;
  }

  return words.map((word, index) =>
    index === accentIndex ? (
      <span
        key={index}
        className={styles.headingAccent}
      >
        {word}{" "}
      </span>
    ) : (
      `${word} `
    )
  );
}

export default function Footer({
  data,
}: Props) {

  const backgroundImage =
    data.backgroundImage?.url?.startsWith("http")
      ? data.backgroundImage.url
      : data.backgroundImage?.url
      ? `${STRAPI_URL}${data.backgroundImage.url}`
      : "";

  const logo =
    data.logo?.url?.startsWith("http")
      ? data.logo.url
      : data.logo?.url
      ? `${STRAPI_URL}${data.logo.url}`
      : "";

  const leftLinks = [...data.navigationLinks]
    .filter((item) => item.column === "Left")
    .sort((a, b) => a.displayOrder - b.displayOrder);

  const rightLinks = [...data.navigationLinks]
    .filter((item) => item.column === "Right")
    .sort((a, b) => a.displayOrder - b.displayOrder);

  const renderIcon = (platform: string) => {
    switch (platform) {
      case "Instagram":
        return <FaInstagram />;

      case "Facebook":
        return <FaFacebookF />;

      case "LinkedIn":
        return <FaLinkedinIn />;

      case "YouTube":
        return <FaYoutube />;

      case "X":
        return <FaXTwitter />;

      default:
        return null;
    }
  };

  return (
    <footer
      className={styles.footer}
      style={{
        backgroundImage: backgroundImage
          ? `url(${backgroundImage})`
          : undefined,
      }}
    >

      <div className={styles.container}>

        {/* CTA */}

        <div className={styles.ctaSection}>

          <h2 className={styles.heading}>
            {renderHeading(data.heading)}
          </h2>

          <p className={styles.subtext}>
            Thousands of homes built. Hundreds
            of careers made. Yours could be
            next.
          </p>

          {data.ctaButton?.text &&
            data.ctaButton?.url && (
              <Link
                href={data.ctaButton.url}
                className={styles.ctaButton}
              >
                {data.ctaButton.text}
              </Link>
            )}

        </div>

        {/* Bottom */}

        <div className={styles.bottom}>

          {/* Logo */}

          <div className={styles.logoWrapper}>
            {logo && (
              <Image
                src={logo}
                alt="Raymond Realty"
                width={180}
                height={60}
                unoptimized
              />
            )}
          </div>

          {/* Navigation */}

          <div className={styles.navigation}>

            <div>

              {leftLinks.map((item) => (
                <Link
                  key={item.id}
                  href={item.url}
                >
                  {item.title}
                </Link>
              ))}

            </div>

            <div>

              {rightLinks.map((item) => (
                <Link
                  key={item.id}
                  href={item.url}
                >
                  {item.title}
                </Link>
              ))}

            </div>

          </div>

          {/* Social */}

          <div className={styles.socialLinks}>

            {data.socialLinks.map((item) => (
              <Link
                key={item.id}
                href={item.url}
                className={styles.socialIcon}
              >
                {renderIcon(item.platform)}
              </Link>
            ))}

          </div>

        </div>

        {/* Copyright */}

        <div className={styles.copyright}>
          {data.copyright}
        </div>

      </div>

    </footer>
  );
}

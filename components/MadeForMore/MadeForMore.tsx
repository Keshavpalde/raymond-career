"use client";

import { useMemo, useState } from "react";

import styles from "./MadeForMore.module.css";

import TabNavigation from "./TabNavigation";
import ContentPanel from "./ContentPanel";

import {
  MadeForMoreData,
  MadeForMoreTab,
} from "@/types/madeForMore";

interface Props {
  data: MadeForMoreData;
}

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  "http://localhost:1337";

function getRichText(blocks: any[] = []) {
  return blocks
    .map((block) =>
      block.children
        ?.map((child: any) => child.text)
        .join("")
    )
    .join("\n");
}

function renderHeading(heading: string) {
  const words = heading.trim().split(" ");
  const lastWord = words.pop();

  return (
    <>
      {words.join(" ")}{" "}
      <span className={styles.headingAccent}>{lastWord}</span>
    </>
  );
}

export default function MadeForMore({
  data,
}: Props) {
  const defaultTab =
    data.tabs.find(
      (tab) => tab.activeByDefault
    ) || data.tabs[0];

  const [activeTab, setActiveTab] =
    useState<MadeForMoreTab>(defaultTab);

  const backgroundImage = useMemo(() => {
    if (!data.backgroundImage)
      return "";

    return data.backgroundImage.url.startsWith(
      "http"
    )
      ? data.backgroundImage.url
      : `${STRAPI_URL}${data.backgroundImage.url}`;
  }, [data]);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.heading}>
            {renderHeading(data.heading)}
          </h2>

          <p className={styles.description}>
            {getRichText(data.description)}
          </p>
        </div>

        <div
          className={styles.panel}
          style={{
            backgroundImage: backgroundImage
              ? `url(${backgroundImage})`
              : undefined,
          }}
        >
          <div className={styles.wrapper}>
            <TabNavigation
              tabs={data.tabs}
              activeTab={activeTab}
              onChange={setActiveTab}
            />

            <ContentPanel
              tab={activeTab}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
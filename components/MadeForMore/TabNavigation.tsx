"use client";

import styles from "./MadeForMore.module.css";

import { MadeForMoreTab } from "@/types/madeForMore";

interface Props {
  tabs: MadeForMoreTab[];
  activeTab: MadeForMoreTab;
  onChange: (tab: MadeForMoreTab) => void;
}

export default function TabNavigation({
  tabs,
  activeTab,
  onChange,
}: Props) {
  return (
    <div className={styles.sidebar}>
      {tabs.map((tab) => {
        const isActive = activeTab.id === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab)}
            className={`
              ${styles.tabButton}
              ${
                isActive
                  ? styles.activeTab
                  : ""
              }
            `}
          >
            {tab.tabTitle}
          </button>
        );
      })}
    </div>
  );
}
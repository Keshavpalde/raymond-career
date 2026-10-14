"use client";

import { Fragment, ReactNode } from "react";

import styles from "./MadeForMore.module.css";

import { MadeForMoreTab } from "@/types/madeForMore";

interface Props {
  tabs: MadeForMoreTab[];
  activeTab: MadeForMoreTab;
  onChange: (tab: MadeForMoreTab) => void;
  // When provided (mobile), the active tab's content is
  // rendered directly below its button, accordion-style.
  renderContent?: (tab: MadeForMoreTab) => ReactNode;
}

export default function TabNavigation({
  tabs,
  activeTab,
  onChange,
  renderContent,
}: Props) {
  return (
    <div className={styles.sidebar}>
      {tabs.map((tab) => {
        const isActive = activeTab.id === tab.id;

        return (
          <Fragment key={tab.id}>
            <button
              type="button"
              onClick={() => onChange(tab)}
              aria-expanded={renderContent ? isActive : undefined}
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

            {renderContent && isActive && (
              <div className={styles.inlineContent}>
                {renderContent(tab)}
              </div>
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
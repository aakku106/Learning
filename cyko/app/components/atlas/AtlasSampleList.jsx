"use client";

import AtlasSection from "./AtlasSection";
import { SECTIONS } from "./constants";
import { useAtlasSections } from "./useAtlasSections";

export default function AtlasSampleList() {
  const { sectionsState } = useAtlasSections();

  return (
    <div className="space-y-12">
      {SECTIONS.map((section) => (
        <AtlasSection
          key={section.key}
          section={section}
          state={sectionsState[section.key]}
        />
      ))}
    </div>
  );
}

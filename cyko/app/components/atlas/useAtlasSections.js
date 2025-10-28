"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { SECTIONS, createInitialSectionsState } from "./constants";

export function useAtlasSections() {
  const [sectionsState, setSectionsState] = useState(
    createInitialSectionsState
  );

  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;

    SECTIONS.forEach((section) => {
      setSectionsState((previous) => ({
        ...previous,
        [section.key]: { ...previous[section.key], loading: true, error: null },
      }));

      axios
        .get("/api/atlas-sample", {
          params: { section: section.key },
          signal: controller.signal,
        })
        .then((response) => {
          if (!isMounted) {
            return;
          }

          const data = Array.isArray(response.data?.data)
            ? response.data.data
            : [];

          setSectionsState((previous) => ({
            ...previous,
            [section.key]: { items: data, loading: false, error: null },
          }));
        })
        .catch((error) => {
          if (!isMounted) {
            return;
          }

          if (
            error?.code === "ERR_CANCELED" ||
            error?.name === "CanceledError"
          ) {
            return;
          }

          const message =
            error?.response?.data?.details ??
            error?.response?.data?.error ??
            error?.message ??
            "Unknown error";

          setSectionsState((previous) => ({
            ...previous,
            [section.key]: {
              ...previous[section.key],
              loading: false,
              error: message,
            },
          }));
        });
    });

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return { sectionsState };
}

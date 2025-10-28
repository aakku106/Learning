"use client";

import { useEffect, useState } from "react";

export default function AtlasSampleList() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadData() {
      try {
        const response = await fetch("/api/atlas-sample", {
          signal: controller.signal,
          cache: "no-store",
        });

        if (!response.ok) {
          let errorMessage = `Request failed with status ${response.status}`;
          try {
            const problem = await response.json();
            if (problem?.details) {
              errorMessage = `${errorMessage}: ${problem.details}`;
            } else if (problem?.error) {
              errorMessage = `${errorMessage}: ${problem.error}`;
            }
          } catch (parseError) {
            // ignore body parse failure, keep default message
          }
          throw new Error(errorMessage);
        }

        const payload = await response.json();
        setItems(Array.isArray(payload.data) ? payload.data : []);
      } catch (fetchError) {
        if (fetchError.name !== "AbortError") {
          setError(fetchError.message ?? "Unknown error");
        }
      } finally {
        setIsLoading(false);
      }
    }

    loadData();

    return () => {
      controller.abort();
    };
  }, []);

  if (isLoading) {
    return <p className="text-slate-500">Loading MongoDB Atlas sample data…</p>;
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-300 bg-red-50 p-4 text-red-700">
        <p className="font-semibold">Something went wrong.</p>
        <p>{error}</p>
      </div>
    );
  }

  if (!items.length) {
    return (
      <p className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-slate-600">
        No sample documents found in the collection yet.
      </p>
    );
  }

  return (
    <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <li
          key={item.id}
          className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800">
            {item.title ?? "Untitled"}
          </h3>
          <p className="text-sm text-slate-500">
            Year: {item.year ?? "Unknown"}
          </p>
          <p className="mt-2 text-sm text-slate-600">
            {item.plot ?? "No synopsis available."}
          </p>
        </li>
      ))}
    </ul>
  );
}

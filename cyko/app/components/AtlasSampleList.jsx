"use client";

import axios from "axios";
import { useEffect, useState } from "react";

const SECTIONS = [
  {
    key: "movies",
    title: "Featured Movies",
    description:
      "Latest documents from the sample_mflix.movies collection, including rating snippets.",
  },
  {
    key: "theaters",
    title: "Popular Theaters",
    description:
      "Handful of theater locations pulled straight from sample_mflix.theaters.",
  },
  {
    key: "comments",
    title: "Recent Comments",
    description:
      "Recent comments left by viewers in the sample dataset for extra scrolling content.",
  },
];

const LOADING_PLACEHOLDERS = Array.from({ length: 6 });

function formatDate(isoString) {
  if (!isoString) return null;
  try {
    const date = new Date(isoString);
    if (Number.isNaN(date.getTime())) {
      return null;
    }
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch (error) {
    return null;
  }
}

export default function AtlasSampleList() {
  const [sectionsState, setSectionsState] = useState(() => {
    return SECTIONS.reduce((acc, section) => {
      acc[section.key] = { items: [], loading: true, error: null };
      return acc;
    }, {});
  });

  useEffect(() => {
    const controller = new AbortController();

    SECTIONS.forEach((section) => {
      setSectionsState((prev) => ({
        ...prev,
        [section.key]: { ...prev[section.key], loading: true, error: null },
      }));

      axios
        .get("/api/atlas-sample", {
          params: { section: section.key },
          signal: controller.signal,
        })
        .then((response) => {
          const data = Array.isArray(response.data?.data)
            ? response.data.data
            : [];
          setSectionsState((prev) => ({
            ...prev,
            [section.key]: { items: data, loading: false, error: null },
          }));
        })
        .catch((error) => {
          if (error?.code === "ERR_CANCELED" || error?.name === "CanceledError") {
            return;
          }
          const message =
            error?.response?.data?.details ??
            error?.response?.data?.error ??
            error?.message ??
            "Unknown error";

          setSectionsState((prev) => ({
            ...prev,
            [section.key]: {
              ...prev[section.key],
              loading: false,
              error: message,
            },
          }));
        });
    });

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className="space-y-12">
      {SECTIONS.map((section) => {
        const state = sectionsState[section.key] ?? {
          items: [],
          loading: false,
          error: "Section not initialised",
        };

        return (
          <section
            key={section.key}
            id={`atlas-${section.key}`}
            className="scroll-mt-32 space-y-6">
            <header className="space-y-2">
              <span className="badge badge-secondary badge-outline uppercase tracking-wide">
                {section.key}
              </span>
              <h2 className="text-3xl font-bold text-base-content">
                {section.title}
              </h2>
              <p className="max-w-2xl text-base-content/70">
                {section.description}
              </p>
              <div className="divider my-2" role="presentation" />
            </header>

            {state.loading && <LoadingGrid />}
            {!state.loading && state.error && (
              <div className="alert alert-error">
                <span>{state.error}</span>
              </div>
            )}
            {!state.loading && !state.error && state.items.length === 0 && (
              <div className="alert alert-info">
                <span>No documents available for this section yet.</span>
              </div>
            )}
            {!state.loading && !state.error && state.items.length > 0 && (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {state.items.map((item) => (
                  <CardContent key={item.id} sectionKey={section.key} item={item} />
                ))}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}

function LoadingGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {LOADING_PLACEHOLDERS.map((_, index) => (
        <div key={index} className="card bg-base-200 shadow-sm animate-pulse">
          <div className="card-body space-y-3">
            <div className="skeleton h-6 w-2/3" />
            <div className="skeleton h-4 w-1/2" />
            <div className="skeleton h-20 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

function CardContent({ sectionKey, item }) {
  if (sectionKey === "movies") {
    return <MovieCard item={item} />;
  }

  if (sectionKey === "theaters") {
    return <TheaterCard item={item} />;
  }

  if (sectionKey === "comments") {
    return <CommentCard item={item} />;
  }

  return null;
}

function MovieCard({ item }) {
  const genres = Array.isArray(item?.meta?.genres) ? item.meta.genres : [];
  const imdbScore =
    typeof item?.meta?.imdb === "number" && !Number.isNaN(item.meta.imdb)
      ? item.meta.imdb.toFixed(1)
      : null;
  return (
    <div className="card bg-base-100 shadow-lg border border-base-300">
      <div className="card-body space-y-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="card-title text-base-content">{item.title}</h3>
          {item?.meta?.rating && (
            <span className="badge badge-primary badge-outline">
              Rated {item.meta.rating}
            </span>
          )}
        </div>
        {item.subtitle && (
          <p className="text-sm text-base-content/70">{item.subtitle}</p>
        )}
        <p className="text-sm leading-relaxed text-base-content/80">
          {item.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {genres.map((genre) => (
            <span key={genre} className="badge badge-outline">
              {genre}
            </span>
          ))}
          {imdbScore && (
            <span className="badge badge-secondary">IMDb {imdbScore}</span>
          )}
        </div>
      </div>
    </div>
  );
}

function TheaterCard({ item }) {
  const subtitle = item?.subtitle;
  const address = item?.description;
  return (
    <div className="card bg-base-100 shadow-lg border border-base-300">
      <div className="card-body space-y-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="card-title text-base-content">{item.title}</h3>
          <span className="badge badge-accent badge-outline">Theater</span>
        </div>
        {subtitle && (
          <p className="text-sm font-medium text-base-content/80">{subtitle}</p>
        )}
        <p className="text-sm text-base-content/70">{address}</p>
      </div>
    </div>
  );
}

function CommentCard({ item }) {
  const postedOn = formatDate(item?.meta?.date);
  return (
    <div className="card bg-base-100 shadow-lg border border-base-300">
      <div className="card-body space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="card-title text-base-content">{item.title}</h3>
            {item?.subtitle && (
              <p className="text-xs uppercase text-base-content/60">
                {item.subtitle}
              </p>
            )}
          </div>
          <span className="badge badge-info badge-outline">Comment</span>
        </div>
        <p className="text-sm leading-relaxed text-base-content/80">
          {item.description}
        </p>
        {postedOn && (
          <p className="text-xs text-base-content/50">Posted on {postedOn}</p>
        )}
      </div>
    </div>
  );
}

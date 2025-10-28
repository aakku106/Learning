"use client";

export default function MovieCard({ item }) {
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

"use client";

function formatDate(isoString) {
  if (!isoString) {
    return null;
  }

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

export default function CommentCard({ item }) {
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

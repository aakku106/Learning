export default function TheaterCard({ item }) {
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

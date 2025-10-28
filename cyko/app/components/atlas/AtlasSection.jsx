import LoadingGrid from "./LoadingGrid";
import { getCardComponent } from "./cards";

const FALLBACK_STATE = {
  items: [],
  loading: false,
  error: "Section not initialised",
};

export default function AtlasSection({ section, state }) {
  const resolvedState = state ?? FALLBACK_STATE;
  const CardComponent = getCardComponent(section.key);

  return (
    <section id={`atlas-${section.key}`} className="scroll-mt-32 space-y-6">
      <header className="space-y-2">
        <span className="badge badge-secondary badge-outline uppercase tracking-wide">
          {section.key}
        </span>
        <h2 className="text-3xl font-bold text-base-content">
          {section.title}
        </h2>
        <p className="max-w-2xl text-base-content/70">{section.description}</p>
        <div className="divider my-2" role="presentation" />
      </header>

      {resolvedState.loading && <LoadingGrid />}

      {!resolvedState.loading && resolvedState.error && (
        <div className="alert alert-error">
          <span>{resolvedState.error}</span>
        </div>
      )}

      {!resolvedState.loading &&
        !resolvedState.error &&
        resolvedState.items.length === 0 && (
          <div className="alert alert-info">
            <span>No documents available for this section yet.</span>
          </div>
        )}

      {!resolvedState.loading &&
        !resolvedState.error &&
        resolvedState.items.length > 0 &&
        CardComponent && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {resolvedState.items.map((item) => (
              <CardComponent key={item.id} item={item} />
            ))}
          </div>
        )}

      {!resolvedState.loading &&
        !resolvedState.error &&
        resolvedState.items.length > 0 &&
        !CardComponent && (
          <div className="alert alert-warning">
            <span>Unable to render items for this section.</span>
          </div>
        )}
    </section>
  );
}

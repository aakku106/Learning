// "use client";

import { SKELETON_COUNT } from "./constants";

const placeholders = Array.from({ length: SKELETON_COUNT });

export default function LoadingGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {placeholders.map((_, index) => (
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

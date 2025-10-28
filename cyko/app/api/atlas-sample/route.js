import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SAMPLE_DB = "sample_mflix";

const SECTION_CONFIG = {
  movies: {
    collection: "movies",
    projection: {
      title: 1,
      year: 1,
      plot: 1,
      genres: 1,
      imdb: 1,
      rated: 1,
    },
    sort: { year: -1 },
    limit: 12,
    transform: (doc) => ({
      id: doc._id?.toString() ?? randomUUID(),
      title: doc.title ?? "Untitled",
      subtitle: doc.year ? `Released: ${doc.year}` : null,
      description: doc.plot ?? "No synopsis available.",
      meta: {
        genres: Array.isArray(doc.genres) ? doc.genres.slice(0, 3) : [],
        rating: doc.rated ?? null,
        imdb:
          typeof doc.imdb?.rating === "number" && !Number.isNaN(doc.imdb.rating)
            ? doc.imdb.rating
            : null,
      },
    }),
  },
  theaters: {
    collection: "theaters",
    projection: {
      theaterId: 1,
      location: 1,
      name: 1,
    },
    sort: { "location.address.city": 1 },
    limit: 12,
    transform: (doc) => {
      const city = doc.location?.address?.city ?? null;
      const state = doc.location?.address?.state ?? null;
      const subtitle = [city, state].filter(Boolean).join(", ") || null;

      return {
        id: doc._id?.toString() ?? doc.theaterId?.toString() ?? randomUUID(),
        title: doc.name ?? `Theater ${doc.theaterId ?? "Unknown"}`,
        subtitle,
        description:
          doc.location?.address?.street1 ??
          doc.location?.geo?.coordinates?.join(", ") ??
          "Address unavailable",
        meta: {
          state,
        },
      };
    },
  },
  comments: {
    collection: "comments",
    projection: {
      name: 1,
      email: 1,
      text: 1,
      date: 1,
    },
    sort: { date: -1 },
    limit: 12,
    transform: (doc) => ({
      id: doc._id?.toString() ?? randomUUID(),
      title: doc.name ?? "Anonymous reviewer",
      subtitle: doc.email ?? null,
      description: doc.text ?? "No comment text provided.",
      meta: {
        date: doc.date ? new Date(doc.date).toISOString() : null,
      },
    }),
  },
};

export async function GET(request) {
  const url = new URL(request.url);
  const sectionKey = url.searchParams.get("section") ?? "movies";
  const section = SECTION_CONFIG[sectionKey];

  if (!section) {
    return NextResponse.json(
      { error: "Unknown section requested" },
      { status: 400 }
    );
  }

  try {
    const collection = await getCollection(SAMPLE_DB, section.collection);

    let cursor = collection.find(section.filter ?? {}, {
      projection: section.projection,
    });

    if (section.sort) {
      cursor = cursor.sort(section.sort);
    }

    if (section.limit) {
      cursor = cursor.limit(section.limit);
    }

    const docs = await cursor.toArray();
    const normalized = docs.map(section.transform);

    return NextResponse.json({ data: normalized });
  } catch (error) {
    console.error("Failed to load sample data from MongoDB Atlas", error);
    return NextResponse.json(
      {
        error: "Unable to load sample data",
        details:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}

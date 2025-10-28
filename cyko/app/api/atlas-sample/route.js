import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SAMPLE_DB = "sample_mflix";
const SAMPLE_COLLECTION = "movies";

export async function GET() {
  try {
    const collection = await getCollection(SAMPLE_DB, SAMPLE_COLLECTION);
    const docs = await collection
      .find({}, { projection: { title: 1, year: 1, plot: 1 } })
      .sort({ year: -1 })
      .limit(12)
      .toArray();

    const normalized = docs.map((doc) => ({
      id: doc._id?.toString() ?? randomUUID(),
      title: doc.title ?? "Untitled",
      year: doc.year ?? "Unknown",
      plot: doc.plot ?? "No synopsis available.",
    }));

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

import { NextResponse } from "next/server";
import { COLLECTIONS } from "@/lib/data/collections";

export async function GET() {
  const summaries = COLLECTIONS.map(c => ({
    slug: c.slug,
    name: c.name,
    tagline: c.tagline,
    mood: c.mood,
    accent: c.accent,
    atmosphere: c.atmosphere,
    cover: c.pieces[0].image
  }));
  return NextResponse.json(summaries);
}

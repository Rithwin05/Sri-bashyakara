import { NextResponse } from "next/server";
import { COLLECTIONS } from "@/lib/data/collections";

export async function GET(req, { params }) {
  // Access params asynchronously in Next.js 15+
  // But we're on Next.js 14 mostly, still good practice to just read from params.slug
  const p = await params;
  const collection = COLLECTIONS.find(c => c.slug === p.slug);
  
  if (!collection) {
    return new NextResponse("Collection not found", { status: 404 });
  }

  return NextResponse.json(collection);
}

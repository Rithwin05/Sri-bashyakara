import { COLLECTIONS } from "@/lib/data/collections";
import CollectionWorldClient from "./CollectionWorldClient";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return COLLECTIONS.map((c) => ({
    slug: c.slug,
  }));
}

export default async function Page({ params }) {
  // Await the params to get the dynamic slug
  const { slug } = await params;
  
  if (!COLLECTIONS.some(c => c.slug === slug)) {
    notFound();
  }
  
  return <CollectionWorldClient slug={slug} />;
}

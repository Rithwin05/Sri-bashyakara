import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Lead } from "@/lib/models/Lead";
import { v4 as uuidv4 } from "uuid";

export async function POST(req) {
  try {
    const body = await req.json();
    await connectDB();

    const leadDoc = {
      ...body,
      id: uuidv4(),
      type: "consultation",
      created_at: new Date().toISOString(),
    };

    const lead = await Lead.create(leadDoc);
    console.log(`New bridal consultation lead: ${lead.full_name} (${lead.phone})`);
    
    return NextResponse.json(lead, { status: 201 });
  } catch (error) {
    console.error("Consultation Lead Error:", error);
    return NextResponse.json({ error: "Failed to create lead" }, { status: 500 });
  }
}

/**
 * Mongoose schemas for SBJ lead types.
 * Mirrors the Python Pydantic models from backend/server.py exactly.
 */
import mongoose from "mongoose";

// ── Consultation Lead ────────────────────────────────────────────────────────
const ConsultationLeadSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    full_name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, default: null },
    wedding_month: { type: String, default: null },
    aesthetic: { type: String, default: null },
    jewellery_focus: { type: String, default: null },
    family_notes: { type: String, default: null },
    is_nri: { type: Boolean, default: false },
    type: { type: String, default: "consultation" },
    created_at: { type: String, required: true },
  },
  { _id: false }
);

// ── Reservation Lead ─────────────────────────────────────────────────────────
const ReservationLeadSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    full_name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, default: null },
    preferred_date: { type: String, default: null },
    preferred_time: { type: String, default: null },
    party_size: { type: Number, default: 1 },
    occasion: { type: String, default: null },
    collection_interest: { type: String, default: null },
    message: { type: String, default: null },
    type: { type: String, default: "reservation" },
    created_at: { type: String, required: true },
  },
  { _id: false }
);

// ── Concierge Lead ───────────────────────────────────────────────────────────
const ConciergeLeadSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    full_name: { type: String, required: true },
    phone: { type: String, required: true },
    message: { type: String, default: null },
    type: { type: String, default: "concierge" },
    created_at: { type: String, required: true },
  },
  { _id: false }
);

// Use a shared "leads" collection (same as Python backend) — discriminated by `type` field
export const Lead =
  mongoose.models.Lead ||
  mongoose.model("Lead", ConsultationLeadSchema, "leads");

// For typed creation — we create docs as plain objects and insert into `leads`
// using the shared model. Schemas above serve as validation reference.
export const LeadSchemas = {
  consultation: ConsultationLeadSchema,
  reservation: ReservationLeadSchema,
  concierge: ConciergeLeadSchema,
};

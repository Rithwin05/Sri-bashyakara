export const SBJ_PHONE = "919866635555";
export const SBJ_PHONE_DISPLAY = "+91 98666 35555";
export const SBJ_ADDRESS = "Plot No 46, Rd Number 10, Jubilee Hills, Hyderabad, 500033";

export const whatsappUrl = (text = "Hello SBJ") => {
  return `https://wa.me/${SBJ_PHONE}?text=${encodeURIComponent(text)}`;
};

/**
 * MERN API interactions (Client side only)
 */
export async function postConsultation(data) {
  const res = await fetch("/api/leads/consultation", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to submit consultation");
  return res.json();
}

export async function postReservation(data) {
  const res = await fetch("/api/leads/reservation", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to submit reservation");
  return res.json();
}

export async function postConcierge(data) {
  const res = await fetch("/api/leads/concierge", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to submit concierge");
  return res.json();
}

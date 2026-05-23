import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

export const SBJ_PHONE = "919030895440";
export const SBJ_PHONE_DISPLAY = "+91 90308 95440";
export const SBJ_ADDRESS = "Plot No 1271, Road No 63, Jubilee Hills Checkpost, Hyderabad";

export const whatsappUrl = (message = "I would like to begin my SBJ private experience.") =>
  `https://wa.me/${SBJ_PHONE}?text=${encodeURIComponent(message)}`;

export const api = axios.create({ baseURL: API });

export async function listCollections() {
  const { data } = await api.get("/collections");
  return data;
}

export async function getCollection(slug) {
  const { data } = await api.get(`/collections/${slug}`);
  return data;
}

export async function postConsultation(payload) {
  const { data } = await api.post("/leads/consultation", payload);
  return data;
}

export async function postReservation(payload) {
  const { data } = await api.post("/leads/reservation", payload);
  return data;
}

export async function postConcierge(payload) {
  const { data } = await api.post("/leads/concierge", payload);
  return data;
}

import { fetchAPI } from "@/lib/strapi";

export async function getHeader() {
  const { data } = await fetchAPI("/api/header?populate=*");
  return data;
}
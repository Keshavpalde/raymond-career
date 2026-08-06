const API_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "";

export function getStrapiMedia(url?: string | null): string {
  if (!url) return "";

  // Already absolute URL
  if (url.startsWith("http")) {
    return url;
  }

  // Relative URL from Strapi
  return `${API_URL}${url}`;
}
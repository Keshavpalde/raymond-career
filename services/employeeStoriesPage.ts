import { EmployeeStoriesPageData } from "@/types/employeeStoriesPage";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function getEmployeeStoriesPage(): Promise<EmployeeStoriesPageData> {
  const res = await fetch(
    `${STRAPI_URL}/api/employee-stories-page?populate[employeeStoriesHero][populate]=*&populate[employeeStories][populate][stories][populate]=*`,
    {
      next: {
        revalidate: 60,
      },
    }
  );

  if (!res.ok) {
    const errorText = await res.text();

    console.error("Strapi API Error:", {
      status: res.status,
      statusText: res.statusText,
      response: errorText,
    });

    throw new Error(
      `Failed to fetch Employee Stories page data: ${res.status}`
    );
  }

  const json = await res.json();

  return json.data;
}
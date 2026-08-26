import EmployeeStoriesHero from "@/components/EmployeeStoriesPage/EmployeeStoriesHero";
import EmployeeStories from "@/components/EmployeeStoriesPage/EmployeeStories";
import { getEmployeeStoriesPage } from "@/services/employeeStoriesPage";

export default async function EmployeeStoriesPage() {
  const data = await getEmployeeStoriesPage();

  return (
    <>
      <EmployeeStoriesHero
        data={data?.employeeStoriesHero}
      />

      <EmployeeStories
        data={data?.employeeStories}
      />
    </>
  );
}
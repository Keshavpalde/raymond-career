import ApplyNowHero from "@/components/ApplyNowPage/ApplyNowHero";
import FindYourOpportunity from "@/components/ApplyNowPage/FindYourOpportunity";

import {
  getApplyNowPage,
  getJobOpenings,
} from "@/services/applyNowPage";

export default async function ApplyNowPage() {
  const [pageData, jobs] = await Promise.all([
    getApplyNowPage(),
    getJobOpenings(),
  ]);

  return (
    <>
      <ApplyNowHero
        data={pageData.applyNowHero}
      />

      <FindYourOpportunity
        data={pageData.findYourOpportunity}
        jobs={jobs}
      />
    </>
  );
}
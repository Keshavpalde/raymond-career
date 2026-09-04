import DiversityInclusionHero from "@/components/DiversityInclusionPage/DiversityInclusionHero";
import OurCommitmentToInclusion from "@/components/DiversityInclusionPage/OurCommitmentToInclusion";
import DiversityInAction from "@/components/DiversityInclusionPage/DiversityInAction";
import WomenBrigade from "@/components/DiversityInclusionPage/WomenBrigade";
import DiversityStatistics from "@/components/DiversityInclusionPage/DiversityStatistics";
import OurWorkplaceCulture from "@/components/DiversityInclusionPage/OurWorkplaceCulture";

import {
  getDiversityInclusionPage,
} from "@/services/diversityInclusionPage";

export default async function DiversityInclusionPage() {
  const data = await getDiversityInclusionPage();

  return (
    <>
      {/* =====================================
          Section 1
          Diversity & Inclusion Hero
      ====================================== */}

      <DiversityInclusionHero
        data={data.diversityInclusionHero}
      />

      {/* =====================================
          Section 2
          Our Commitment To Inclusion
      ====================================== */}

      <OurCommitmentToInclusion
        data={data.ourCommitmentToInclusion}
      />

      {/* =====================================
          Section 3
          Diversity In Action
      ====================================== */}

      <DiversityInAction
        data={data.diversityInAction}
      />

      {/* =====================================
          Section 4
          Women Brigade
      ====================================== */}

      <WomenBrigade
        data={data.womenBrigade}
      />

      {/* =====================================
          Section 5
          Diversity Statistics
      ====================================== */}

      <DiversityStatistics
        data={data.diversityStatistics}
      />

      {/* =====================================
          Section 6
          Our Workplace Culture
      ====================================== */}

      <OurWorkplaceCulture
        data={data.OurWorkplaceCulture}
      />
    </>
  );
}

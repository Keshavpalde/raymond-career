import HouseConceptHero from "@/components/HouseConceptPage/HouseConceptHero";
import HouseConcept from "@/components/HouseConceptPage/HouseConcept";
import MeetTheHouses from "@/components/HouseConceptPage/MeetTheHouses";
import HouseMoments from "@/components/HouseConceptPage/HouseMoments";

import { getHouseConceptPage } from "@/services/houseConceptPage";

export default async function HouseConceptPage() {
  const data = await getHouseConceptPage();

  return (
    <>
      {/* =================================
          Hero
      ================================= */}

      {data.houseConceptHero && (
        <HouseConceptHero
          data={data.houseConceptHero}
        />
      )}

      {/* =================================
          House Concept / Video
      ================================= */}

      {data.houseConcept && (
        <HouseConcept
          data={data.houseConcept}
        />
      )}

      {/* =================================
          Meet The Houses
      ================================= */}

      {data.meetTheHouses && (
        <MeetTheHouses
          data={data.meetTheHouses}
        />
      )}

      {/* =================================
          House Moments
      ================================= */}

      {data.houseMoments && (
        <HouseMoments
          data={data.houseMoments}
        />
      )}
    </>
  );
}
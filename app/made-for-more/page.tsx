import {
  MadeForMoreHero,
  MadeForMoreIntro,
  LearnAndGrow,
  Recognition,
  WellbeingFirst,
  BeyondWork,
  Celebrations,
  Activities,
} from "@/components/MadeForMorePage";

import { getMadeForMorePage } from "@/services/madeForMorePage";

export default async function MadeForMorePage() {
  const data = await getMadeForMorePage();

  return (
    <>
      <MadeForMoreHero data={data.madeForMoreHero} />

      <MadeForMoreIntro data={data.madeForMoreIntro} />

      <LearnAndGrow data={data.learnAndGrow} />

      <Recognition data={data.recognition} />

      <WellbeingFirst data={data.wellbeingFirst} />

      <BeyondWork data={data.beyondWork} />

      <Celebrations data={data.celebrations} />

      <Activities data={data.activities} />
    </>
  );
}
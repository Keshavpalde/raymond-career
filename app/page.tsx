import Hero from "@/components/Hero";
import StatsSection from "@/components/StatsSection";
import ValuesSection from "@/components/ValuesSection";
import LeadershipSection from "@/components/LeadershipSection";
import MadeForMore from "@/components/MadeForMore";
import LifeAtRaymondRealty from "@/components/LifeAtRaymondRealty";

import { getHome } from "@/services/home";

export default async function HomePage() {
  const home = await getHome();

  console.log(home);

  return (
    <>
      {/* Hero */}
      <Hero data={home.hero} />

      {/* Stats */}
      <StatsSection data={home.statsSection} />

      {/* Our Values */}
      {home.ourValues && (
        <ValuesSection
          data={home.ourValues}
        />
      )}

      {/* Leadership */}
      {home.leadershipThoughts && (
        <LeadershipSection
          data={home.leadershipThoughts}
        />
      )}

      {/* Made For More */}
      {home.madeForMore && (
        <MadeForMore
          data={home.madeForMore}
        />
      )}

      {/* Life At Raymond Realty */}
      {home.lifeAtRaymondRealty && (
        <LifeAtRaymondRealty
          data={home.lifeAtRaymondRealty}
        />
      )}
    </>
  );
}
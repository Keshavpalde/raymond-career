import Hero from "@/components/Hero";
import StatsSection from "@/components/StatsSection";
import ValuesSection from "@/components/ValuesSection";
import LeadershipSection from "@/components/LeadershipSection";
import MadeForMore from "@/components/MadeForMore";
import LifeAtRaymondRealty from "@/components/LifeAtRaymondRealty";
import EmployeeTestimonials from "@/components/EmployeeTestimonials";
import AwardsRecognition from "@/components/AwardsRecognition";

import { getHome } from "@/services/home";

export default async function HomePage() {
  const home = await getHome();

  console.log(home);

  return (
    <>
      {/* Hero Section */}
      {home.hero && (
        <Hero data={home.hero} />
      )}

      {/* Stats Section */}
      {home.statsSection && (
        <StatsSection data={home.statsSection} />
      )}

      {/* Our Values Section */}
      {home.ourValues && (
        <ValuesSection
          data={home.ourValues}
        />
      )}

      {/* Leadership Thoughts Section */}
      {home.leadershipThoughts && (
        <LeadershipSection
          data={home.leadershipThoughts}
        />
      )}

      {/* Made For More Section */}
      {home.madeForMore && (
        <MadeForMore
          data={home.madeForMore}
        />
      )}

      {/* Life At Raymond Realty Section */}
      {home.lifeAtRaymondRealty && (
        <LifeAtRaymondRealty
          data={home.lifeAtRaymondRealty}
        />
      )}

      {/* Employee Testimonials Section */}
      {home.employeeTestimonials && (
        <EmployeeTestimonials
          data={home.employeeTestimonials}
        />
      )}

      {/* Awards Recognition Section */}
      {home.awardsRecognition && (
        <AwardsRecognition
          data={home.awardsRecognition}
        />
      )}
    </>
  );
}
import Hero from "@/components/Hero";
import StatsSection from "@/components/StatsSection";
import ValuesSection from "@/components/ValuesSection";
import LeadershipSection from "@/components/LeadershipSection";
import MadeForMore from "@/components/MadeForMore";
import LifeAtRaymondRealty from "@/components/LifeAtRaymondRealty";
import EmployeeTestimonials from "@/components/EmployeeTestimonials";
import AwardsRecognition from "@/components/AwardsRecognition";
import RevealOnScroll from "@/components/RevealOnScroll";

import HomeJobOpportunities from "@/components/JobSection/HomeJobOpportunities";

import { getHome } from "@/services/home";
import { getHomeJobOpenings } from "@/services/jobOpeningService";

export default async function HomePage() {
  const [home, jobs] = await Promise.all([
    getHome(),
    getHomeJobOpenings(),
  ]);

  console.log(home);
  console.log("Home Job Opportunities:", jobs);

  return (
    <>
      {/* Hero Section */}
      {home.hero && (
        <RevealOnScroll>
          <Hero data={home.hero} />
        </RevealOnScroll>
      )}

      {/* Stats Section */}
      {home.statsSection && (
        <RevealOnScroll>
          <StatsSection data={home.statsSection} />
        </RevealOnScroll>
      )}

      {/* Our Values Section */}
      {home.ourValues && (
        <RevealOnScroll>
          <ValuesSection
            data={home.ourValues}
          />
        </RevealOnScroll>
      )}

      {/* Leadership Thoughts Section */}
      {home.leadershipThoughts && (
        <RevealOnScroll>
          <LeadershipSection
            data={home.leadershipThoughts}
          />
        </RevealOnScroll>
      )}

      {/* Made For More Section */}
      {home.madeForMore && (
        <RevealOnScroll>
          <MadeForMore
            data={home.madeForMore}
          />
        </RevealOnScroll>
      )}

      {/* Life At Raymond Realty Section */}
      {home.lifeAtRaymondRealty && (
        <RevealOnScroll>
          <LifeAtRaymondRealty
            data={home.lifeAtRaymondRealty}
          />
        </RevealOnScroll>
      )}

      {/* Employee Testimonials Section */}
      {home.employeeTestimonials && (
        <RevealOnScroll>
          <EmployeeTestimonials
            data={home.employeeTestimonials}
          />
        </RevealOnScroll>
      )}

      {/* Awards Recognition Section */}
      {home.awardsRecognition && (
        <RevealOnScroll>
          <AwardsRecognition
            data={home.awardsRecognition}
          />
        </RevealOnScroll>
      )}

      {/* =====================================
          JOB OPPORTUNITIES SECTION
      ===================================== */}
      {home.jobOpportunities && (
        <RevealOnScroll>
          <HomeJobOpportunities
            data={home.jobOpportunities}
            jobs={jobs}
          />
        </RevealOnScroll>
      )}
    </>
  );
}
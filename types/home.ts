import { HeroData } from "./hero";
import { StatsSectionData } from "./statsSection";
import { ValuesSectionData } from "./valuesSection";
import { LeadershipSectionData } from "./leadership";
import { MadeForMoreData } from "./madeForMore";
import { LifeAtRaymondRealtyData } from "./lifeAtRaymondRealty";

export interface HomeData {
  hero: HeroData;

  statsSection: StatsSectionData;

  ourValues?: ValuesSectionData;

  leadershipThoughts?: LeadershipSectionData;

  madeForMore?: MadeForMoreData;

  lifeAtRaymondRealty?: LifeAtRaymondRealtyData;
}
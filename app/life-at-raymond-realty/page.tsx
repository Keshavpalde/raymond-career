import LifeAtRaymondHero from "@/components/LifeAtRaymondRealtyPage/LifeAtRaymondHero";
import InsideOurWorkplace from "@/components/LifeAtRaymondRealtyPage/InsideOurWorkplace";
import LifeBeyondJobTitle from "@/components/LifeAtRaymondRealtyPage/LifeBeyondJobTitle";
import GlimpseIntoOurWorld from "@/components/LifeAtRaymondRealtyPage/GlimpseIntoOurWorld";
import StoriesThatInspire from "@/components/LifeAtRaymondRealtyPage/StoriesThatInspire";
import GrowthEnvironment from "@/components/LifeAtRaymondRealtyPage/GrowthEnvironment";

import { getLifeAtRaymondRealtyPage } from "@/services/lifeAtRaymondRealtyPage";

export default async function LifeAtRaymondRealtyPage() {
  const data = await getLifeAtRaymondRealtyPage();

  return (
    <>
      <LifeAtRaymondHero
        data={data.lifeAtRaymondHero}
      />

      <InsideOurWorkplace
        data={data.insideOurWorkplace}
      />

      <LifeBeyondJobTitle
        data={data.lifeBeyondJobTitle}
      />

      <GlimpseIntoOurWorld
        data={data.glimpseIntoOurWorld}
      />

      <StoriesThatInspire
        data={data.storiesThatInspire}
      />

      <GrowthEnvironment
        data={data.growthEnvironment}
      />
    </>
  );
}
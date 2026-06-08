import BuiltAroundYou from "@/components/home/BuiltAroundYou";
import BusinessProblems from "@/components/home/BusinessProblems";
import CTA from "@/components/home/CTA";
import CustomSolutions from "@/components/home/CustomSolutions";
import FAQ from "@/components/home/FAQ";
import Hero from "@/components/home/Hero";
import Process from "@/components/home/Process";
import TrustedByOperators from "@/components/home/TrustedByOperators";
import WhatChanges from "@/components/home/WhatChanges";
import WhatWeDo from "@/components/home/WhatWeDo";
import WhoWeWorkWith from "@/components/home/WhoWeWorkWith";
import WhyUs from "@/components/home/WhyUs";

export default function Home() {
  return (
    <main className={`bg-transparent relative`}>
      <Hero />
      <TrustedByOperators />
      <BusinessProblems />
      <WhatWeDo />
      <BuiltAroundYou />
      <WhoWeWorkWith />
      <Process />
      <WhatChanges />
      <WhyUs />
      <CustomSolutions />
      <FAQ />
      <CTA />
    </main>
  );
}

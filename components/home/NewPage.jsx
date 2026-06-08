import React, { lazy } from "react";
import "./style.css";
import BusinessProblems from "./BusinessProblems";
import WhatWeDo from "./WhatWeDo";
import BuiltAroundYou from "./BuiltAroundYou";
import WhoWeWorkWith from "./WhoWeWorkWith";
import Process from "./Process";
import WhatChanges from "./WhatChanges";
import WhyUs from "./WhyUs";
import CustomSolutions from "./CustomSolutions";
import FAQ from "./FAQ";
import CTA from "./CTA";
const Hero = lazy(() => import("./Hero"));
const TrustedByOperators = lazy(() => import("./TrustedByOperators"));

const NewPage = () => {
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
};

export default NewPage;

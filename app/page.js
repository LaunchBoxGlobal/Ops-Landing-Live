"use client";
import WorkflowAuditForm from "@/components/contact/WorkflowAuditForm";
import { Footer } from "@/components/global/Footer";
import Navbar from "@/components/global/Navbar";
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
import { useState } from "react";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    setStep(1);
    setIsSubmitted(false);
  };
  return (
    <>
      <Navbar openModal={openModal} />
      <main className={`bg-transparent relative`}>
        <Hero openModal={openModal} />
        <TrustedByOperators />
        <BusinessProblems openModal={openModal} />
        <WhatWeDo openModal={openModal} />
        <BuiltAroundYou openModal={openModal} />
        <WhoWeWorkWith openModal={openModal} />
        <Process openModal={openModal} />
        <WhatChanges />
        <WhyUs />
        <CustomSolutions openModal={openModal} />
        <FAQ />
        <CTA openModal={openModal} />
        <WorkflowAuditForm
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          step={step}
          setStep={setStep}
          isSubmitted={isSubmitted}
          setIsSubmitted={setIsSubmitted}
          openModal={openModal}
        />
      </main>
      <Footer />
    </>
  );
}

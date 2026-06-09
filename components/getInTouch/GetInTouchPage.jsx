"use client";
import React, { useState } from "react";
import Navbar from "../global/Navbar";
import ContactUsHero from "./ContactUsHero";
import ContactUsForm from "./ContactUsForm";
import { Footer } from "../global/Footer";
import WorkflowAuditForm from "../contact/WorkflowAuditForm";

const GetInTouchPage = () => {
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
      <main className="w-full">
        <ContactUsHero />
        <ContactUsForm />
      </main>
      <Footer />

      <WorkflowAuditForm
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        step={step}
        setStep={setStep}
        isSubmitted={isSubmitted}
        setIsSubmitted={setIsSubmitted}
        openModal={openModal}
      />
    </>
  );
};

export default GetInTouchPage;

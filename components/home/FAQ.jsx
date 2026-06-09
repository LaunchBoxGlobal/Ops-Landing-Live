"use client";
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { HOME_PAGE_FAQS } from "@/constants/home/faqs";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-[#fff] padding-x py-24 selection:bg-red-100 selection:text-red-900 overflow-hidden">
      {/* Header Section */}
      <div className="mb-10 text-center">
        <p className="red-text font-medium tracking-widest uppercase text-lg md:text-xl lg:text-2xl xl:text-[32px] mb-5">
          Common Questions
        </p>
        <h2
          id="faqs"
          className="text-4xl sm:text-6xl md:text-5xl lg:text-6xl xl:text-[72px] font-bold text-[#111111] tracking-tight lg:leading-[1]"
        >
          Things People Usually Ask <br className="hidden lg:block" /> Before{" "}
          <span className="text-[#ea2b2b]">Getting</span> Started
        </h2>
      </div>

      <div className="w-full flex flex-col gap-3 md:gap-4">
        {HOME_PAGE_FAQS?.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={index}
              className={`bg-white rounded-[14px] md:rounded-2xl border border-gray-100 shadow-[0_2px_8px_rgb(0,0,0,0.01)] overflow-hidden cursor-pointer ${isOpen ? "shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)]" : "hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)]"} transition-all duration-300`}
              onClick={() => toggleFaq(index)}
            >
              <div
                className={`flex items-center justify-between p-6 md:px-8 ${isOpen ? "pb-2" : ""}`}
              >
                <h3 className="text-[#111] font-semibold text-[17px] md:text-[18px] lg:text-[24px] leading-snug tracking-tight pr-6 select-none">
                  {faq.question}
                </h3>
                <div className="shrink-0 text-[#fb1d10] ml-4">
                  {isOpen ? (
                    <ChevronUp
                      className="w-[18px] h-[18px] md:w-5 md:h-5"
                      strokeWidth={2.5}
                    />
                  ) : (
                    <ChevronDown
                      className="w-[18px] h-[18px] md:w-5 md:h-5"
                      strokeWidth={2.5}
                    />
                  )}
                </div>
              </div>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 md:px-8 pb-7 text-[#4A5565] text-[16px] leading-[1.65] font-light w-full max-w-[85%] lg:w-[75%]">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}

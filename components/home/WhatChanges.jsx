import React from "react";
import { ArrowRight } from "lucide-react";

const cards = [
  {
    before: "Scattered across tools\nand inboxes",
    after: "Everything Centralized in\none place",
    desc: "Schedules, customers, jobs, and payments all live in one platform. No more hunting across three tools to answer a basic question.",
  },
  {
    before: "Reactive, always\ncatching up",
    after: "Real-time visibility,\nalways in control",
    desc: "See what's happening across your business without calling anyone or waiting for an end-of-day report.",
  },
  {
    before: "Manual tasks eating your\nteam's time",
    after: "Repetitive work runs\nautomatically",
    desc: "Job updates, notifications, invoices, and status changes happen on their own. Your team focuses on actual work.",
  },
  {
    before: "Decisions made on gut\nfeeling",
    after: "One dashboard, real\nnumbers",
    desc: "Pull revenue, jobs, and team activity from one screen. Make decisions on data, not a spreadsheet someone updated three days ago.",
  },
];

const WhatChanges = () => {
  return (
    <section className="bg-[#fff] padding-x py-24 selection:bg-red-100 selection:text-red-900 overflow-hidden">
      {/* Header Section */}
      <div className="mb-10 text-center">
        <p className="red-text font-medium tracking-widest uppercase text-lg md:text-xl lg:text-2xl xl:text-[32px] mb-5">
          What Changes
        </p>
        <h2 className="text-4xl sm:text-6xl md:text-5xl lg:text-6xl xl:text-[72px] font-bold text-[#111111] tracking-tight lg:leading-[1]">
          What Your Business Looks Like{" "}
          <span className="text-[#ea2b2b]">After</span>
        </h2>

        <p className="text-gray-400 font-light leading-[1.2] text-lg md:text-xl xl:text-2xl md:max-w-[75%] mx-auto mt-5">
          When your software actually fits how you work, everything runs
          differently.
        </p>
      </div>

      <div className="flex-1 w-full flex flex-col justify-center">
        {/* Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-6">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="bg-white rounded-[24px] p-6 lg:p-8 shadow-[0_4px_30px_-6px_rgba(0,0,0,0.05)] border border-gray-100/80 flex flex-col"
            >
              {/* Before/After Boxes Container */}
              <div className="relative flex flex-col sm:flex-row items-stretch gap-3 lg:gap-4 mb-6">
                {/* Arrow Icon Wrapper */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[34px] h-[34px] sm:w-[40px] sm:h-[40px] lg:w-[44px] lg:h-[44px] rounded-full bg-[#f02222] text-white flex items-center justify-center z-10 border-[3px] sm:border-[4px] border-white shadow-sm pointer-events-none transition-transform duration-300">
                  <ArrowRight className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px] lg:w-[22px] lg:h-[22px] stroke-[2.5] rotate-90 sm:rotate-0" />
                </div>

                {/* Before Box */}
                <div className="flex-1 bg-[#fcedec] rounded-xl sm:rounded-[18px] p-5 sm:p-6 sm:pr-8 flex flex-col justify-start">
                  <h3 className="text-[#f02222] font-bold text-[16px] sm:text-[18px] tracking-wide mb-2 sm:mb-3">
                    Before
                  </h3>
                  <p className="font-semibold text-gray-900 tracking-tight leading-[1.35] text-[16px] sm:text-[18px] whitespace-pre-line">
                    {card.before}
                  </p>
                </div>

                {/* After Box */}
                <div className="flex-1 bg-[#eaf8ee] rounded-xl sm:rounded-[18px] p-5 sm:p-6 sm:pl-8 flex flex-col justify-start">
                  <h3 className="text-[#10b95d] font-bold text-[16px] sm:text-[18px] tracking-wide mb-2 sm:mb-3">
                    After
                  </h3>
                  <p className="font-semibold text-gray-900 tracking-tight leading-[1.35] text-[16px] sm:text-[18px] whitespace-pre-line">
                    {card.after}
                  </p>
                </div>
              </div>

              {/* Description Paragraph */}
              <p className="text-gray-600 text-[15px] sm:text-[16px] leading-relaxed">
                {card.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Footer Text */}
        <div className="text-center w-full">
          <p className="text-gray-800 text-[19px] sm:text-[22px] md:text-[26px] font-medium tracking-tight leading-[1.4]">
            This is what it looks like when your software finally{" "}
            <br className="hidden sm:block" />
            works the way your business{" "}
            <span className="text-[#f02222]">does.</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhatChanges;

import React from "react";
import ProcessCard from "./ProcessCard";
import { GoArrowUpRight } from "react-icons/go";
import Link from "next/link";
import { PROCESS_STEPS } from "@/constants/home/home-process";

const Process = () => {
  return (
    <section
      id="how-it-works"
      className="bg-[#fff] padding-x py-24 selection:bg-red-100 selection:text-red-900 overflow-hidden flex items-start justify-between flex-wrap gap-8"
    >
      {/* Header Section */}
      <div className="mb-10 text-start w-full lg:max-w-[40%]">
        <p className="red-text font-medium tracking-widest uppercase text-lg md:text-xl lg:text-2xl xl:text-[32px] mb-5">
          the process
        </p>
        <h2 className="text-4xl sm:text-6xl md:text-5xl lg:text-6xl xl:text-[72px] font-bold text-[#111111] tracking-tight lg:leading-[1]">
          From First Call to Fully Launched. Here's How It{" "}
          <span className="text-[#ea2b2b]">Works</span>
        </h2>

        <p className="text-gray-400 font-light leading-[1.2] text-lg md:text-xl xl:text-2xl mt-5">
          No guesswork. No disappearing developers. Just a clear process from
          start to finish.
        </p>
      </div>

      <div className="w-full lg:max-w-[55%]">
        <div className="">
          {PROCESS_STEPS?.slice(0, 1)?.map((pr, i) => {
            return <ProcessCard process={pr} key={pr?.title} index={i} />;
          })}
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {PROCESS_STEPS?.slice(1)?.map((pr, i) => {
            return <ProcessCard process={pr} key={pr?.title} index={i + 1} />;
          })}

          <Link
            href={"https://www.launchboxglobal.com/contact-us"}
            target="_blank"
            className="w-full min-h-[237px] flex flex-col items-start justify-between rounded-[24px] p-5 bg-[#f40e00] transition-all duration-300 group"
          >
            <span className="text-[24px] leading-[1.3] font-bold text-white transition-all duration-300">
              Start With a <br /> Workflow Audit
            </span>

            <div className="w-[46px] h-[46px] rounded-full flex items-center justify-center border-2 border-white transition-all duration-300">
              <GoArrowUpRight className="text-white transition-all duration-300 text-2xl" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Process;

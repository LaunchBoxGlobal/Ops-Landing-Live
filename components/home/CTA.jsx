import { Mail } from "lucide-react";
import Link from "next/link";
import React from "react";

const CTA = ({ openModal }) => {
  return (
    <section className="w-full bg-[#F9F9F9] text-center flex flex-col items-center py-16 lg:py-24 padding-x">
      <span className="text-[#fb1d10] uppercase tracking-wider font-medium text-[14px] md:text-[24px] lg:text-[32px] mb-4 block">
        LET'S TALK
      </span>

      <h2 className="text-[#111] font-bold text-[42px] sm:text-5xl md:text-[66px] lg:leading-[1] tracking-[-0.02em] mb-7">
        Ready To Stop Patching <br className="hidden md:block" />
        And Start <span className="text-[#fb1d10]">Building?</span>
      </h2>

      <p className="text-[#9ca3af] text-[18px] md:text-[22px] lg:text-[24px] leading-[1.5] font-light max-w-[820px] mb-8">
        If your business has outgrown its current tools, or you're just tired of
        being the one holding everything together, let's have a conversation.
        We'll map your workflow, identify the gaps, and show you what's
        possible.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full mb-6">
        <button
          type="button"
          onClick={openModal}
          className="w-full sm:w-auto h-[60px] px-8 bg-[#fb1d10] hover:bg-[#000] text-white font-bold text-[17px] rounded-xl flex items-center justify-center transition-colors duration-200"
        >
          Book a Workflow Audit
        </button>
        <button
          type="button"
          onClick={openModal}
          className="w-full sm:w-auto h-[60px] px-8 bg-transparent border-2 border-[#fb1d10] hover:bg-[#fb1d10] text-[#fb1d10] hover:text-white font-bold text-[17px] rounded-xl flex items-center justify-center transition-colors duration-200"
        >
          <Mail className="w-[20px] h-[20px] mr-2.5" strokeWidth={2.5} />
          Get in Touch
        </button>
      </div>

      <p className="text-[#333] text-[17px] md:text-[19px] font-medium leading-[1.6]">
        No pressure. No commitment. Just a straight conversation{" "}
        <br className="hidden sm:block" />
        about your business and whether we're the right{" "}
        <span className="text-[#fb1d10]">fit.</span>
      </p>
    </section>
  );
};

export default CTA;

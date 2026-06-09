import Image from "next/image";
import Link from "next/link";
import { FiLink2 } from "react-icons/fi";

export default function WhatWeDo({ openModal }) {
  return (
    <section className="bg-[#fff] padding-x py-24 selection:bg-red-100 selection:text-red-900 overflow-hidden">
      {/* Header Section */}
      <div className="mb-14 text-center">
        <p className="red-text font-medium tracking-widest uppercase text-lg md:text-xl lg:text-2xl xl:text-[32px] mb-5">
          what we do
        </p>
        <h2 className="text-4xl sm:text-6xl md:text-5xl lg:text-6xl xl:text-[72px] font-bold text-[#111111] tracking-tight lg:leading-[1]">
          We Build the Software That <br className="hidden lg:block" /> Runs
          Your Business. <span className="text-[#ea2b2b]">Your Way</span>
        </h2>

        <p className="text-gray-400 font-light leading-[1.2] text-lg md:text-xl xl:text-2xl max-w-[85%] mx-auto mt-5">
          No off-the-shelf tools that almost fit. No stitching together five
          subscriptions. We design and build custom web and mobile software
          around your exact workflows, whether that's one unified dashboard or a
          complete end-to-end operations platform.
        </p>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* card 1 */}
        <div className="flex flex-col items-start gap-3 px-5 lg:px-10 pt-6 lg:pt-10 pb-16 bg-[#EFF6FF] border-2 border-[#DBEAFE] rounded-[22px] relative overflow-hidden hover:-translate-y-3 transition-all duration-300">
          <div
            className={`w-[52px] h-[52px] rounded-[15px] bg-[#2B7FFF] flex items-center justify-center`}
          >
            <FiLink2 color="#fff" size={18} />
          </div>
          <h3 className="text-[22px] font-bold">
            Already using tools you like?
          </h3>
          <p className="text-[#364153] text-[15px] relative z-10">
            We can build a central dashboard that pulls data from your existing
            systems (HubSpot, QuickBooks, spreadsheets, whatever) so you finally
            have one place to see everything.
          </p>

          <Image
            src={"/link-icon.png"}
            alt="link-icon"
            width={91}
            height={91}
            className="absolute -bottom-3 -right-3 z-0"
          />
        </div>

        {/* card 2 */}
        <div className="flex flex-col items-start gap-3 px-5 lg:px-10 pt-10 lg:pb-10 pb-16 bg-[#FAF5FF] border-2 border-[#F3E8FF] rounded-[22px] relative overflow-hidden hover:-translate-y-3 transition-all duration-300">
          <div
            className={`w-[52px] h-[52px] rounded-[15px] bg-[#AD46FF] flex items-center justify-center`}
          >
            <Image
              src={"/stack-icon.png"}
              alt="stack-icon"
              width={26}
              height={26}
              className=""
            />
          </div>
          <h3 className="text-[22px] font-bold">
            Need something built from scratch?
          </h3>
          <p className="text-[#364153] text-[15px] relative z-10">
            We design and develop fully custom platforms covering scheduling,
            dispatch, CRM, payments, reporting, and staff workflows, built
            specifically around how your business operates.
          </p>

          <Image
            src={"/stack-icon-purple.png"}
            alt="stack-icon-purple"
            width={91}
            height={91}
            className="absolute -top-3 -right-3 z-0"
          />
        </div>

        {/* card 3 */}
        <div className="flex flex-col items-start gap-3 px-5 lg:px-10 pt-6 lg:pt-10 pb-16 bg-[#FFF7ED] border-2 border-[#FFEDD4] rounded-[22px] relative overflow-hidden hover:-translate-y-3 transition-all duration-300">
          <div
            className={`w-[52px] h-[52px] rounded-[15px] bg-[#F40E00] flex items-center justify-center`}
          >
            <Image
              src={"/circular-lines-white.png"}
              alt="circular-lines-white"
              width={26}
              height={26}
            />
          </div>
          <h3 className="text-[22px] font-bold">Somewhere in between?</h3>
          <p className="text-[#364153] text-[15px] relative z-10">
            Most of our clients are. We start with a Workflow Audit, map what
            you have, identify the gaps, and build exactly what's missing.
            Nothing more, nothing less.
          </p>

          <Image
            src={"/circular-lines.png"}
            alt="circular-lines"
            width={91}
            height={91}
            className="absolute -bottom-3 -right-3 z-0"
          />
        </div>
      </div>

      <div className="w-full flex justify-center mt-8">
        <button
          type="button"
          onClick={openModal}
          aria-label="Book a Workflow Audit"
          className="red-bg text-white hover:bg-black transition-all duration-300 rounded-[14px] w-auto px-5 lg:px-0 lg:w-[249px] h-[64px] text-sm md:text-lg font-semibold inline-flex items-center justify-center"
        >
          Book a Workflow Audit
        </button>
      </div>
    </section>
  );
}

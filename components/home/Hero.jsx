import React from "react";
import Link from "next/link";
import HeroAnimation from "./HeroAnimation";

const Hero = () => {
  return (
    <section
      aria-labelledby="hero-heading"
      className="w-full bg-white mb-20 overflow-hidden"
    >
      <section className="w-full padding-x relative pt-36 xl:pt-44 flex flex-col items-center justify-start gap-5 lg:gap-[25px]">
        <h1
          id="hero-heading"
          className="font-bold relative z-10 text-[8vw] md:text-[6.2vw] mb-1 text-center tracking-normal leading-none lg:leading-[100px] w-full"
        >
          We Build Software <br className="hidden lg:block" />
          <span className="red-text">Around How You Work</span>
        </h1>

        <h2 className="text-xl lg:text-[32px] 2xl:text-[36px] font-medium text-gray-900 text-center lg:max-w-[90%] lg:leading-[40px]">
          Stop Running Your Business on Spreadsheets and Workarounds. <br />
          You Deserve Software Built for How You Actually{" "}
          <span className="red-text">Work.</span>
        </h2>

        <p className="text-xl lg:text-2xl font-extralight text-gray-400 text-center lg:max-w-[85%]">
          Whether you need a single dashboard that pulls together your existing
          tools, or a fully custom platform built from the ground up, we build
          the web and mobile software that fits how your business actually runs,
          not the other way around.
        </p>

        <div className="flex items-center justify-center gap-3 lg:gap-5 w-full">
          <Link
            href="/contact-us"
            aria-label="Book a Workflow Audit"
            className="red-btn"
          >
            Book a Workflow Audit
          </Link>

          <Link
            href="/contact-us"
            aria-label="See How It Works"
            className="white-btn"
          >
            See How It Works
          </Link>
        </div>

        <p className="text-xl lg:text-2xl font-medium text-gray-900 text-center max-w-[476px] mx-auto">
          No commitment. Just a clear picture of what's possible for your{" "}
          <span className="red-text">business.</span>
        </p>
      </section>

      <HeroAnimation />
    </section>
  );
};

export default React.memo(Hero);

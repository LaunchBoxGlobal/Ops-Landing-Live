import React from "react";
import {
  Package,
  DollarSign,
  Building2,
  Wrench,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

const CustomSolutions = ({ openModal }) => {
  return (
    <section className="bg-[#fff] padding-x py-24 selection:bg-red-100 selection:text-red-900 overflow-hidden">
      {/* Header Section */}
      <div className="mb-10 text-center">
        <p className="red-text font-medium tracking-widest uppercase text-lg md:text-xl lg:text-2xl xl:text-[32px] mb-5">
          Custom vs. Off-The-Shelf{" "}
        </p>
        <h2 className="text-4xl sm:text-6xl md:text-5xl lg:text-6xl xl:text-[72px] font-bold text-[#111111] tracking-tight lg:leading-[1]">
          Why Not Just Buy <br className="hidden lg:block" /> An ERP or A{" "}
          <span className="text-[#ea2b2b]">SaaS Tool?</span>
        </h2>

        <p className="text-gray-400 font-light leading-[1.2] text-lg md:text-xl xl:text-2xl md:max-w-[75%] mx-auto mt-5">
          It's a fair question. Here's the honest answer.
        </p>
      </div>

      <div className="bg-[#fff] flex flex-col items-center selection:bg-red-100">
        {/* Top Row: 2 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Card 1 */}
          <div className="bg-white rounded-[28px] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 border border-gray-100/50 flex flex-col">
            <div className="w-[44px] h-[44px] rounded-[14px] bg-[#fcedec] flex items-center justify-center mb-6 shadow-sm">
              <Package className="w-5 h-5 text-[#fb1d10]" strokeWidth={2.5} />
            </div>
            <h3 className="text-gray-900 font-bold text-[22px] md:text-[24px] leading-[1.25] tracking-tight mb-4 pr-4">
              Off-the-shelf tools are built for everyone, which means they're
              perfect for no one.
            </h3>
            <p className="text-[#9ca3af] text-[15px] leading-[1.65] font-light">
              ERPs and SaaS platforms are designed to serve thousands of
              different businesses. That means you spend months configuring and
              training your team on features you'll never use, while the things
              you actually need are missing or locked behind a higher tier.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-[28px] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 border border-gray-100/50 flex flex-col">
            <div className="w-[44px] h-[44px] rounded-[14px] bg-[#fcedec] flex items-center justify-center mb-6">
              <DollarSign
                className="w-5 h-5 text-[#fb1d10]"
                strokeWidth={2.5}
              />
            </div>
            <h3 className="text-gray-900 font-bold text-[22px] md:text-[24px] leading-[1.25] tracking-tight mb-4 pr-10">
              You end up paying forever for software that still doesn't fit.
            </h3>
            <p className="text-[#9ca3af] text-[15px] leading-[1.65] font-light">
              SaaS fees add up fast. $200 here, $400 there, another tool for the
              gap in between. Most growing service businesses are spending
              thousands per month on subscriptions that still don't talk to each
              other.
            </p>
          </div>
        </div>

        {/* Bottom Row: 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Card 3 */}
          <div className="bg-white rounded-[28px] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 border border-gray-100/50 flex flex-col">
            <div className="w-[44px] h-[44px] rounded-[14px] bg-[#fcedec] flex items-center justify-center mb-6">
              <Building2 className="w-5 h-5 text-[#fb1d10]" strokeWidth={2.5} />
            </div>
            <h3 className="text-gray-900 font-bold text-[20px] leading-[1.25] tracking-tight mb-4">
              ERPs are built for enterprises, not for a 30-person service
              business.
            </h3>
            <p className="text-[#9ca3af] text-[15px] leading-[1.65] font-light">
              Full ERP implementations take months, cost a fortune, and require
              dedicated IT staff to manage. They're powerful but overkill for
              most service businesses, and the complexity creates more problems
              than it solves.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-[28px] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 border border-gray-100/50 flex flex-col">
            <div className="w-[44px] h-[44px] rounded-[14px] bg-[#fcedec] flex items-center justify-center mb-6">
              <Wrench className="w-5 h-5 text-[#fb1d10]" strokeWidth={2.5} />
            </div>
            <h3 className="text-gray-900 font-bold text-[20px] leading-[1.25] tracking-tight mb-4 pr-4">
              Custom software is built once, for how you actually work.
            </h3>
            <p className="text-[#9ca3af] text-[15px] leading-[1.65] font-light">
              You get exactly what you need, nothing you don't. No monthly fees
              to us after launch. No vendor deciding to sunset a feature. No
              migrating your data when they change their pricing model.
            </p>
          </div>

          {/* Card 5 */}
          <div className="bg-white rounded-[28px] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 border border-gray-100/50 flex flex-col">
            <div className="w-[44px] h-[44px] rounded-[14px] bg-[#fcedec] flex items-center justify-center mb-6">
              <TrendingUp
                className="w-5 h-5 text-[#fb1d10]"
                strokeWidth={2.5}
              />
            </div>
            <h3 className="text-gray-900 font-bold text-[20px] leading-[1.25] tracking-tight mb-4">
              The investment makes sense faster than most people expect.
            </h3>
            <p className="text-[#9ca3af] text-[15px] leading-[1.65] font-light">
              When you factor in the SaaS subscriptions you cancel, the hours
              your team stops wasting on manual work, and the mistakes that stop
              happening, most of our clients see the platform pay for itself
              within the first year.
            </p>
          </div>
        </div>

        {/* Call to Action Layer */}
        <div className="max-w-3xl mx-auto mt-8 text-center px-4">
          <p className="text-gray-900 text-[18px] md:text-[20px] font-medium leading-[1.4] mb-8">
            We're not the right choice for every business. But if you've
            outgrown your current tools and nothing off the shelf quite fits,
            it's worth a <span className="text-[#fb1d10]">conversation.</span>
          </p>
          <button
            type="button"
            onClick={openModal}
            className="bg-[#fb1d10] hover:bg-[#000] text-white font-medium py-4 px-8 rounded-lg shadow-sm transition-colors duration-300"
          >
            Book a Workflow Audit
          </button>
        </div>
      </div>
    </section>
  );
};

export default CustomSolutions;

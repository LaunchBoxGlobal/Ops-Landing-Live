import { Briefcase, CalendarDays, Users } from "lucide-react";
import Image from "next/image";

export default function TrustedByOperators() {
  return (
    <div className="min-h-screen bg-[#fafafa] py-24 padding-x selection:bg-red-100 selection:text-red-900 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-20">
          <p className="red-text font-medium tracking-widest uppercase text-lg md:text-xl lg:text-2xl xl:text-[32px] mb-5">
            Trusted By Operators
          </p>
          <h2 className="text-4xl sm:text-6xl md:text-5xl lg:text-6xl xl:text-[72px] font-bold text-[#111111] tracking-tighter lg:leading-[1]">
            Five Years. Hundreds Of Operators.
            <br className="hidden lg:block" />
            One Platform <span className="text-[#ea2b2b]">Philosophy</span>
          </h2>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20 md:gap-6 lg:gap-10 pb-12 md:pb-24 px-2 sm:px-4 lg:px-6 pt-6">
          {/* Card 1 */}
          <div className="relative bg-white border border-[#EAEAEA] custom-shadow rounded-[2rem] -rotate-3 hover:rotate-0 transition-all duration-700 p-8 xl:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between md:translate-y-0">
            <div className="absolute -top-3 -left-3 bg-[#ea2b2b] rounded-2xl shadow-[0_8px_20px_rgba(234,43,43,0.3)] w-[41px] h-[41px] -rotate-1 flex items-center justify-center">
              <Image
                src={"/projects-delivered-icon.png"}
                alt="projects-delivered-icon"
                width={18}
                height={18}
                className=""
              />
            </div>
            <div className="mt-4">
              <h4 className="text-[52px] font-black text-[#111111] tracking-tighter">
                97+
              </h4>
              <p className="text-[22px] font-semibold text-[#111111] mb-3">
                Projects delivered
              </p>
              <p className="text-[#737373] font-medium leading-[1.2]">
                Production platforms shipped across 12 verticals.
              </p>
            </div>
            <div className="mt-12 flex items-center justify-between relative group">
              <span className="text-xs font-bold text-gray-300 tracking-widest whitespace-nowrap z-10 bg-white pr-4">
                01 / 03
              </span>
              <div className="absolute left-14 right-2 top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-r from-gray-100 to-transparent"></div>
              <div className="w-2 h-2 rounded-full bg-[#ea2b2b] flex-shrink-0 z-10"></div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative bg-white border border-[#EAEAEA] custom-shadow rounded-[2rem] rotate-1 hover:rotate-0 transition-all duration-700 p-8 xl:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between md:translate-y-12">
            <div className="absolute -top-3 -left-3 bg-[#ea2b2b] rounded-2xl shadow-[0_8px_20px_rgba(234,43,43,0.3)] w-[41px] h-[41px] flex items-center justify-center">
              <Image
                src={"/team-members-icon.png"}
                alt="team-members-icon"
                width={18}
                height={18}
              />
            </div>
            <div className="mt-4">
              <h4 className="text-[52px] font-black text-[#111111] tracking-tighter">
                102+
              </h4>
              <p className="text-[22px] font-semibold text-[#111111] mb-3">
                Team members
              </p>
              <p className="text-[#737373] font-medium leading-[1.2]">
                Designers, engineers, PMs — full-stack & in-house.
              </p>
            </div>
            <div className="mt-12 flex items-center justify-between relative group">
              <span className="text-xs font-bold text-gray-300 tracking-widest whitespace-nowrap z-10 bg-white pr-4">
                02 / 03
              </span>
              <div className="absolute left-14 right-2 top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-r from-gray-100 to-transparent"></div>
              <div className="w-2 h-2 rounded-full bg-[#ea2b2b] flex-shrink-0 z-10"></div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative bg-white border border-[#EAEAEA] custom-shadow rounded-[2rem] -rotate-2 hover:rotate-0 transition-all duration-700 p-8 xl:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between md:translate-y-6">
            <div className="absolute -top-3 -left-3 bg-[#ea2b2b] rounded-2xl shadow-[0_8px_20px_rgba(234,43,43,0.3)] w-[41px] h-[41px] -rotate-2 flex items-center justify-center">
              <Image
                src={"/calendar-icon.png"}
                alt="calendar-icon"
                width={18}
                height={18}
              />
            </div>
            <div className="mt-4">
              <h4 className="text-[52px] font-black text-[#111111] tracking-tighter">
                5 yrs
              </h4>
              <p className="text-[22px] font-semibold text-[#111111] mb-3">
                Building custom software
              </p>
              <p className="text-[#737373] font-medium leading-[1.2]">
                Half a decade of compounding craft and learnings.
              </p>
            </div>
            <div className="mt-12 flex items-center justify-between relative group">
              <span className="text-xs font-bold text-gray-300 tracking-widest whitespace-nowrap z-10 bg-white pr-4">
                03 / 03
              </span>
              <div className="absolute left-14 right-2 top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-r from-gray-100 to-transparent"></div>
              <div className="w-2 h-2 rounded-full bg-[#ea2b2b] flex-shrink-0 z-10"></div>
            </div>
          </div>
        </div>

        {/* Industries Section */}
        <div className="text-center mt-12 md:mt-20">
          <h3 className="text-sm sm:text-base xl:text-[32px] font-semibold tracking-[0.1em] text-[#111111] mb-8 lg:mb-10 uppercase">
            Built for the industries that build everything else
          </h3>
          <div className="flex flex-wrap justify-center gap-3 mx-auto w-full">
            <IndustryTag icon={"/HVAC.png"} label="HVAC" />
            <IndustryTag icon={"/plumbing.png"} label="Plumbing" />
            <IndustryTag icon={"/electrical.png"} label="Electrical" />
            <IndustryTag icon={"/roofing.png"} label="Roofing" />
            <IndustryTag
              icon={"/fleet-and-logistics.png"}
              label="Fleet & Logistics"
            />
            <IndustryTag icon={"/cleaning.png"} label="Cleaning" />
            <IndustryTag icon={"/telecom.png"} label="Telecom" />
            <IndustryTag icon={"/construction.png"} label="Construction" />
            <IndustryTag icon={"/landscaping.png"} label="Landscaping" />
          </div>
        </div>
      </div>
    </div>
  );
}

function IndustryTag({ icon: Icon, label }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2.5 bg-transparent border border-[#EAEAEA] rounded-full">
      {/* <Icon className="w-4 h-4 text-[#ea2b2b]" strokeWidth={2.5} /> */}
      <Image
        src={Icon}
        width={16}
        height={16}
        alt="icon"
        className="object-contain"
      />
      <span className="text-sm font-bold text-[#111111]">{label}</span>
    </div>
  );
}

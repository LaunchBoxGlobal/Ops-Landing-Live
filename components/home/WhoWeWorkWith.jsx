import Image from "next/image";
import Link from "next/link";
import React from "react";

const services = [
  {
    title: "HVAC Companies",
    icon: "/hvac-companies.png",
    width: 22,
    height: 22,
    alt: "HVAC companies icon",
  },
  {
    title: "Cleaning Companies",
    icon: "/cleaning-companies.png",
    width: 22,
    height: 22,
    alt: "cleaning companies icon",
  },
  {
    title: "Plumbing & Electrical",
    icon: "/plumbing-and-electrical.png",
    width: 22,
    height: 22,
    alt: "plumbing-and-electrical",
  },
  {
    title: "Pest Control Companies",
    icon: "/pest-controller-companies-icon.png",
    width: 22,
    height: 22,
    alt: "pest-controller-companies-icon",
  },
  {
    title: "Mobile Mechanics & Auto Detailing",
    icon: "/mobile-mechanics-icon.png",
    width: 22,
    height: 22,
    alt: "mobile-mechanics-icon",
  },
  {
    title: "Appliance Repair Companies",
    icon: "/appliance-repair-icon.png",
    width: 22,
    height: 22,
    alt: "appliance-repair-icon",
  },
  {
    title: "Home Inspection Services",
    icon: "/home-inspection-service-icon.png",
    width: 22,
    height: 22,
    alt: "home-inspection-service-icon",
  },
  {
    title: "Field Service Teams",
    icon: "/field-service-teams-service.png",
    width: 22,
    height: 22,
    alt: "field-service-teams-service",
  },
  {
    title: "Moving Companies",
    icon: "/moving-companies.png",
    width: 22,
    height: 22,
    alt: "moving-companies",
  },
  {
    title: "Local Delivery & Courier",
    icon: "/local-delivery-services-icon.png",
    width: 22,
    height: 22,
    alt: "local-delivery-services-icon",
  },
  {
    title: "Equipment Rental Companies",
    icon: "/equipment-rental-companies-icon.png",
    width: 22,
    height: 22,
    alt: "equipment-rental-companies-icon",
  },
  {
    title: "Security Service Companies",
    icon: "/equipment-rental-companies-icon.png",
    width: 22,
    height: 22,
    alt: "Security Service Companies",
  },
  {
    title: "Medical Transport",
    icon: "/medical-transport-services-icon.png",
    width: 22,
    height: 22,
    alt: "medical-transport-services-icon",
  },
  {
    title: "Event Service Companies",
    icon: "/event-services.png",
    width: 22,
    height: 22,
    alt: "event-services",
  },
];

const WhoWeWorkWith = ({ openModal }) => {
  return (
    <section
      id="who-we-work-with"
      className="bg-[#fff] padding-x py-24 selection:bg-red-100 selection:text-red-900 overflow-hidden"
    >
      {/* Header Section */}
      <div className="mb-10 text-center">
        <p className="red-text font-medium tracking-widest uppercase text-lg md:text-xl lg:text-2xl xl:text-[32px] mb-5">
          Who we work with
        </p>
        <h2 className="text-4xl sm:text-6xl md:text-5xl lg:text-6xl xl:text-[72px] font-bold text-[#111111] tracking-tight lg:leading-[1]">
          Built for Service Businesses <br className="hidden lg:block" /> That
          Are Serious About <span className="text-[#ea2b2b]">Growth</span>
        </h2>

        <p className="text-gray-400 font-light leading-[1.2] text-lg md:text-xl xl:text-2xl md:max-w-[75%] mx-auto mt-5">
          If you run a service business with a real team, real customers, and
          real operational complexity, and your current tools aren't keeping up,
          this is for you.
        </p>
      </div>

      <div className="w-full grid gird grid-cols-2 md:grid-cols-4 lg:grid-cols-7 xl:grid-cols-7 gap-3">
        {services.map((ser) => {
          return (
            <div
              key={ser.title}
              className="w-full h-[142px] rounded-[15px] flex flex-col text-center items-center justify-center border border-[#E5E7EB] bg-white hover:bg-[#f40e00] transition-all duration-500 group p-4 gap-3 hover:text-white hover:shadow-2xl"
            >
              <div className="w-[45px] h-[45px] rounded-[15px] bg-[#F40E001A] border-2 border-[#F40E0033] group-hover:border-white group-hover:bg-[#fff] transition-all duration-300 flex items-center justify-center">
                <Image
                  src={ser?.icon}
                  width={ser?.width}
                  height={ser.height}
                  alt={ser.alt}
                  className=""
                />
              </div>
              <p className="text-sm font-semibold leading-none">{ser?.title}</p>
            </div>
          );
        })}
      </div>

      <div className="w-full max-w-[841px] border-2 border-[#F40E00] rounded-[22px] p-6 lg:p-10 mx-auto mt-8">
        <h3 className="text-[22px] font-semibold">
          Here's who we typically work <span className="red-text">with:</span>
        </h3>

        <ul className="mt-5 space-y-2">
          {[
            "Teams of 10 to 200 people who need tools that actually keep up",
            "Businesses with real revenue who can't afford operational chaos at scale",
            "Anyone running their day-to-day across spreadsheets, WhatsApp, and three different apps",
            "Owners who've tried the standard tools and keep running into the same gaps",
            "The person who's been holding everything together manually and is ready to stop",
          ].map((wor, i) => {
            return (
              <li
                key={i}
                className="w-full flex items-center justify-start gap-2"
              >
                <Image
                  src={"/green-check-circle.png"}
                  alt="green-check-circle"
                  width={22}
                  height={22}
                  className="min-w-[22px]"
                />
                <span className="text-base lg:text-lg font-light text-[#909090]">
                  {wor}
                </span>
              </li>
            );
          })}
          <li></li>
        </ul>
      </div>

      <div className="w-full flex flex-col items-center gap-7 mt-8">
        <p className="text-[24px] font-normal leading-[1.4] text-center mx-auto max-w-[841px]">
          Not sure if this applies to your business? Book a Workflow Audit. If
          we're not the right fit, we'll tell you honestly and point you in the
          right direction.
        </p>

        <button
          type="button"
          onClick={openModal}
          className="red-bg hover:bg-[#000] transition-all duration-300 text-white rounded-[10px] w-full md:w-[275px] h-[56px] flex items-center justify-center text-lg font-medium"
        >
          See If You Qualify
        </button>
      </div>
    </section>
  );
};

export default WhoWeWorkWith;

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FiArrowRight } from "react-icons/fi";

const BuiltAroundYou = () => {
  return (
    <section className="bg-[#fff] padding-x py-24 selection:bg-red-100 selection:text-red-900 overflow-hidden">
      {/* Header Section */}
      <div className="mb-10 text-center">
        <p className="red-text font-medium tracking-widest uppercase text-lg md:text-xl lg:text-2xl xl:text-[32px] mb-5">
          Built Around You
        </p>
        <h2 className="text-4xl sm:text-6xl md:text-5xl lg:text-6xl xl:text-[72px] font-bold text-[#111111] tracking-tight lg:leading-[1]">
          Every Business Is Different. <br className="hidden lg:block" /> Your
          Platform Should Be
          <span className="text-[#ea2b2b]">Too.</span>
        </h2>

        <p className="text-gray-400 font-light leading-[1.2] text-lg md:text-xl xl:text-2xl md:max-w-[55%] mx-auto mt-5">
          Depending on where you are and what you need, your custom build might
          include some or all of the following.
        </p>
      </div>

      <div className="w-full">
        <div className="w-full flex items-center justify-center gap-4 flex-wrap">
          <div className="w-full lg:w-[59%] border border-[#EAEAEA] relative rounded-[24px] p-10 overflow-hidden">
            <Image
              src={"/red-glow.png"}
              alt="red-glow"
              width={384}
              height={384}
              className="absolute top-0 right-0 z-0"
            />
            <h3 className="font-medium text-[28px] leading-none relative z-10">
              Scheduling & Dispatch
            </h3>
            <p className="text-[#525252] lg:w-[70%] mt-4 leading-[1.3] relative z-10">
              Assign jobs, manage calendars, and coordinate field teams. All in
              one place, in real time.
            </p>

            <Image
              src={"/calendar-image.png"}
              alt="calendar-image"
              width={646}
              height={403}
              className="w-full object-contain mt-5 relative z-10"
            />
          </div>
          <div className="w-full lg:w-[39%]">
            <div className="w-full border border-[#EAEAEA] relative rounded-[24px] p-6 overflow-hidden">
              <h3 className="font-medium text-[20px] leading-none">
                Customer Management
              </h3>
              <p className="text-sm text-[#737373] leading-[1.2] mt-4">
                A full view of every customer including history, jobs,
                communications, and documents, without digging through inboxes
                or spreadsheets.
              </p>
              <Image
                src={"/customer-management-listing.png"}
                alt="customer-management-listing"
                width={454}
                height={170}
                className="w-full object-contain mt-2"
              />
            </div>

            <div className="w-full flex items-center justify-between gap-3 mt-4">
              <div className="w-full lg:w-[58%] min-h-[255px] lg:h-[279px] flex flex-col items-start justify-center border border-[#EAEAEA] relative rounded-[24px] p-4 md:p-6 overflow-hidden">
                <h3 className="font-medium text-[18px] leading-none">
                  Payments & Invoicing
                </h3>
                <p className="text-sm text-[#737373] leading-[1.2] mt-2">
                  Generate invoices, collect payments, and track what's
                  outstanding, all connected to the jobs and customers they
                  belong to.
                </p>
                <p className="text-xl md:text-2xl mt-2">$184,290</p>
                <p className="text-xs text-[#00BC7D] mt-2">+12% this week</p>
              </div>
              <div className="w-full lg:w-[39%] flex justify-end">
                <Image
                  src={"/operations-dashboard.png"}
                  alt="operations-dashboard"
                  width={192}
                  height={279}
                  className="w-full object-contain h-[279px] max-h-[279px]"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col lg:flex-row gap-4 mt-4">
          {/* card 1 */}
          <div className="w-full lg:w-[350px]">
            <div className="w-full flex flex-col items-start justify-center border border-[#EAEAEA] relative rounded-[24px] p-4 md:p-6 overflow-hidden">
              <h3 className="font-medium text-[17px] leading-none">
                Staff & Field Workflows
              </h3>
              <p className="text-sm text-[#737373] leading-[1.2] mt-2">
                Mobile-friendly tools your team actually uses in the field — job
                updates, checklists, sign-offs, and status tracking.
              </p>
              <Image
                src={"/box.png"}
                alt="box"
                width={135}
                height={201}
                className="mt-4"
              />
            </div>
          </div>
          <div className="w-full">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* card 2 */}
              <div className="w-full flex flex-col items-start justify-start border border-[#EAEAEA] relative rounded-[24px] p-4 md:p-6 overflow-hidden">
                <h3 className="font-medium text-[18px] leading-none">
                  Integrations & Unified Dashboards
                </h3>
                <p className="text-sm text-[#737373] leading-[1.2] mt-2">
                  Already using QuickBooks, HubSpot, or other tools? We can
                  connect them and surface everything in one place so nothing
                  falls through the cracks.
                </p>
                <div className="w-full grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 mt-5">
                  {["QuickBooks", "HubSpot", "Stripe", "Slack"].map((t, i) => {
                    return (
                      <div
                        className="bg-[#FAFAFA] hover:bg-red-50 hover:border-[#fe0400]/30 border-2 border-[#EAEAEA] w-full py-3 rounded-[10px] text-[10px] flex justify-center items-center transition-all duration-300"
                        key={i}
                      >
                        {t}
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* card 3 */}
              <div className="w-full flex flex-col items-start justify-start border border-[#EAEAEA] relative rounded-[24px] p-4 md:p-6 overflow-hidden">
                <h3 className="font-medium text-[18px] leading-none">
                  Custom Workflows
                </h3>
                <p className="text-sm text-[#737373] leading-[1.2] mt-2">
                  Approval chains, internal forms, automated notifications, role
                  - based access. whatever your team needs to stop relying on
                  calls and texts.
                </p>
              </div>
            </div>

            <div className="w-full mt-4 red-bg rounded-[24px] p-6 lg:h-[152px] flex items-center justify-between gap-6 flex-col lg:flex-row">
              <div className="">
                <p className="text-xl lg:text-[24px] font-semibold text-white leading-[1.3]">
                  Don't see exactly what you need? That's fine. We scope every
                  build around your workflow so book a call and we'll figure it
                  out together.
                </p>
              </div>
              <div className="w-full max-w-[280px]">
                <Link
                  href={"/contact-us"}
                  className="bg-white hover:bg-black hover:text-white transition-all duration-300 red-text rounded-[14px] flex items-center justify-center gap-2 px-5 py-4 text-lg font-medium"
                >
                  Book a Workflow Audit <FiArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuiltAroundYou;

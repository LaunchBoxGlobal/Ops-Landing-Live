import {
  ArrowRight,
  Target,
  Key,
  Users,
  Briefcase,
  Eye,
  Headphones,
} from "lucide-react";

const whyUsCards = [
  {
    icon: Target,
    title: "We Start With Your Workflow,\nNot a Template",
    desc: "Before we write a single line of code, we map how your business actually runs. Your platform is designed around your processes, not the other way around.",
  },
  {
    icon: Key,
    title: "You Own Everything",
    desc: "The code, the platform, the data. All yours. No vendor lock-in, no monthly SaaS fees to us, no dependency on a marketplace. You own what we build.",
  },
  {
    icon: Users,
    title: "One Team, Full Stack",
    desc: "Design, web, mobile, backend, integrations. All under one roof. No handoffs between agencies, no finger-pointing when something breaks.",
  },
  {
    icon: Briefcase,
    title: "We Build for Operators, Not Investors",
    desc: "We're not building you a pitch deck or an MVP to show VCs. We're building internal tools that real teams use every day to get work done.",
  },
  {
    icon: Eye,
    title: "Transparent From Day One",
    desc: "You'll know what's being built, when it's being built, and what it costs. Regular updates, working previews, and a dedicated point of contact throughout.",
  },
  {
    icon: Headphones,
    title: "We're Still Here After Launch",
    desc: "Launch is not the end. We support, maintain, and grow your platform as your business evolves. You're not handed off to a support ticket queue.",
  },
];

const WhyUs = () => {
  return (
    <section className="bg-[#F9F9F9] padding-x py-24 selection:bg-red-100 selection:text-red-900 overflow-hidden">
      {/* Header Section */}
      <div className="mb-10 text-start">
        <p className="red-text font-medium tracking-widest uppercase text-lg md:text-xl lg:text-2xl xl:text-[32px] mb-5">
          Why Us
        </p>
        <h2 className="text-4xl sm:text-6xl md:text-5xl lg:text-6xl xl:text-[72px] font-bold text-[#111111] tracking-tight lg:leading-[1]">
          A Lot of Agencies Can Build Software. Here's What Makes Us{" "}
          <span className="text-[#ea2b2b]">Different.</span>
        </h2>

        <p className="text-gray-400 font-light leading-[1.2] text-lg md:text-xl xl:text-2xl md:max-w-[75%] mt-5">
          We don't just write code. We understand how service businesses operate
          and we build software that reflects that.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {whyUsCards.map((card, idx) => (
          <div
            key={idx}
            className="bg-white rounded-[24px] p-8 lg:p-10 border-2 border-gray-100 flex flex-col transition-all duration-300 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] hover:-translate-y-1"
          >
            <div className="w-[52px] h-[52px] rounded-2xl bg-[#fcedec] flex items-center justify-center mb-8">
              <card.icon className="w-6 h-6 text-[#f02222] stroke-[2]" />
            </div>

            <h3 className="text-[#1a1a1a] font-bold text-[19px] sm:text-[20px] leading-[1.3] tracking-tight mb-4 whitespace-pre-line">
              {card.title}
            </h3>

            <p className="text-[#737373] text-[15px] sm:text-[16px] leading-[1.65]">
              {card.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyUs;

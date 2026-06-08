import ProblemCard from "./ProblemCard";

const problems = [
  "Your scheduling lives in a spreadsheet. Or someone’s head.",
  "Staff coordination happens over calls, texts, and WhatsApp group chats.",
  "Customer records are scattered across three different tools and a notes app.",
  "You can’t see what’s happening in the field without calling someone.",
  "Invoices, job updates, and payments are all handled in different places.",
  "You bought SaaS tools that almost fit. But not quite.",
  "Your team has built workarounds for the workarounds.",
  "You’re spending more time managing the chaos than running the business.",
  "There’s no single place to see how your business is actually performing. You’re pulling numbers from three tools just to answer a basic question.",
];

const BusinessProblems = () => {
  return (
    <section
      aria-labelledby="business-growth-heading"
      className="bg-[#fff] py-16 lg:py-24 padding-x"
    >
      <div className="mx-auto w-full">
        <div className="grid lg:grid-cols-[1.5fr_0.8fr] gap-8 lg:gap-12 items-start">
          <div>
            <h2
              id="business-growth-heading"
              className="font-bold text-black lg:leading-[1] tracking-[-0.03em]
              text-[42px]
              md:text-[58px]
              lg:text-[72px]"
            >
              Your Business Is Growing.
              <br />
              Your Systems <span className="text-[#FF1E0D]">Are Not.</span>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-[#9B9B9B] text-lg lg:text-[24px] leading-[1.4] font-light">
              Most service businesses hit a point where the tools that got them
              here start holding them back. Here's what that usually looks like.
            </p>
          </div>
        </div>

        <div className="mt-10 lg:mt-14">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {problems.map((problem, index) => (
              <ProblemCard
                key={index}
                description={problem}
                highlighted={index === 0}
              />
            ))}
          </div>

          <p className="mt-6 text-sm md:text-base italic text-black">
            If two or more of these sound like your business,{" "}
            <span className="text-[#FF1E0D] font-semibold">
              you're exactly who we built this for.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default BusinessProblems;

import { useState } from "react";
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

const BusinessProblems = ({ openModal }) => {
  const [selected, setSelected] = useState([]);

  const toggleProblem = (index) => {
    setSelected((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const totalProblems = problems.length;
  const selectedCount = selected.length;
  const score = Math.round((selectedCount / totalProblems) * 100);

  const isQualified = score >= 70;

  const getHelperText = () => {
    if (selectedCount === 0) {
      return (
        <p className="text-sm md:text-base italic text-black">
          If two or more of these sound like your business,{" "}
          <span className="text-[#FF1E0D] font-semibold">
            you're exactly who we built this for.
          </span>{" "}
          Select the challenges that sound familiar to you.
        </p>
      );
    }

    if (selectedCount >= 1) {
      return (
        <p className="text-sm md:text-base italic text-black">
          Keep going! Select all that apply.
        </p>
      );
    }

    return (
      <p className="text-sm md:text-base italic text-black">
        Select the challenges that sound familiar to you.
      </p>
    );
  };

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
                selected={selected.includes(index)}
                onClick={() => toggleProblem(index)}
              />
            ))}
          </div>

          <div className="w-full bg-red-50 rounded-xl p-5 mt-5">
            {!isQualified ? (
              <div className="flex flex-wrap items-center justify-between gap-4">
                {getHelperText()}

                {selectedCount > 0 && (
                  <div className="flex items-center gap-3">
                    <div className="w-[180px] h-2 bg-red-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#F40E00]"
                        style={{ width: `${score}%` }}
                      />
                    </div>

                    <span className="font-semibold text-[#F40E00]">
                      {score}%
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
                <div className="flex items-start lg:items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center shrink-0">
                    ✓
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg text-black">
                      You have identified {selectedCount} key challenges.
                    </h3>

                    <p className="text-[#666]">
                      You're likely losing time and money to disconnected
                      systems.
                    </p>

                    {/* <div className="w-full max-w-[300px] h-2 bg-green-100 rounded-full mt-3 overflow-hidden">
                      <div
                        className="h-full bg-green-500"
                        style={{ width: `${score}%` }}
                      />
                    </div> */}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={openModal}
                  className="bg-[#F40E00] hover:bg-[#000] text-white px-6 py-3 rounded-lg font-medium transition-all duration-300"
                >
                  Book a Workflow Audit
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessProblems;

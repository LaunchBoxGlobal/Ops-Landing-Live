import Image from "next/image";
import React from "react";

const ProcessCard = ({ process, index }) => {
  return (
    <div className="w-full border-2 border-[#F40E004D] rounded-[24px] p-5 flex flex-col items-start gap-3 relative group overflow-hidden">
      <div className="w-full flex items-center justify-between gap-4 relative z-10">
        <div className="w-[44px] h-[44px] rounded-[12px] flex items-center justify-center bg-[#F40E001A] group-hover:bg-[#f40e00] border-2 border-[#F40E0033]">
          <Image
            src={process?.icon}
            alt={process?.alt}
            width={process?.width}
            height={process?.height}
            className="
    transition-all
    duration-300
    group-hover:brightness-0
    group-hover:invert
  "
          />
        </div>

        <span className="text-[#A1A1A1] text-[10px] relative z-10">
          0{index + 1}
        </span>
      </div>
      <h3
        className={`relative z-10 ${index === 0 ? "text-[24px] font-bold" : "text-lg font-medium leading-none"}`}
      >
        {process?.title}
      </h3>
      <p
        className={`relative z-10 text-[#737373] ${index === 0 ? "text-[16px] font-medium" : "text-sm"}`}
      >
        {process?.description}
      </p>

      <div
        className={`w-[300px] h-[300px] rounded-full bg-[#f40e00] absolute z-0 ${index === 0 ? "top-[-80%] right-[-40%]" : "top-[-100%] right-[-100%]"} blur-[200px] invisible group-hover:visible transition-all duration-300`}
      />
    </div>
  );
};

export default ProcessCard;

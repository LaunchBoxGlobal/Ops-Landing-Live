import Image from "next/image";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck } from "react-icons/fa6";

const ProblemCard = ({ description, selected, onClick }) => {
  return (
    <article
      onClick={onClick}
      className={`relative overflow-hidden rounded-[24px] border p-6 min-h-[180px] transition-all duration-300 cursor-pointer group ${selected ? "border-[#F40E00] bg-[#f40e00]/10" : "border-[#ECECEC] hover:border-[#F40E004D] bg-white hover:bg-red-50/80"}`}
    >
      {/* Default image */}
      <Image
        src="/problem-card-image.svg"
        alt="problem icon image"
        width={133}
        height={159}
        loading="lazy"
        className={`absolute right-0 inset-y-0 h-full w-auto ${selected ? "opacity-0" : "opacity-25 group-hover:opacity-0 z-0 transition-opacity"} duration-300`}
      />

      {/* Hover image */}
      <Image
        src="/problem-card-image-red.svg"
        alt=""
        width={133}
        height={159}
        className={`absolute right-0 inset-y-0 h-full w-auto ${selected ? "opacity-100" : "opacity-0 z-0 transition-opacity group-hover:opacity-25"} duration-300`}
      />

      <div
        className={`relative z-10 w-[40px] h-[40px] rounded-[14px] flex items-center justify-center mb-6 transition-all duration-300 ${selected ? "bg-[#F40E00] text-white" : "bg-[#FEF2F2] group-hover:bg-[#F40E00]"}`}
      >
        {selected ? (
          <FaCheck
            size={18}
            className={`${selected ? "text-white" : "text-[#F40E00] group-hover:text-white"} transition-all duration-300`}
          />
        ) : (
          <HiOutlineExclamationCircle
            size={20}
            className={`${selected ? "text-white" : "text-[#F40E00] group-hover:text-white"} transition-all duration-300`}
          />
        )}
      </div>

      <p className="relative z-10 text-[#333333] text-base leading-relaxed">
        {description}
      </p>
    </article>
  );
};

export default ProblemCard;

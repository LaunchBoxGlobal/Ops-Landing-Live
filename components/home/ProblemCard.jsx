import Image from "next/image";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck } from "react-icons/fa6";

const ProblemCard = ({ description, selected, onClick }) => {
  return (
    <article
      onClick={onClick}
      className={`relative overflow-hidden rounded-[24px] border bg-white p-6 min-h-[180px] transition-all duration-300 cursor-pointer group ${selected ? "border-[#F40E00] bg-red-50" : "border-[#ECECEC] hover:border-[#F40E004D] hover:bg-red-50/30"}`}
    >
      {/* checkmark */}
      {/* {selected && (
        <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">
          ✓
        </div>
      )} */}
      {/* Default image */}
      <Image
        src="/problem-card-image.svg"
        alt="problem icon image"
        width={133}
        height={159}
        loading="lazy"
        className="absolute right-0 inset-y-0 h-full w-auto opacity-25 z-0 transition-opacity duration-300 group-hover:opacity-0"
      />

      {/* Hover image */}
      <Image
        src="/problem-card-image-red.svg"
        alt=""
        width={133}
        height={159}
        className="absolute right-0 inset-y-0 h-full w-auto opacity-0 z-0 transition-opacity duration-300 group-hover:opacity-25"
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

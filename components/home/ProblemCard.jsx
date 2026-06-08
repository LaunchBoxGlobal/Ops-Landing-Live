import Image from "next/image";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const ProblemCard = ({ description }) => {
  return (
    <article className="relative overflow-hidden rounded-[24px] border border-[#ECECEC] bg-white p-6 min-h-[180px] transition-all duration-300 group hover:border-[#F40E004D] business-card">
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

      <div className="relative z-10 w-[40px] h-[40px] rounded-[14px] flex items-center justify-center mb-6 bg-[#FEF2F2] group-hover:bg-[#F40E00] transition-all duration-300">
        <HiOutlineExclamationCircle
          size={20}
          className="text-[#F40E00] group-hover:text-white transition-all duration-300"
        />
      </div>

      <p className="relative z-10 text-[#333333] text-base leading-relaxed">
        {description}
      </p>
    </article>
  );
};

export default ProblemCard;

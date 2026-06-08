import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { IoClose } from "react-icons/io5";

const Sidebar = ({ onclose }) => {
  const navigate = useRouter();

  const handleNavigate = (url) => {
    navigate.push(url);
    toggleDropdown();
    onclose();
  };

  const handleScrollToServices = (id) => {
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: "smooth" });
    onclose();
  };

  return (
    <div
      className={`w-full md:w-1/2 lg:w-[35%] h-full bg-white px-6 float-end shadow-xl overflow-y-scroll`}
    >
      <div className="w-full flex items-start justify-center">
        <Link
          href={"/"}
          className="rounded-[17px] bg-white block mt-1 w-full border-[#CECEEA] h-[50px] 2xl:h-[60px]"
        >
          <Image
            src={`/logo02.png`}
            width={180}
            height={45.73}
            alt="launchbox global logo"
            className="w-[188px] h-[35px] block"
          />
        </Link>
        <button
          type="button"
          onClick={() => onclose()}
          className="w-8 h-8 bg-gray-200 rounded-lg p-1 mt-1.5"
        >
          <IoClose className="w-full h-full red-text" />
        </button>
      </div>
      <ul className="flex border-t flex-col items-start w-full justify-center gap-2 py-5">
        <li>
          <button
            type="button"
            onClick={() => handleScrollToServices("how-it-works")}
            className={`font-normal text-[16px] 2xl:text-[22px] flex items-center justify-start gap-1 group`}
          >
            How It works
          </button>
        </li>

        <li>
          <button
            type="button"
            onClick={() => handleScrollToServices("who-we-work-with")}
            className={`font-normal text-[16px] 2xl:text-[22px] flex items-center justify-start gap-1 group`}
          >
            Who It's For
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() => handleScrollToServices("faqs")}
            className={`font-normal text-[16px] 2xl:text-[22px] flex items-center justify-start gap-1 group`}
          >
            FAQs
          </button>
        </li>

        <li>
          <button
            type="button"
            onClick={() =>
              handleNavigate("https://www.launchboxglobal.com/case-studies")
            }
            className={`font-normal text-[16px] 2xl:text-[22px]`}
          >
            Case Studies
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

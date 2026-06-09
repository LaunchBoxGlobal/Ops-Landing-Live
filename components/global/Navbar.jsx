"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { TbMenu2 } from "react-icons/tb";
import Sidebar from "./Sidebar";
import { usePathname, useRouter } from "next/navigation";
import { IoIosArrowDown } from "react-icons/io";
import { motion } from "framer-motion";

const Navbar = ({ openModal }) => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [industriesDropdown, setIndustriesDropdown] = useState(false);

  const pathname = usePathname();

  const isCareerPage =
    pathname === "/careers" ||
    /^\/careers\/[^/]+$/.test(pathname) ||
    /^\/careers\/[^/]+\/apply$/.test(pathname);

  const toggleIndustriesDropdown = () => {
    setIndustriesDropdown((prev) => !prev);
  };

  const toggleSidebar = () => {
    setOpenSidebar((prev) => !prev);
  };

  return (
    <nav
      className={`py-3 md:py-7 flex items-center justify-between gap-2 fixed top-0 z-50 w-full padding-x bg-white lg:bg-transparent shadow-md lg:shadow-none`}
    >
      <Link
        href={"/"}
        className="rounded-[17px] bg-white lg:border border-[#CECEEA] outline-none h-[57px] 2xl:h-[62px] flex items-center justify-center gap-3 lg:px-2.5 xl:px-3.5"
      >
        <Image
          src={`/new-logo.svg`}
          width={180}
          height={45}
          alt="launchbox global logo"
          className="block"
        />

        <div className="border border-[#CECEEA] w-[0.5px] h-[27px] opacity-50 hidden lg:block" />
        <span className="text-xs font-light leading-none xl:leading-[14px] hidden lg:block">
          <strong>
            Trusted Talent, <br /> Anywhere, Anytime.
          </strong>
        </span>
      </Link>

      <ul className="hidden lglg:flex items-center justify-center gap-5 xl:gap-x-5 mac:gap-x-10 2xl:gap-7 bg-[#fff] px-8 rounded-[17px] border border-[#CECEEA] h-[57px] 2xl:h-[62px]">
        <li>
          <a
            href={`#how-it-works`}
            className={`font-normal text-sm xl:text-[17px] 2xl:text-[22px] flex items-center justify-start gap-1 group`}
          >
            How It works
          </a>
        </li>

        {/* services dropdown */}
        <li className="z-50 h-full flex items-center">
          <a
            href={`#who-we-work-with`}
            className={`font-normal text-sm xl:text-[17px] 2xl:text-[22px] flex items-center justify-start gap-1 group`}
          >
            Who It's For
          </a>
        </li>

        <li>
          <a
            href={`#faqs`}
            className={`font-normal text-sm xl:text-[17px] 2xl:text-[22px] flex items-center justify-start gap-1 group whitespace-nowrap`}
          >
            FAQs
          </a>
        </li>
        <li>
          <Link
            href={`https://www.launchboxglobal.com/case-studies`}
            target="_blank"
            className={`font-normal text-sm xl:text-[17px] 2xl:text-[22px] flex items-center justify-start gap-1 group`}
          >
            Case Studies
          </Link>
        </li>
      </ul>

      <div className="hidden w-auto lglg:inline-flex items-center justify-end gap-1 bg-[#fff] pr-1 pl-2 rounded-[17px] border border-[#CECEEA] h-[57px] 2xl:h-[62px] py-1">
        <button
          type="button"
          onClick={openModal}
          className="bg-white px-3 h-full rounded-[11px] whitespace-nowrap text-black transition-all duration-300 flex items-center justify-center font-medium"
        >
          Get in Touch
        </button>
        <button
          type="button"
          onClick={openModal}
          className="red-bg px-3 h-full rounded-[11px] whitespace-nowrap text-white hover:bg-black transition-all duration-300 flex items-center justify-center font-medium"
        >
          Book a Workflow Audit
        </button>
      </div>

      <button
        type="button"
        name="sidebar menu button"
        aria-expanded={openSidebar}
        aria-label={openSidebar ? "Close mobile menu" : "Open mobile menu"}
        onClick={toggleSidebar}
        className="lglg:hidden mr-1"
      >
        <TbMenu2 className="text-2xl text-[#F40E00]" aria-hidden="true" />
      </button>
      <div
        className={`w-full h-screen bg-transparent z-50 fixed inset-0 ${
          openSidebar ? "-translate-x-0" : "translate-x-full"
        } transition-all duration-700 pt-3 bg-transparent`}
      >
        <Sidebar onclose={toggleSidebar} />
      </div>
    </nav>
  );
};

export default Navbar;

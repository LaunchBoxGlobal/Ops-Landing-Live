"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import "./styles.modules.css";

const Graph = () => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: -100,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        duration: 1,
        delay: 1.3,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="w-[262px] h-[228px] hidden lg:block rounded-[24px] border-[10px] border-[#FFFFFF3D] z-20 absolute bottom-[5%] left-[10%] custom-shadow"
    >
      <div className="w-full h-full bg-white rounded-[16px] p-4">
        <div className="w-full flex items-center justify-between gap-4">
          <p className="text-sm font-semibold leading-none">Based Instagram</p>

          <div className="flex items-center justify-end gap-2">
            <Image
              src="/home/grid-icon.png"
              alt="grid-icon"
              width={27}
              height={27}
              className="object-contain"
            />

            <Image
              src="/home/download-icon.png"
              alt="download-icon"
              width={27}
              height={27}
              className="object-contain"
            />
          </div>
        </div>

        {/* Progress Circle */}
        <div className="w-full my-4 flex justify-center">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{
              rotate: [0, -90, 0],
            }}
            transition={{
              duration: 2.5,
              ease: "easeInOut",
            }}
          >
            <Image
              src="/home/progress-bar.png"
              alt="progress-bar"
              width={103}
              height={103}
              className="object-contain"
            />
          </motion.div>
        </div>

        {/* Slider */}
        <div className="w-full flex items-center justify-center relative">
          <div className="w-[179px] h-[9px] bg-[#F40E0033] rounded-[18px] relative overflow-visible">
            <div className="slider-dot w-[23px] h-[23px] rounded-full red-bg absolute top-1/2">
              <div className="w-[70%] h-[70%] border border-white rounded-full absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"></div>
              <div className="w-[20%] h-[20%] bg-white border border-white rounded-full absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Graph;

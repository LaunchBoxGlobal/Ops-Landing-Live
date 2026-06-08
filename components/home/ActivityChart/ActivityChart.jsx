"use client";

import React from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import "./styles.modules.css";
import { motion } from "framer-motion";

const ActivityChart = () => {
  const data = [
    { label: "M", active: 245, total: 295 },
    { label: "T", active: 80, total: 110 },
    { label: "W", active: 160, total: 230 },
    { label: "T", active: 35, total: 230 },
    { label: "F", active: 90, total: 150 },
    { label: "S", active: 50, total: 110 },
    { label: "S", active: 165, total: 230 },
  ];

  const yAxis = [300, 200, 100, 0];

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
      className="w-[266px] h-[215px] hidden lg:block bg-white rounded-[23px] absolute top-[20%] left-[2%] z-20 px-8 py-8 custom-shadow"
    >
      <div className="w-full flex items-center justify-between gap-4">
        <p className="text-sm font-semibold leading-none">Users Activity</p>

        <div className="flex items-center justify-end">
          <p className="text-[#9197A0] text-xs">This Week</p>
          <IoMdArrowDropdown className="text-[#9197A0]" size={19} />
        </div>
      </div>

      <div className="flex">
        {/* Y Axis */}
        <div className="relative w-[25px] shrink-0 mr-1 mt-5">
          {yAxis.map((val, i) => (
            <span
              key={val}
              className="absolute left-0 w-full text-left text-[#a1aab6] font-medium text-[9px]"
              style={{
                top: `${i * 33.233}%`,
                transform: "translateY(-50%)",
              }}
            >
              {val}
            </span>
          ))}
        </div>

        {/* Chart */}
        <div className="relative flex-1 h-[90px] mt-5">
          {yAxis.map((val, i) => (
            <div
              key={`line-${val}`}
              className="absolute w-full h-[3px] bg-[#f2f4f6]"
              style={{
                top: `${i * 33.333}%`,
                transform: "translateY(-50%)",
                borderRadius: "4px",
              }}
            />
          ))}

          <div className="absolute inset-0 flex justify-between px-3 items-end">
            {data.map((item, idx) => (
              <div
                key={idx}
                className="relative w-[7px] h-full flex flex-col justify-end items-center"
              >
                <div className="relative w-full h-full">
                  {/* Static background bar */}
                  <div
                    className="absolute bottom-1.5 w-full bg-[#ffcebf] rounded-t-full z-0 translate-y-[7.5px]"
                    style={{
                      height: `${(item.total / 300) * 100}%`,
                    }}
                  />

                  {/* Animated foreground bar */}
                  <div
                    className="activity-bar absolute bottom-1.5 w-full bg-[#fa1800] rounded-t-full z-10 translate-y-[7.5px]"
                    style={{
                      height: `${(item.active / 300) * 100}%`,
                      animationDelay: `${idx * 0.35}s`,
                    }}
                  />
                </div>

                <span className="absolute -bottom-[28px] text-[#a1aab6] font-medium text-[9px]">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ActivityChart;

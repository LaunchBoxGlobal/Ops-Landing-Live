"use client";
import Image from "next/image";
import React from "react";
import ActivityChart from "./ActivityChart/ActivityChart";
import Graph from "./Graph/Graph";
import { motion } from "framer-motion";

const HeroAnimation = () => {
  return (
    <div className="w-full max-w-[1440px] mx-auto relative flex flex-col items-center justify-center py-6 lg:py-20 px-6">
      {/* red-background-glow */}
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.96,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 1.2,
          ease: "easeOut",
        }}
      >
        <Image
          src={"/home/red-background-glow.png"}
          alt="red-background-glow"
          width={1246}
          height={446}
          className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z0"
        />
      </motion.div>

      {/* bar chart */}
      <ActivityChart />

      {/* circle graph */}
      <Graph />

      {/* dashboard screen */}
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.96,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 1,
          ease: "easeOut",
        }}
        className="relative z-10"
      >
        <Image
          src="/home/dashboard-mockup.png"
          alt="dashboard-screen-mockup"
          width={834}
          height={520}
          loading="eager"
          className="object-contain lg:w-[90%] xl:w-auto mx-auto"
        />
      </motion.div>

      {/* Overview Chart */}
      <motion.div
        initial={{
          opacity: 0,
          x: 100,
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
        className="absolute z-20 bottom-[29%] right-[3%] hidden lg:block"
      >
        <Image
          src="/home/overview--line-graph.png"
          alt="overview--line-graph"
          width={317}
          height={231}
          className="object-contain"
        />
      </motion.div>
    </div>
  );
};

export default HeroAnimation;

"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { FaLeaf, FaGlobeAmericas, FaTree, FaWater, FaSeedling } from "react-icons/fa";

// Ganti daftar partner dengan yayasan/organisasi lingkungan terkenal
const names = [
  { name: "WWF International", icon: <FaGlobeAmericas /> },
  { name: "Greenpeace", icon: <FaLeaf /> },
  { name: "Yayasan Kehati", icon: <FaTree /> },
  { name: "WALHI Indonesia", icon: <FaWater /> },
  { name: "Friends of the Earth", icon: <FaSeedling /> },
];

const Patner: React.FC = () => {
  const repeatedNames = [...names, ...names];

  return (
    <div className="relative py-20 bg-[#80cff9] overflow-hidden px-6 sm:px-10 md:px-24 lg:px-44">
      {/* Blur kiri & kanan responsif */}
      <div className="absolute top-0 left-0 sm:left-10 md:left-24 lg:left-44 w-16 sm:w-24 md:w-32 h-full bg-gradient-to-r from-[#80cff9] to-transparent pointer-events-none z-20" />
      <div className="absolute top-0 right-0 sm:right-10 md:right-24 lg:right-44 w-16 sm:w-24 md:w-32 h-full bg-gradient-to-l from-[#80cff9] to-transparent pointer-events-none z-20" />

      {/* Judul */}
      <div className="text-lg sm:text-xl font-medium text-center pb-10 z-10 relative">
        Partner Sponsor
      </div>

      {/* Animasi partner berjalan */}
      <div className="overflow-hidden relative">
        <motion.div
          className="flex w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 35,
            ease: "linear",
          }}
        >
          {[...repeatedNames, ...repeatedNames].map((item, index) => (
            <Card
              key={index}
              className="min-w-[90px] sm:min-w-[120px] h-16 sm:h-20 flex items-center justify-center border mx-2 sm:mx-3 rounded-2 bg-[#1ca7ec] backdrop-blur-md border-[#077fc2] text-[#e1f1fd]"
            >
              <CardContent className="flex items-center justify-center w-full h-full px-4 gap-2">
                <span className="text-lg sm:text-xl">{item.icon}</span>
                <span className="text-center font-semibold text-sm sm:text-base">
                  {item.name}
                </span>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Patner;

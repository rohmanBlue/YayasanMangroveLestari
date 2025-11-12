"use client";

import React from "react";
import { Poppins } from "next/font/google";

// Import font Poppins
const poppins = Poppins({
  subsets: ["latin"],
  weight: [
    "100","200","300","400","500","600","700","800","900"
  ],
});

const Footer: React.FC = () => {
  return (
    <footer className={`${poppins.className} flex flex-col items-center w-full pt-10 bg-[#80cff9] text-[#0a2e47]`}>
      
      {/* Logo / SVG */}
      <div className="text-4xl font-medium tracking-tight">YML.NET</div>

     
      { /* Social Icons */ } 
      <div className="flex items-center gap-4 mt-4">
        {/* Contoh icon Facebook */}
        <a href="#" className="hover:-translate-y-0.5 transition-all duration-300">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" stroke="#0a2e47" strokeOpacity={0.5} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>

        {/* Instagram */}
        <a href="#" className="hover:-translate-y-0.5 transition-all duration-300">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 2H7a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5" stroke="#0a2e47" strokeOpacity={0.5} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16 11.37a4 4 0 1 1-7.914 1.173A4 4 0 0 1 16 11.37m1.5-4.87h.01" stroke="#0a2e47" strokeOpacity={0.5} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>

        {/* LinkedIn */}
        <a href="#" className="hover:-translate-y-0.5 transition-all duration-300">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6M6 9H2v12h4zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4" stroke="#0a2e47" strokeOpacity={0.5} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>

        {/* Twitter */}
        <a href="#" className="hover:-translate-y-0.5 transition-all duration-300">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2" stroke="#0a2e47" strokeOpacity={0.5} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
      <p className="mt-4 text-center text-[#0a2e47] text-sm font-sans font-medium">
        Copyright©2025 Custom template Of Yayasan mangrove lestari. Info Semua ini dilindungi oleh hukum dan hak kepemilikkan
      </p>
    </footer>
  );
};

export default Footer;

"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
// import { useRouter } from "next/navigation";
import { CButton } from "@coreui/react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  // const router = useRouter();

  const goHome = () => { window.location.assign("href://yml.com") }
  const goId = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#0a2e47]/40 text-[#f0f9ff] backdrop-blur-md border-b border-[#e1f1fd]/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 sm:px-10 md:px-16 lg:px-20 py-3">
        {/* Logo */}
        <div
          onClick={()=>{goHome()}}
          className="text-2xl sm:text-3xl font-semibold cursor-pointer tracking-tight px-4"
        >
          YML.NET
        </div>

        {/* Menu Desktop */}
        <div className="hidden md:flex items-center gap-10 text-lg font-light">
          <button onClick={()=>goId("Home")} className="hover:text-blue-400 transition">
            Home
          </button>
          <button onClick={()=>{goId("About")}} className="hover:text-blue-400 transition">
            Tentang Kita
          </button>
          <button onClick={()=>{goId("YouTube")}} className="hover:text-blue-400 transition">
            YouTube
          </button>
          <button onClick={()=>{goId("Contact")}} className="hover:text-blue-400 transition">
            Kontak
          </button>
        </div>

        {/* Tombol Google Map */}
        <div className="hidden md:block">
          <CButton
            color="light"
            variant="outline"
            className="text-[#e1f1fd] border border-[#e1f1fd] rounded-full px-4 py-1 hover:bg-[#e1f1fd] hover:text-[#0a2e47] transition"
          >
            Google Map →
          </CButton>
        </div>

        {/* Tombol Menu (Mobile) */}
        <button
          className="md:hidden text-[#f0f9ff]"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Menu Mobile */}
      {open && (
        <div className="md:hidden flex flex-col items-center bg-[#0a2e47]/10 backdrop-blur-md border-t border-[#e1f1fd]/10 py-4 space-y-4 text-lg">
          <button
            onClick={()=>{goId("Home")}} 
            className="w-full text-center py-2 hover:bg-[#1a4566]/40 transition"
          >
            Home
          </button>
          <button
            onClick={()=>{goId("About")}} 
            className="w-full text-center py-2 hover:bg-[#1a4566]/40 transition"
          >
            Tentang kita
          </button>
          <button
            onClick={()=>{goId("YouTube")}} 
            className="w-full text-center py-2 hover:bg-[#1a4566]/40 transition"
          >
            YoutTube
          </button>
          <button
            onClick={()=>{goId("Contact")}}  
            className="w-full text-center py-2 hover:bg-[#1a4566]/40 transition"
          >
            Kontak 
          </button>
          <CButton
            color="light"
            variant="outline"
            className="text-[#e1f1fd] border border-[#e1f1fd]/40 rounded-full px-4 py-2 mt-1 hover:bg-[#e1f1fd] hover:text-[#0a2e47] transition"
          >
            Google Map →
          </CButton>
        </div>
      )}
    </nav>
  );
}

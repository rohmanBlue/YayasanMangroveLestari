"use client";

import React, { ReactNode } from "react";
import Navbar from "./navbar";
import About from "./visi&misi";
import Patner from "./patner";
import NewsPage from "./youtube";
import ContactForm from "./email";
import Footer from "./footer";
import NewsSosmed from "./sosmed";
import CookieUI from "./cookie";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div>
         <Navbar />
        
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-zinc-900 text-gray-900 dark:text-white mt-0">
      {/* Navbar */}
     

      {/* Content Area */}
      <main className="flex-1 w-full mx-auto">
        {children}
      </main>

      
      <Patner />
      <About />
      <NewsPage />
      {/* <NewsSosmed /> */}
    <ContactForm />
    <CookieUI />
    <Footer />

      {/* Optional Footer */}
     
    </div> </div>
  );
};

export default AppLayout;

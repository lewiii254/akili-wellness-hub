
import React, { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ChatBot from "./ChatBot";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow pt-16">
        {children}
      </main>
      <Footer />
      <ChatBot />
    </div>
    </>
  );
};

export default Layout;

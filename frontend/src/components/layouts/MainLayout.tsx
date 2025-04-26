import React from "react";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";

interface MainLayoutProps {
  children: React.ReactNode;
  showFooter?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  showFooter = true 
}) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
};

export default MainLayout;
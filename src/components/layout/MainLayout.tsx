import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { useEffect, useState } from "react";
import FromTop from "../helpingCompo/FromTop";
import Footer from "../shared/Footer";
import { ArrowUpOutlined } from "@ant-design/icons";

const MainLayout = () => {
  const [isScreenTop, setIsScreenTop] = useState(true);
  const isHomepage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 500) {
        setIsScreenTop(true);
      } else {
        setIsScreenTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="bg-gradient-to-r from-slate-900 to-[#0f172a] text-white">
      <Navbar />

      <div className="min-h-[80vh]">
        <FromTop>
          <Outlet />
        </FromTop>
      </div>

      <Footer />

      {/* Top to bottom button */}
      {isHomepage && (
        <span
          className={`h-10 w-10 text-white bg-primary flex items-center justify-center text-2xl rounded-full my-shadow-1 transition-all duration-500 ease-in-out cursor-pointer fixed right-2 md:right-4 bottom-2 md:bottom-4 ${
            !isScreenTop
              ? "translate-x-0 opacity-100 hover:opacity-50 scale-[1.02] visible"
              : "translate-x-5 opacity-0 invisible"
          }`}
          onClick={handleToTop}
        >
          <ArrowUpOutlined className="!text-[16px]" />
        </span>
      )}
    </div>
  );
};

export default MainLayout;

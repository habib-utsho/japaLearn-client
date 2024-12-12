import { Link } from "react-router-dom";
import footerBg from "../../assets/img/footer-bg.png";
import logo from "../../assets/img/logo.png";

import {
  FacebookFilled,
  GithubFilled,
  TwitterCircleFilled,
} from "@ant-design/icons";
import MyMotion from "../helpingCompo/MyMotion";
import Container from "../ui/Container";

const footerLinks = {
  important: [
    { path: "/", label: "Home" },
    { path: "/services", label: "Services" },
    { path: "/services", label: "Booking" },
    { path: "/services", label: "Slots" },
    { path: "/services", label: "Upcoming booking" },
  ],
  about: [
    { path: "/services", label: "About us" },
    { path: "/services", label: "Meet our hero" },
    { path: "/services", label: "Provide service" },
    { path: "/services", label: "Booking" },
  ],
  legal: [
    { path: "/", label: "Terms of use" },
    { path: "/", label: "Privacy policy" },
  ],
  support: [
    { path: "/", label: "Contact" },
    { path: "/", label: "FAQ" },
  ],
};

const socialLinks = [
  { url: "/", icon: <FacebookFilled /> },
  { url: "/", icon: <TwitterCircleFilled /> },
  { url: "/", icon: <GithubFilled /> },
];

const Footer = () => {
  return (
    <footer
      className="bg-center bg-cover bg-blend-overlay bg-slate-900 bg-fixed"
      style={{ backgroundImage: `url(${footerBg})` }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 max-w-7xl mx-10 xl:mx-auto py-24 text-white">
        {/* Important Links Section */}
        <div className="flex justify-between col-span-3">
          <ul className="space-y-3">
            <span className="font-semibold">Important Links</span>
            {footerLinks.important.map((link) => (
              <li key={link.label}>
                <Link
                  className="text-gray text-sm hover:text-primary transition"
                  to={link.path}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          {/* About Section */}
          <ul className="space-y-3">
            <span className="font-semibold">About</span>
            {footerLinks.about.map((link) => (
              <li key={link.label}>
                <Link
                  className="text-gray text-sm hover:text-primary transition"
                  to={link.path}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Logo and Academy Info Section */}
        <div className="col-span-6 flex justify-center items-center">
          <MyMotion y={-100}>
            <div className="rounded-full h-64 w-64 flex flex-col justify-center items-center space-y-4 bg-secondary bg-opacity-25">
              <img
                src={logo}
                className="h-12 w-12 rounded-full"
                alt="WizCraft Academy Logo"
              />
              <h2 className="font-bold text-2xl">Japalearn</h2>
              <div className="relative">
                <p className="font-bold pb-2">Established . 2021</p>
                <div className="h-0.5 w-10 bg-primary absolute top-full left-0 right-0 mx-auto"></div>
              </div>
              {/* Social Links Section */}
              <ul className="flex gap-2 text-xl">
                {socialLinks.map((social, index) => (
                  <li key={index}>
                    <Link
                      to={social.url}
                      className="rounded-full h-10 w-10 border border-primary flex justify-center items-center"
                    >
                      {social.icon}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </MyMotion>
        </div>

        {/* support Section */}
        <div className="col-span-3">
          <ul className="space-y-3">
            <span className="font-semibold">Support</span>
            {footerLinks.support.map((link) => (
              <li key={link.label}>
                <Link
                  className="text-gray text-sm hover:text-primary transition"
                  to={link.path}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="border-t border-t-slate-800">
        <Container>
          <div className="text-center  text-slate-300 flex justify-between flex-wrap gap-4 items-center">
            <ul className=" flex gap-2 flex-wrap items-center mb-0">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    className="text-gray text-sm hover:text-primary transition inline-block"
                    to={link.path}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="py-6 font-bold !mb-0">
              Copyright © {new Date().getFullYear()} - All rights reserved by{" "}
              <span className="text-primary text-lg">Cleanify</span>
            </p>
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;

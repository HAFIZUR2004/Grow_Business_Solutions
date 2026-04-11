"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Services", path: "/services" },
    { name: "Projects", path: "/projects" },
    { name: "About", path: "/about" },
    { name: "Career", path: "/CareerPage" },
    { name: "Contact", path: "/ContactUs" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-[#0b0c18]/80 backdrop-blur-xl z-50 border-b border-white/5">
      <div className="flex justify-between items-center py-6 max-w-screen-2xl mx-auto">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-11 h-11 bg-white rounded-xl p-1 transition-all duration-500 group-hover:scale-105 shadow-lg shadow-secondary/10">
            <Image
              src="https://i.postimg.cc/yYds37Q3/logo-preview.png"
              alt="Logo"
              fill
              unoptimized
              className="object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black italic text-white leading-none">
              GROW
            </span>
            <span className="text-[9px] font-mono text-secondary font-bold uppercase tracking-[0.3em]">
              Business Solutions
            </span>
          </div>
        </Link>

        {/* Links */}
        <div className="hidden md:flex gap-10 font-semibold font-inter">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={`relative py-1 transition-all ${
                pathname === item.path
                  ? "text-secondary"
                  : "text-slate-300 hover:text-secondary"
              }`}
            >
              {item.name}
              <span
                className={`absolute bottom-0 left-0 h-[2px] bg-secondary transition-all ${
                  pathname === item.path ? "w-full" : "w-0"
                }`}
              />
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="px-6 py-2.5 rounded-xl bg-secondary text-primary font-black text-sm uppercase hover:shadow-[0_0_20px_rgba(52,168,83,0.4)] transition-all">
            Start a Project
          </button>
        </div>
      </div>
    </nav>
  );
}

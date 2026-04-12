"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Rocket } from "lucide-react";
import { translations } from "@/constants/translations";
import { useLanguage } from "@/constants/LanguageContext";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const { lang, setLang } = useLanguage();

  const t = translations[lang];

  // Nav Item
  const navItems = [
    { name: t.services, path: "/services" },
    { name: t.projects, path: "/projects" },
    { name: t.about, path: "/about" },
    { name: t.career, path: "/CareerPage" },
    { name: t.contact, path: "/ContactUs" },
  ];

  const languages = [
    { code: "EN", name: "English", flag: "https://flagcdn.com/w20/us.png" },
    { code: "BN", name: "বাংলা", flag: "https://flagcdn.com/w20/bd.png" },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const currentLang =
    languages.find((l) => l.code === (lang as string)) || languages[0];

  return (
    <nav className="fixed top-0 w-full bg-[#0b0c18] lg:bg-[#0b0c18]/90 backdrop-blur-xl z-[999] border-b border-white/5">
      <div className="flex justify-between items-center py-4 px-4 md:px-10 max-w-screen-2xl mx-auto">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-3 relative z-[1001]">
          <div className="relative w-9 h-9 md:w-11 md:h-11 bg-white rounded-xl p-1 shadow-lg shadow-white/5">
            <Image
              src="https://i.postimg.cc/yYds37Q3/logo-preview.png"
              alt="Logo"
              fill
              unoptimized
              className="object-contain"
            />
          </div>
          <div className="hidden md:flex flex-col">
            <span className="text-xl md:text-2xl font-black italic text-white leading-none">
              GROW
            </span>
            <span className="text-[7px] md:text-[9px] font-mono text-secondary font-bold uppercase tracking-[0.3em]">
              Business Solutions
            </span>
          </div>
        </Link>

        {/* Desktop Menu Links */}
        <div className="hidden lg:flex items-center gap-8 font-semibold">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`relative py-1 text-sm transition-all duration-300 ${
                pathname === item.path
                  ? "text-secondary"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              {item.name}
              <span
                className={`absolute bottom-0 left-0 h-[2px] bg-secondary transition-all duration-300 ${pathname === item.path ? "w-full" : "w-0"}`}
              />
            </Link>
          ))}
        </div>

        {/* Actions Section */}
        <div
          className={`flex items-center gap-2 md:gap-4 z-[1001] transition-opacity duration-300 ${isOpen ? "opacity-0 pointer-events-none lg:opacity-100 lg:pointer-events-auto" : "opacity-100"}`}
        >
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-2 bg-white/5 border border-white/10 px-2.5 py-1.5 md:px-3 md:py-2 rounded-lg hover:bg-white/10 transition-all"
            >
              <div className="relative w-5 h-3.5">
                <Image
                  src={currentLang.flag}
                  alt={currentLang.code}
                  fill
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                  unoptimized
                  className="object-cover rounded-[1px]"
                />
              </div>
              <span className="hidden sm:inline text-xs font-bold text-white uppercase">
                {currentLang.code}
              </span>
              <ChevronDown
                size={14}
                className={`text-white/50 transition-transform ${isLangOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isLangOpen && (
              <>
                <div
                  className="fixed inset-0 z-[1001]"
                  onClick={() => setIsLangOpen(false)}
                />
                <div className="absolute top-full mt-2 right-0 bg-[#16182d] border border-white/10 rounded-xl overflow-hidden shadow-2xl min-w-[130px] z-[1002]">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLang(l.code as "EN" | "BN");
                        setIsLangOpen(false);
                      }}
                      className="flex items-center gap-3 w-full px-4 py-3 hover:bg-secondary hover:text-primary text-xs text-white transition-all font-bold"
                    >
                      <Image
                        src={l.flag}
                        alt={l.name}
                        width={18}
                        height={12}
                        style={{ width: "18px", height: "auto" }}
                        className="w-[18px] h-auto"
                        unoptimized
                      />
                      {l.name}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <button className="p-2 md:px-5 md:py-2.5 rounded-xl bg-secondary text-white font-black transition-all flex items-center gap-2">
            <span className="hidden sm:inline text-xs uppercase">
              {t.startProject}
            </span>
            <Rocket
              size={18}
              className="sm:hidden md:block lg:hidden xl:block text-red-500"
            />
          </button>

          <button
            className="lg:hidden p-2 text-white bg-white/5 rounded-lg border border-white/10 ml-1"
            onClick={() => setIsOpen(true)}
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      {/* Mobile Side Drawer */}
      <div
        className={`lg:hidden fixed inset-0 z-[1002] transition-all duration-300 ${isOpen ? "visible" : "invisible"}`}
      >
        <div
          className={`absolute inset-0 bg-[#0b0c18] transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setIsOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 h-full w-[280px] sm:w-[320px] bg-[#0b0c18] shadow-2xl transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex flex-col h-full py-4 px-4">
            <div className="flex justify-between items-center mb-8 pb-4">
              <span className="text-white/40 font-black uppercase tracking-widest text-[10px]">
                {t.menu} {/* অনুবাদিত টেক্সট */}
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-white/60 hover:text-white bg-white/5 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex flex-col w-full bg-[#0b0c18]">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between w-full py-4 px-4 rounded-lg transition-all ${pathname === item.path ? "bg-white/5 text-secondary" : "text-white/80 hover:bg-white/5"}`}
                >
                  <span className="text-lg font-bold tracking-tight text-left">
                    {item.name}
                  </span>
                  {pathname === item.path && (
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

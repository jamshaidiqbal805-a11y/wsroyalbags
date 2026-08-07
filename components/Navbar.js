"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-2xl border-b border-yellow-200/40 shadow-[0_10px_40px_rgba(0,0,0,.08)]">

        <div className="container flex items-center justify-between h-[78px]">

          {/* Logo */}
          <Link
          
            href="/"
            className="flex items-center gap-3 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#D4AF37] via-[#B8860B] to-[#8B6508] flex items-center justify-center shadow-[0_10px_30px_rgba(212,175,55,.35)] group-hover:scale-110 transition duration-500">
              <ShoppingBag size={24} className="text-white" />
            </div>

            <div>
              <h2 className="text-2xl font-black tracking-[1px] text-gray-900">
 WS Royal
</h2>


              <p className="text-[11px] uppercase tracking-[4px] text-amber-600">
                LUXURY BAGS
              </p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center gap-10">

            {[
              { name: "Home", href: "/" },
              { name: "Collection", href: "#collection" },
              { name: "About", href: "#about" },
              { name: "Contact", href: "#contact" },
              { name: "Track Order", href: "/track-order" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative text-gray-700 font-semibold transition duration-300 hover:text-[#B8860B] after:absolute after:left-1/2 after:-bottom-2 after:h-[2px] after:w-0 after:-translate-x-1/2 after:bg-gradient-to-r from-[#D4AF37] to-[#8B6508] after:transition-all hover:after:w-full"
              >
                {item.name}
              </Link>
            ))}

            <a
  href="https://wa.me/923157405911"
  target="_blank"
  rel="noopener noreferrer"
  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#B8860B] to-[#8B6508] text-white font-bold shadow-[0_12px_35px_rgba(212,175,55,.45)] hover:-translate-y-1 hover:scale-105 transition duration-500"
>
  ✨ Shop Now
</a>

          </nav>

          {/* Mobile Button */}

          <button
aria-label="Toggle Menu"
onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

        </div>
      </header>

      {/* Mobile Menu */}

      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-[500px]" : "max-h-0"
        }`}
      >
        <div className="bg-gradient-to-b from-white/95 to-[#faf8f5]/95 backdrop-blur-xl border-b border-yellow-200/50 shadow-[0_20px_50px_rgba(0,0,0,.12)]">

          <div className="container py-6 flex flex-col gap-5">

            <Link
              href="/"
              onClick={closeMenu}
              className="font-semibold text-gray-700 hover:text-[#B8860B] transition duration-300"
            >
              Home
            </Link>

            <Link
              href="#collection"
              onClick={closeMenu}
              className="font-semibold text-gray-700 hover:text-[#B8860B] transition duration-300"
            >
              Collection
            </Link>

            <Link
              href="#about"
              onClick={closeMenu}
              className="font-semibold text-gray-700 hover:text-[#B8860B] transition duration-300"
            >
              About
            </Link>

            <Link
              href="#contact"
              onClick={closeMenu}
              className="font-semibold text-gray-700 hover:text-[#B8860B] transition duration-300"
            >
              Contact
            </Link>
            <Link
  href="/track-order"
  onClick={closeMenu}
  className="font-semibold text-gray-700 hover:text-[#B8860B] transition duration-300"
>
  Track Order
</Link>

            <a
              href="https://wa.me/923157405911"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 w-full rounded-full bg-gradient-to-r from-[#D4AF37] to-[#8B6508] py-3 text-center text-white font-bold shadow-lg hover:scale-[1.02] transition"
            >
              ✨ Order on WhatsApp
            </a>

          </div>

        </div>
      </div>
    </>
  );
}
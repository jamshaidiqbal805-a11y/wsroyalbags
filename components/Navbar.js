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

        <div className="container flex items-center justify-between h-[88px]">

          {/* Logo */}
          <Link
          
            href="/"
            className="flex items-center gap-3 group"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#D4AF37] via-[#B8860B] to-[#8B6508] flex items-center justify-center shadow-[0_10px_30px_rgba(212,175,55,.35)] group-hover:scale-110 transition duration-500">
              <ShoppingBag size={24} className="text-white" />
            </div>

            <div>
              <h2 className="text-2xl font-black tracking-[1px] text-gray-900">
 WS Royal
</h2>

<span className="block text-lg font-bold text-amber-600">
 Bags
</span>

              <p className="text-[11px] uppercase tracking-[4px] text-amber-600">
                Luxury Collection
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
                className="relative text-gray-700 font-semibold hover:text-amber-600 transition after:absolute after:left-0 after:-bottom-2 after:h-[2px] after:w-0 after:bg-amber-500 after:transition-all hover:after:w-full"
              >
                {item.name}
              </Link>
            ))}

            <a
              href="https://wa.me/923157405911"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-bold shadow-[0_12px_30px_rgba(37,211,102,.35)] hover:-translate-y-1 transition duration-300"
            >
              WhatsApp
            </a>

          </nav>

          {/* Mobile Button */}

          <button
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
        <div className="bg-white border-b shadow-xl">

          <div className="container py-6 flex flex-col gap-5">

            <Link
              href="/"
              onClick={closeMenu}
              className="font-semibold hover:text-amber-600 transition"
            >
              Home
            </Link>

            <Link
              href="#collection"
              onClick={closeMenu}
              className="font-semibold hover:text-amber-600 transition"
            >
              Collection
            </Link>

            <Link
              href="#about"
              onClick={closeMenu}
              className="font-semibold hover:text-amber-600 transition"
            >
              About
            </Link>

            <Link
              href="#contact"
              onClick={closeMenu}
              className="font-semibold hover:text-amber-600 transition"
            >
              Contact
            </Link>
            <Link
  href="/track-order"
  onClick={closeMenu}
  className="font-semibold hover:text-amber-600 transition"
>
  Track Order
</Link>

            <a
              href="https://wa.me/923157405911"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 w-full rounded-full bg-gradient-to-r from-green-500 to-green-600 py-3 text-center text-white font-bold shadow-lg hover:scale-[1.02] transition"
            >
              WhatsApp
            </a>

          </div>

        </div>
      </div>
    </>
  );
}
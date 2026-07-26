"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-200 shadow-sm">
      <div className="container flex items-center justify-between py-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <ShoppingBag size={30} className="text-amber-600" />
          <div>
            <h2 className="text-xl font-bold">WS Royal Bags</h2>
            <p className="text-xs text-gray-500">
              Luxury Collection
            </p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium">
          <Link href="/">Home</Link>
          <Link href="#collection">Collection</Link>
          <Link href="#about">About</Link>
          <Link href="#contact">Contact</Link>

          <a
            href="https://wa.me/923157405911"
            target="_blank"
            className="btn-primary"
          >
            WhatsApp
          </a>
        </nav>

        {/* Mobile Button */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container py-5 flex flex-col gap-5">

            <Link href="/" onClick={() => setMenuOpen(false)}>
              Home
            </Link>

            <Link href="#collection" onClick={() => setMenuOpen(false)}>
              Collection
            </Link>

            <Link href="#about" onClick={() => setMenuOpen(false)}>
              About
            </Link>

            <Link href="#contact" onClick={() => setMenuOpen(false)}>
              Contact
            </Link>

            <a
              href="https://wa.me/923157405911"
              target="_blank"
              className="btn-primary text-center"
            >
              WhatsApp
            </a>

          </div>
        </div>
      )}
    </header>
  );
}
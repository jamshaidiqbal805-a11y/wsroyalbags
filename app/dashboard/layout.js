"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaHome, FaMoneyBillWave } from "react-icons/fa";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const [today, setToday] = useState("");

  useEffect(() => {
    setToday(
      new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    );
  }, []);

  const menus = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <FaHome />,
    },
    {
      name: "Sales",
      href: "/dashboard/sales",
      icon: <FaMoneyBillWave />,
    },
  ];

  return (
    <div className="flex min-h-screen bg-slate-100">

      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white">

        <div className="p-6 border-b border-slate-700">
          <h1 className="text-2xl font-bold">
            WS Royal Bags
          </h1>
          <p className="text-sm text-slate-400 mt-2">
            Admin Panel
          </p>
        </div>

        <nav className="p-4 space-y-2">
          {menus.map((menu) => (
            <Link
              key={menu.name}
              href={menu.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                pathname === menu.href
                  ? "bg-blue-600 text-white"
                  : "hover:bg-slate-800"
              }`}
            >
              {menu.icon}
              <span>{menu.name}</span>
            </Link>
          ))}
        </nav>

      </aside>

      {/* Right Side */}
      <div className="flex-1">

        {/* Header */}
        <header className="bg-white shadow px-8 py-5 flex justify-between items-center">

          <div>
            <h2 className="text-3xl font-bold text-slate-800">
              Admin Dashboard
            </h2>

            <p className="text-gray-500">
              Welcome to WS Royal Bags
            </p>
          </div>

          <div className="text-right">
            <p className="text-sm text-gray-500">
              Today's Date
            </p>

            <p className="font-bold">
              {today}
            </p>
          </div>

        </header>

        {/* Page */}
        <div className="p-8">
          {children}
        </div>

      </div>

    </div>
  );
}
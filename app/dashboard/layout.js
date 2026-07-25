"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardLayout({ children }) {

  const pathname = usePathname();
  const router = useRouter();

  const [checking, setChecking] = useState(true);


  useEffect(() => {

    const login =
      localStorage.getItem("adminLogin");


    if(login !== "true"){

      router.push("/login");

    }else{

      setChecking(false);

    }

  }, [router]);



  function logout(){

    localStorage.removeItem(
      "adminLogin"
    );

    router.push("/login");

  }



  if(checking){

    return (

      <div className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-gray-100
      ">

        <h2 className="
        text-2xl
        font-bold
        ">
          🔒 Checking Login...
        </h2>

      </div>

    );

  }



  const menus = [

    {
      name: "Dashboard",
      href: "/dashboard",
      icon: "📊",
    },

    {
      name: "Sales",
      href: "/sales",
      icon: "💰",
    },

    {
      name: "Products",
      href: "/dashboard/products",
      icon: "👜",
    },

    {
      name: "Purchase",
      href: "/dashboard/purchase",
      icon: "📦",
    },

  ];



  return (

    <div className="flex min-h-screen bg-gray-100">


      <aside className="
      w-64
      bg-white
      shadow-lg
      border-r
      flex
      flex-col
      ">


        <div className="p-6 border-b">

          <h1 className="
          text-3xl
          font-bold
          text-blue-600
          ">
            WS Royal Bags
          </h1>


          <p className="text-gray-500 mt-2">
            🔒 Admin Panel
          </p>

        </div>



        <nav className="flex-1 p-4">


          {menus.map((menu)=>(


            <Link

              key={menu.name}

              href={menu.href}

              className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-2 font-semibold ${
              
              pathname === menu.href

              ? "bg-blue-600 text-white"

              : "text-gray-700 hover:bg-gray-100"

              }`}

            >

              <span className="text-xl">
                {menu.icon}
              </span>

              <span>
                {menu.name}
              </span>


            </Link>


          ))}


        </nav>



        <div className="p-4 border-t">


          <button

          onClick={logout}

          className="
          w-full
          bg-red-600
          hover:bg-red-700
          text-white
          py-3
          rounded-xl
          font-semibold
          "

          >

            🚪 Logout

          </button>


        </div>



      </aside>



      <main className="
      flex-1
      p-8
      overflow-auto
      ">

        {children}

      </main>


    </div>

  );

}
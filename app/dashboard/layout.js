"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function DashboardLayout({ children }) {


  const pathname = usePathname();

  const router = useRouter();


  const [checking,setChecking] = useState(true);



  useEffect(()=>{


    const login =
    localStorage.getItem("adminLogin");


    if(login !== "true"){

      router.push("/login");

    }
    else{

      setChecking(false);

    }


  },[router]);





  function logout(){

    localStorage.removeItem("adminLogin");

    router.push("/login");

  }





  if(checking){

    return (

      <div className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-gray-950
      text-white
      ">

        <h2 className="
        text-xl
        font-bold
        ">

          🔒 Checking Admin Login...

        </h2>


      </div>

    );

  }





  const menus = [


    {
      name:"Dashboard",
      href:"/dashboard",
      icon:"📊"
    },


    {
      name:"Sales",
      href:"/sales",
      icon:"💰"
    },


    {
      name:"Products Management",
      href:"/dashboard/products",
      icon:"👜"
    },


    {
      name:"Purchase Management",
      href:"/dashboard/purchase",
      icon:"📦"
    },


  ];





return (


<div className="
flex
min-h-screen
bg-[#f8fafc]
">





{/* SIDEBAR */}


<aside className="
w-64
bg-gradient-to-b
from-[#1e3a8a]
to-[#0f172a]
text-white
shadow-2xl
flex
flex-col
">





<div className="
p-6
border-b
border-gray-700
">


<h1 className="
text-xl
font-extrabold
tracking-wide
text-yellow-400
">

WS Royal

</h1>


<p className="
text-gray-300
mt-2
text-sm
">

✨ Luxury Admin Panel

</p>


</div>







<nav className="
flex-1
p-6
">


{

menus.map((menu)=>(


<Link

key={menu.name}

href={menu.href}

className={`

flex
items-center
gap-3
px-4
py-3
rounded-xl
mb-2
transition-all
duration-300

${

pathname === menu.href

?

"bg-yellow-400 text-black shadow-lg scale-[1.02]"

:

"text-gray-200 hover:bg-white/10 hover:text-yellow-300"

}

`}

>



<span className="
text-xl
">

{menu.icon}

</span>



<span className="
text-base
font-semibold
">

{menu.name}

</span>



</Link>


))


}



</nav>








<div className="
p-6
border-t
border-gray-700
">



<button

onClick={logout}

className="
w-full
bg-red-600
hover:bg-red-700
text-white
py-3
rounded-xl
font-bold
text-base
transition
"

>
🚪 Logout


</button>



</div>





</aside>








{/* MAIN CONTENT */}



<main className="
flex-1
p-6
overflow-auto
">


{children}


</main>





</div>


);


}
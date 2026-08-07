"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Menu,
  X,
  Bell,
  LogOut,
  LayoutDashboard,
  ShoppingCart,
  Package,
  Truck,
  Users,
  BarChart3,
  Settings,
  WalletCards
} from "lucide-react";


export default function DashboardLayout({children}) {


const pathname = usePathname();
const router = useRouter();


const [checking,setChecking] = useState(true);
const [sidebar,setSidebar] = useState(false);



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

return(

<div className="
min-h-screen
flex
items-center
justify-center
bg-[#020617]
text-white
">

<h2 className="
text-xl
font-bold
">

🔒 Checking Admin Access...

</h2>

</div>

)

}




const menus=[


{
name:"Dashboard",
href:"/dashboard",
icon:<LayoutDashboard size={20}/>
},
{
name:"Website Customer Orders",
href:"/dashboard/website-orders",
icon:<Truck size={20}/>
},

{
name:"Sales Management",
href:"/sales",
icon:<ShoppingCart size={20}/>
},


{
name:"Products",
href:"/dashboard/products",
icon:<Package size={20}/>
},


{
name:"Orders",
href:"/dashboard/order",
icon:<Truck size={20}/>
},


{
name:"Purchases",
href:"/dashboard/purchase",
icon:<WalletCards size={20}/>
},


{
name:"Customers",
href:"/dashboard/customers",
icon:<Users size={20}/>
},


{
name:"Reports",
href:"/dashboard/reports",
icon:<BarChart3 size={20}/>
},


{
name:"Settings",
href:"/dashboard/settings",
icon:<Settings size={20}/>
}



];





return(


<div className="
min-h-screen
flex
bg-[#f8fafc]
">



{/* MOBILE OVERLAY */}

{
sidebar &&

<div

onClick={()=>setSidebar(false)}

className="
fixed
inset-0
bg-black/50
z-40
lg:hidden
"

/>

}




{/* SIDEBAR */}


<aside

className={`

fixed
lg:static
z-50

h-screen

w-72

bg-gradient-to-b
from-[#020617]
via-[#0f172a]
to-[#1e3a8a]

text-white

shadow-2xl

transition-transform

duration-300


${

sidebar
?
"translate-x-0"
:
"-translate-x-full lg:translate-x-0"

}

`}

>


<div className="
pt-14
px-6
pb-6
border-b
border-white/10
">

<div className="
flex
items-center
justify-between
">


<div>


<h1 className="
text-2xl
font-black
text-[#D4AF37]
">

WS Royal

</h1>


<p className="
text-xs
tracking-[3px]
text-gray-300
">

LUXURY ERP

</p>



</div>



<button

onClick={()=>setSidebar(false)}

className="
lg:hidden
"

>

<X/>

</button>



</div>


</div>





<nav className="
px-5
space-y-3
"
style={{
paddingTop:"40px"
}}
>

{

menus.map((menu)=>(


<Link

key={menu.name}

href={menu.href}

onClick={()=>setSidebar(false)}

className={`

flex
items-center
gap-4

px-5
py-3

rounded-xl

font-semibold

transition-all


${

pathname.startsWith(menu.href)

?

"bg-[#D4AF37] text-black shadow-lg"

:

"text-gray-200 hover:bg-white/10 hover:text-[#D4AF37]"

}


`}

>


{menu.icon}

{menu.name}


</Link>


))

}



</nav>







<div className="
absolute
bottom-0
w-full
p-5
border-t
border-white/10
">


<button

onClick={logout}

className="
w-full
flex
items-center
justify-center
gap-3

bg-red-600
hover:bg-red-700

py-3

rounded-xl

font-bold

transition

"

>

<LogOut size={20}/>

Logout


</button>


</div>



</aside>








{/* MAIN */}


<div className="
flex-1
min-h-screen
">





{/* TOP HEADER */}


<header className="
h-20
bg-gradient-to-r
from-[#020617]
via-[#0f172a]
to-[#1e3a8a]
border-b
border-white/10
shadow-xl
flex
items-center
justify-between
px-6
text-white
">


<div className="
flex
items-center
gap-4
">


<button

onClick={()=>setSidebar(true)}

className="
lg:hidden
"

>

<Menu/>

</button>






</div>




<div className="
flex
items-center
gap-5
">


<Bell
className="text-gray-600"
/>


<div className="
text-right
hidden sm:block
">


<p className="
font-bold
text-[#D4AF37]
">

Admin

</p>


<p className="
text-xs
text-gray-300
">

WS Royal Manager

</p>


<p className="
text-xs
text-gray-400
">

{new Date().toLocaleDateString("en-US",{
weekday:"long",
day:"2-digit",
month:"short",
year:"numeric"
})}

&nbsp; | &nbsp;

{new Date().toLocaleTimeString([],{
hour:"2-digit",
minute:"2-digit"
})}

</p>


</div>


<div className="
w-10
h-10

rounded-full

bg-gradient-to-br
from-[#D4AF37]
to-[#8B6508]

flex
items-center
justify-center

text-white
font-bold

">

A

</div>


</div>


</header>





<main className="
p-6
">

{children}

</main>



</div>



</div>


)

}
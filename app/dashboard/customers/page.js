"use client";

import {
useEffect,
useState
} from "react";


import {
collection,
getDocs,
query,
orderBy
} from "firebase/firestore";


import {
db
} from "../../../lib/firebase";




export default function Customers(){



const [loading,setLoading]=useState(true);


const [customers,setCustomers]=useState([]);


const [search,setSearch]=useState("");





useEffect(()=>{

loadCustomers();

},[]);







async function loadCustomers(){


try{


const snap = await getDocs(

query(

collection(db,"orders"),

orderBy(
"createdAt",
"desc"
)

)

);





const orders=snap.docs.map(item=>(

{

id:item.id,

...item.data()

}

));





const customerMap={};




orders.forEach(order=>{


const name=

order.customerName ||

"Unknown Customer";



if(!customerMap[name]){


customerMap[name]={

name,

phone:

order.phone || "-",

address:

order.address || "-",

orders:0,

spent:0

};


}



customerMap[name].orders += 1;



customerMap[name].spent +=

Number(

order.amount || 0

);



});





setCustomers(

Object.values(customerMap)

);



}


catch(error){

console.log(
"Customers Error:",
error
);


}


finally{

setLoading(false);

}



}
const filteredCustomers =

customers.filter(customer=>

customer.name

.toLowerCase()

.includes(

search.toLowerCase()

)

);





const totalCustomers = customers.length;


const totalRevenue = customers.reduce(

(sum,item)=>

sum + item.spent,

0

);






if(loading){

return(

<div className="
min-h-screen
flex
items-center
justify-center
bg-[#020617]
text-white
">


<h1 className="
text-3xl
font-bold
text-[#D4AF37]
">

Loading Customers...

</h1>


</div>

)

}





return(

<main className="
min-h-screen
bg-gradient-to-br
from-[#020617]
via-[#0f172a]
to-[#1e3a8a]
p-6
text-white
">


<div className="
max-w-7xl
mx-auto
">



<h1 className="
text-4xl
font-black
text-[#D4AF37]
">

Customer Management

</h1>


<p className="
text-gray-300
mt-2
">

WS Royal Bags Customer Intelligence

</p>







<div className="
grid
grid-cols-1
md:grid-cols-3
gap-6
mt-8
">



<div className="
bg-white/10
border
border-white/20
rounded-3xl
p-6
">

<p>
👥 Total Customers
</p>


<h2 className="
text-4xl
font-black
text-[#D4AF37]
mt-3
">

{totalCustomers}

</h2>


</div>






<div className="
bg-white/10
border
border-white/20
rounded-3xl
p-6
">

<p>
🛒 Total Orders
</p>


<h2 className="
text-4xl
font-black
text-blue-400
mt-3
">

{

customers.reduce(

(sum,item)=>

sum + item.orders,

0

)

}

</h2>


</div>






<div className="
bg-white/10
border
border-white/20
rounded-3xl
p-6
">

<p>
💰 Customer Revenue
</p>


<h2 className="
text-3xl
font-black
text-green-400
mt-3
">

Rs {totalRevenue}

</h2>


</div>



</div>






<div className="
mt-8
bg-white/10
border
border-white/20
rounded-3xl
p-6
">


<input

placeholder="Search Customer..."

value={search}

onChange={(e)=>

setSearch(e.target.value)

}


className="
w-full
bg-black/20
border
border-white/20
rounded-xl
p-4
outline-none
"

/>


</div>
<div className="
mt-8
bg-white/10
border
border-white/20
rounded-3xl
p-6
overflow-x-auto
">


<table className="
w-full
min-w-[900px]
">


<thead>

<tr className="
border-b
border-white/20
text-gray-300
">


<th className="p-3 text-left">
Customer
</th>


<th className="p-3">
Phone
</th>


<th className="p-3">
Address
</th>


<th className="p-3">
Orders
</th>


<th className="p-3">
Total Spent
</th>


</tr>

</thead>





<tbody>


{

filteredCustomers.map((customer,index)=>(


<tr

key={index}

className="
border-b
border-white/10
"

>


<td className="p-3">


<div className="font-bold">

{customer.name}

</div>


</td>





<td className="p-3">

{customer.phone}

</td>





<td className="p-3 text-gray-300">

{customer.address}

</td>





<td className="
p-3
text-blue-300
font-bold
">

{customer.orders}

</td>





<td className="
p-3
text-green-400
font-bold
">

Rs {customer.spent}

</td>





</tr>


))


}



</tbody>


</table>


</div>
{

filteredCustomers.length === 0 &&

(

<div className="
mt-6
text-center
text-gray-400
">

No Customers Found

</div>

)

}




<div className="
text-center
text-gray-400
mt-10
pb-6
">


© {new Date().getFullYear()} WS Royal Bags

<br/>

Customer Intelligence System


</div>





</div>

</main>


)


}
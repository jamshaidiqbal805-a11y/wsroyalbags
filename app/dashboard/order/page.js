"use client";

import {
  useEffect,
  useState
} from "react";

import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  updateDoc,
  deleteDoc
} from "firebase/firestore";

import {
  db
} from "../../../lib/firebase";


export default function OrderPage(){


const [loading,setLoading]=useState(true);

const [orders,setOrders]=useState([]);

const [search,setSearch]=useState("");
const [selectedOrder,setSelectedOrder]=useState(null);

const [stats,setStats]=useState({

total:0,
pending:0,
processing:0,
shipped:0,
outDelivery:0,
delivered:0,
cancelled:0,
revenue:0

});



useEffect(()=>{

loadOrders();

},[]);



async function loadOrders(){

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



const data=snap.docs.map(item=>({

id:item.id,
...item.data()

}));


setOrders(data);

calculateStats(data);


}

catch(error){

console.log(
"Orders Error",
error
);

}


finally{

setLoading(false);

}


}





function calculateStats(data){


setStats({

total:data.length,


processing:data.filter(
item=>(item.status || "Processing")==="Processing"
).length,


shipped:data.filter(
item=>item.status==="Shipped"
).length,


delivered:data.filter(
item=>item.status==="Delivered"
).length,


cancelled:data.filter(
item=>item.status==="Cancelled"
).length,
pending:data.filter(
item=>item.status==="Pending"
).length,


outDelivery:data.filter(
item=>item.status==="Out for Delivery"
).length,

revenue:data.reduce(
(sum,item)=>sum+Number(item.amount || 0),
0
)


});


}





async function updateOrderStatus(id,status){


try{


await updateDoc(

doc(db,"orders",id),

{
status
}

);



const updated=orders.map(order=>

order.id===id

?

{
...order,
status
}

:

order

);



setOrders(updated);

calculateStats(updated);



}

catch(error){

console.log(
"Status Error",
error
);

}


}
function statusColor(status){

if(status==="Pending")
return "bg-gray-500";

if(status==="Confirmed")
return "bg-blue-500";

if(status==="Processing")
return "bg-yellow-500 text-black";

if(status==="Packed")
return "bg-purple-500";

if(status==="Shipped")
return "bg-indigo-500";

if(status==="Out for Delivery")
return "bg-orange-500 text-black";

if(status==="Delivered")
return "bg-green-600";

if(status==="Cancelled")
return "bg-red-600";


return "bg-gray-500";

}





async function deleteOrder(id){


const confirmDelete=window.confirm(
"Delete this order?"
);


if(!confirmDelete)
return;



try{


await deleteDoc(

doc(db,"orders",id)

);



const updated=orders.filter(

item=>item.id!==id

);



setOrders(updated);

calculateStats(updated);



}

catch(error){

console.log(
"Delete Error",
error
);

}


}






const filteredOrders=

orders.filter(order=>

(order.customerName || "")

.toLowerCase()

.includes(

search.toLowerCase()

)

);





if(loading){

return(

<div className="
min-h-screen
bg-[#020617]
flex
items-center
justify-center
text-[#D4AF37]
text-3xl
font-bold
">

Loading Orders...

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


<div className="max-w-7xl mx-auto">



<h1 className="
text-4xl
font-black
text-[#D4AF37]
">

Orders Management

</h1>


<p className="text-gray-300 mt-2">

WS Royal Bags Website Orders

</p>





<div className="
grid
grid-cols-1
md:grid-cols-2
lg:grid-cols-5
gap-5
mt-8
">



{[

["📦 Total Orders",stats.total],
["⏳ Processing",stats.processing],
["🚚 Shipped",stats.shipped],
["✅ Delivered",stats.delivered],
["💰 Revenue",`Rs ${stats.revenue}`]

].map((item,index)=>(


<div
key={index}
className="
bg-white/10
border
border-white/20
rounded-3xl
p-6
"
>

<p>{item[0]}</p>


<h2 className="
text-3xl
font-black
text-[#D4AF37]
">

{item[1]}

</h2>


</div>


))}



</div>





<div className="
mt-8
bg-white/10
rounded-3xl
p-5
">


<input

placeholder="Search Customer..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

className="
w-full
bg-black/20
border
border-white/20
rounded-xl
p-4
"

/>


</div>





<div className="
mt-8
bg-white/10
rounded-3xl
p-6
overflow-x-auto
">



<table className="
w-full
min-w-[1000px]
">


<thead>

<tr className="
border-b
border-white/20
">


<th className="p-3">
Customer
</th>

<th>
Product
</th>

<th>
Amount
</th>

<th>
Status
</th>

<th>
Date
</th>

<th>
Action
</th>


</tr>

</thead>




<tbody>


{

filteredOrders.map(order=>(


<tr
key={order.id}
className="
border-b
border-white/10
"
>


<td className="p-3">

{order.customerName || "-"}

</td>


<td>

{order.productName || "-"}

</td>



<td className="
text-green-400
font-bold
">

Rs {order.amount || 0}

</td>




<td className="p-3">

<div className="flex flex-col gap-2">


<span

className={`
px-3
py-1
rounded-full
text-sm
font-bold
text-center
${statusColor(order.status || "Processing")}
`}

>

{order.status || "Processing"}

</span>



<select

value={order.status || "Processing"}

onChange={(e)=>

updateOrderStatus(
order.id,
e.target.value
)

}

className="
bg-black/30
border
border-white/20
rounded-lg
p-2
"

>


<option>Pending</option>
<option>Confirmed</option>
<option>Processing</option>
<option>Packed</option>
<option>Shipped</option>
<option>Out for Delivery</option>
<option>Delivered</option>
<option>Cancelled</option>


</select>


</div>

</td>




<td>


{

order.createdAt?.seconds

?

new Date(
order.createdAt.seconds*1000
).toLocaleDateString()

:

"-"

}


</td>



<td className="p-3">

<div className="flex gap-2">


<button

onClick={()=>setSelectedOrder(order)}

className="
bg-blue-600
px-4
py-2
rounded-lg
font-bold
"

>

View

</button>



<button

onClick={()=>deleteOrder(order.id)}

className="
bg-red-600
px-4
py-2
rounded-lg
font-bold
"

>

Delete

</button>


</div>

</td>



</tr>


))

}



</tbody>


</table>


</div>
{/* ORDER DETAIL MODAL */}

{
selectedOrder && (

<div className="
fixed
inset-0
bg-black/70
flex
items-center
justify-center
z-50
">


<div className="
bg-[#0f172a]
border
border-white/20
rounded-3xl
p-8
w-full
max-w-lg
text-white
">


<h2 className="
text-3xl
font-black
text-[#D4AF37]
mb-6
">

Order Details

</h2>



<p>
Customer:

<strong className="ml-2">

{selectedOrder.customerName || "-"}

</strong>

</p>




<p className="mt-2">

Phone:

<strong className="ml-2">

{selectedOrder.phone || "-"}

</strong>

</p>




<p className="mt-2">

Product:

<strong className="ml-2">

{selectedOrder.productName || "-"}

</strong>

</p>




<p className="mt-2">

Amount:

<strong className="ml-2">

Rs {selectedOrder.amount || 0}

</strong>

</p>




<p className="mt-2">

Status:

<strong className="ml-2">

{selectedOrder.status || "Processing"}

</strong>

</p>




<p className="mt-2">

Order ID:

<strong className="ml-2">

{selectedOrder.orderId || selectedOrder.id || "-"}

</strong>

</p>
<p className="mt-2">

Payment:

<strong className="ml-2">

{selectedOrder.paymentMethod || "-"}

</strong>

</p>


<p className="mt-2">

Quantity:

<strong className="ml-2">

{selectedOrder.quantity || 1}

</strong>

</p>


<p className="mt-2">

Tracking Number:

<strong className="ml-2">

{selectedOrder.trackingNumber || "-"}

</strong>

</p>


<p className="mt-2">

Order Date:

<strong className="ml-2">

{

selectedOrder.createdAt?.seconds

?

new Date(
selectedOrder.createdAt.seconds*1000
).toLocaleDateString()

:

"-"

}

</strong>

</p>




<p className="mt-3">

Address:

<br/>

<strong>

{selectedOrder.address || "-"}

</strong>

</p>




<button

onClick={()=>setSelectedOrder(null)}

className="
mt-6
bg-[#D4AF37]
text-black
px-6
py-3
rounded-xl
font-bold
"

>

Close

</button>



</div>


</div>

)
}



</div>


</main>


)


}

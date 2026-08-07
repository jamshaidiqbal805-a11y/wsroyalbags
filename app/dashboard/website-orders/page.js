"use client";

import { useEffect, useState } from "react";

import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import { db } from "../../../lib/firebase";


export default function WebsiteOrdersPage(){


const [loading,setLoading]=useState(true);

const [sales,setSales]=useState([]);
const [orders,setOrders]=useState([]);
const [products,setProducts]=useState([]);


const [search,setSearch]=useState("");
const [orderSearch,setOrderSearch]=useState("");



useEffect(()=>{

loadReports();

},[]);





async function loadCollection(name){


const snap = await getDocs(

query(
collection(db,name),
orderBy("createdAt","desc")
)

);


return snap.docs.map(doc=>({

id:doc.id,
...doc.data()

}));


}







async function loadReports(){


try{


setLoading(true);



const [
salesData,
ordersData,
productsData

]=await Promise.all([


loadCollection("sales"),
loadCollection("orders"),
loadCollection("products")


]);



setSales(salesData);

setOrders(ordersData);

setProducts(productsData);



}
catch(error){

console.log(error);

}
finally{

setLoading(false);

}


}









async function changeOrderStatus(id,status){


try{


await updateDoc(

doc(db,"orders",id),

{
status:status
}

);


loadReports();


}
catch(error){

console.log(error);

}


}








async function changePaymentStatus(id,paymentStatus){


try{


await updateDoc(

doc(db,"orders",id),

{
paymentStatus:paymentStatus
}

);


loadReports();


}
catch(error){

console.log(error);

}


}
async function updatePaymentMethod(id,paymentMethod){

try{

await updateDoc(

doc(db,"orders",id),

{
paymentMethod: paymentMethod
}

);


loadReports();


}
catch(error){

console.log(error);

}

}








async function deleteOrder(id){


const ok = confirm(
"Delete this order permanently?"
);


if(!ok) return;



try{


await deleteDoc(

doc(db,"orders",id)

);


loadReports();


}
catch(error){

console.log(error);

}


}
async function updateSalePaymentStatus(id,paymentStatus){

try{

await updateDoc(

doc(db,"sales",id),

{
paymentStatus:paymentStatus
}

);

loadReports();

}
catch(error){

console.log(error);

}

}









function downloadCSV(){


const rows = orders.map(item=>({


Order_ID:item.orderId || "",

Customer:item.customerName || "",

Phone:item.phone || "",

Address:item.address || "",

Email:item.email || "",

Product:item.productName || "",

WS_Code:item.productCode || "",

Quantity:item.quantity || 0,

Amount:item.amount || 0,

Payment:item.paymentMethod || "",

Payment_Status:item.paymentStatus || "",

Status:item.status || "",

Tracking:item.trackingNumber || ""


}));




const csv=[

Object.keys(rows[0] || {}).join(","),

...rows.map(row=>

Object.values(row)
.map(v=>`"${v}"`)
.join(",")

)

].join("\n");




const blob=new Blob(

[csv],

{
type:"text/csv"
}

);



const url=URL.createObjectURL(blob);


const link=document.createElement("a");

link.href=url;

link.download="WS-Royal-Orders-Report.csv";

link.click();


}









function downloadSalesCSV(){


const rows=sales.map(item=>({


Customer:item.customerName || "",

Phone:item.phone || "",

Product:item.productName || "",

WS_Code:item.productCode || "",

Quantity:item.quantity || 0,

Amount:item.amount || 0,

Payment:item.paymentMethod || "",

Status:item.status || ""


}));




const csv=[

Object.keys(rows[0] || {}).join(","),

...rows.map(row=>

Object.values(row)
.map(v=>`"${v}"`)
.join(",")

)

].join("\n");




const blob=new Blob(

[csv],

{
type:"text/csv"
}

);



const url=URL.createObjectURL(blob);


const link=document.createElement("a");


link.href=url;


link.download="WS-Royal-Recent-Sales.csv";


link.click();


}








const filteredOrders = orders.filter(item=>


(item.customerName || "")
.toLowerCase()
.includes(orderSearch.toLowerCase())


||

(item.productName || "")
.toLowerCase()
.includes(orderSearch.toLowerCase())


||

(item.orderId || "")
.toLowerCase()
.includes(orderSearch.toLowerCase())


);





const filteredSales = sales.filter(item=>


(item.customerName || "")
.toLowerCase()
.includes(search.toLowerCase())


||

(item.productName || "")
.toLowerCase()
.includes(search.toLowerCase())


);
if(loading){

return(

<div className="min-h-screen bg-[#020617] flex items-center justify-center text-white">

<h1 className="text-3xl font-black">
Loading Reports...
</h1>

</div>

)

}



return(

<main className="min-h-screen bg-[#020617] text-white p-6">


<div className="max-w-7xl mx-auto">





<div className="flex items-center justify-between mb-5">
  <div>
    <h2 className="text-3xl font-black text-[#D4AF37]">
      Customer Orders
    </h2>

    <p className="text-gray-400 text-sm mt-1">
      Manage all customer orders
    </p>
  </div>

  <div className="text-right">
    <p className="text-gray-400 text-sm">
      {new Date().toLocaleDateString()}
    </p>
    <p className="text-[#D4AF37] font-bold">
      {new Date().toLocaleTimeString()}
    </p>
  </div>
</div>





<div className="grid md:grid-cols-5 gap-5 mt-8">



<Card title="Total Sales">

Rs {
orders.reduce(
(a,b)=>a+(Number(b.amount)||0)
,0
).toLocaleString()
}

</Card>




<Card title="Orders">

{orders.length}

</Card>




<Card title="Products">

{products.length}

</Card>





<Card title="Paid Orders">

{
orders.filter(
x=>x.paymentStatus==="Paid"
).length
}

</Card>





<Card title="Pending">

{
orders.filter(
x=>x.paymentStatus==="Pending"
).length
}

</Card>


</div>









<div className="mt-10 bg-[#111827] p-6 rounded-2xl border border-yellow-500/20">


<h2 className="text-2xl font-black text-[#D4AF37]">

Export Orders Report

</h2>



<button

onClick={downloadCSV}

className="mt-5 bg-[#D4AF37] text-black px-6 py-3 rounded-xl font-bold"

>

Download CSV

</button>



</div>









<div className="mt-10 bg-[#111827] p-6 rounded-2xl border border-yellow-500/20">


<h2 className="text-2xl font-black text-[#D4AF37] mb-5">

Website Orders

</h2>





<input

placeholder="Search Order / Customer / Product"

value={orderSearch}

onChange={(e)=>setOrderSearch(e.target.value)}

className="w-full p-3 rounded-xl bg-[#020617] mb-5"

/>








<div className="overflow-x-auto">


<table className="w-full text-sm">


<thead>

<tr className="border-b border-gray-700 text-gray-400">


<th className="p-3 text-left">
Order ID
</th>


<th className="p-3 text-left">
Customer
</th>


<th className="p-3 text-left">
Product
</th>


<th className="p-3 text-left">
Amount
</th>
<th className="p-3 text-left">
  Date & Time
</th>


<th className="p-3 text-left">
Payment
</th>


<th className="p-3 text-left">
Status
</th>


<th className="p-3 text-left">
Action
</th>


</tr>

</thead>




<tbody>


{
filteredOrders.map(item=>(


<tr

key={item.id}

className="border-b border-gray-800"

>


<td className="p-3 text-[#D4AF37]">

{item.orderId || item.id}

</td>




<td className="p-3">

<div>
{item.customerName || "-"}
</div>

<div className="text-gray-400">
{item.phone || "-"}
</div>

</td>





<td className="p-3">

<div>
{item.productName || "-"}
</div>

<div className="text-gray-400">
{item.productCode || "-"}
</div>

</td>





<td className="p-3">

Rs {item.amount || 0}

</td>
<td className="p-3">
  {item.createdAt?.toDate
    ? item.createdAt.toDate().toLocaleString("en-PK")
    : "-"}
</td>





<td className="p-3">

<div className="flex flex-col gap-2">


{/* Payment Method */}

<select

value={item.paymentMethod || "Cash on Delivery"}

onChange={(e)=>
updatePaymentMethod(
item.id,
e.target.value
)
}

className="bg-[#020617] p-2 rounded-lg"

>

<option>Cash on Delivery</option>
<option>Online Payment</option>
<option>Bank Transfer</option>
<option>Easypaisa</option>
<option>JazzCash</option>
<option>Cash</option>

</select>



{/* Payment Status */}

<select

value={item.paymentStatus || "Pending"}

onChange={(e)=>
changePaymentStatus(
item.id,
e.target.value
)
}

className="bg-[#020617] p-2 rounded-lg"

>

<option>Pending</option>
<option>Paid</option>
<option>Unpaid</option>
<option>Refund</option>

</select>


</div>

</td>








<td className="p-3">


<select

value={item.status || "Pending"}

onChange={(e)=>
changeOrderStatus(
item.id,
e.target.value
)
}

className="bg-[#020617] p-2 rounded-lg"

>


<option>Pending</option>
<option>Processing</option>
<option>Shipped</option>
<option>Delivered</option>
<option>Cancelled</option>


</select>


</td>






<td className="p-3">


<button

onClick={()=>deleteOrder(item.id)}

className="bg-red-600 px-3 py-2 rounded-lg"

>

Delete

</button>


</td>




</tr>


))

}


</tbody>


</table>


</div>


</div>
<div className="mt-10 bg-[#111827] p-6 rounded-2xl border border-yellow-500/20">


<h2 className="text-2xl font-black text-[#D4AF37]">

Recent Sales

</h2>




<button

onClick={downloadSalesCSV}

className="mt-4 bg-[#D4AF37] text-black px-5 py-3 rounded-xl font-bold"

>

Download Sales CSV

</button>





<input

placeholder="Search Customer / Product"

value={search}

onChange={(e)=>setSearch(e.target.value)}

className="w-full mt-5 p-3 rounded-xl bg-[#020617]"

/>








<div className="mt-5 overflow-x-auto">


<table className="w-full">


<thead>


<tr className="border-b border-gray-700 text-gray-400">


<th className="p-3 text-left">
Customer
</th>


<th className="p-3 text-left">
Phone
</th>


<th className="p-3 text-left">
Product
</th>


<th className="p-3 text-left">
WS Code
</th>


<th className="p-3 text-left">
Qty
</th>
<th className="p-3 text-left">
  Date & Time
</th>


<th className="p-3 text-left">
Amount
</th>


<th className="p-3 text-left">
Payment
</th>


<th className="p-3 text-left">
Status
</th>


</tr>


</thead>





<tbody>


{

filteredSales.map(item=>(


<tr

key={item.id}

className="border-b border-gray-800"

>


<td className="p-3">
{item.customerName || "-"}
</td>



<td className="p-3">
{item.phone || "-"}
</td>



<td className="p-3">
{item.productName || "-"}
</td>



<td className="p-3 text-[#D4AF37]">
{item.productCode || "-"}
</td>



<td className="p-3">
{item.quantity || 0}
</td>
<td className="p-3">
  {item.createdAt?.toDate
    ? item.createdAt.toDate().toLocaleString("en-PK")
    : "-"}
</td>


<td className="p-3 text-[#D4AF37]">
Rs {item.amount || 0}
</td>



<td className="p-3">
{item.paymentMethod || "-"}
</td>



<td className="p-3">

<select

value={item.paymentStatus || "Pending"}

onChange={(e)=>
updateSalePaymentStatus(
item.id,
e.target.value
)
}

className="bg-[#020617] p-2 rounded-lg"

>

<option>Pending</option>
<option>Paid</option>
<option>Unpaid</option>
<option>Refund</option>

</select>

</td>



</tr>


))

}


</tbody>


</table>


</div>


</div>








</div>


</main>


)


}







function Card({title,children}){


return(


<div className="bg-[#111827] p-5 rounded-2xl border border-yellow-500/20">


<h3 className="text-gray-400">

{title}

</h3>


<h2 className="text-2xl font-black text-[#D4AF37] mt-3">

{children}

</h2>


</div>


)


}
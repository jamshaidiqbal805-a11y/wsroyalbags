"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../lib/firebase";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";


export default function Dashboard() {


const [stats,setStats] = useState({
  totalSales:0,
  totalStock:0,
  cashInHand:0,
  visitors:0,
  totalProfit:0
});


const [sales,setSales] = useState([]);

const [chartData,setChartData] = useState([]);



useEffect(()=>{


async function loadSales(){


try{


const q = query(
collection(db,"sales"),
orderBy("createdAt","desc")
);


const snapshot = await getDocs(q);


let totalAmount = 0;
let totalProfit = 0;
let customers = 0;

let salesData = [];



snapshot.forEach((doc)=>{


const data = doc.data();



totalAmount += Number(data.amount || 0);

totalProfit += Number(data.profit || 0);

customers++;



salesData.push({

id:doc.id,

customerName:data.customerName,

product:data.product,

quantity:data.quantity,

amount:data.amount

});


});



setStats({

totalSales:totalAmount,

totalStock:0,

cashInHand:totalAmount,

visitors:customers,

totalProfit:totalProfit

});



setSales(salesData);



setChartData(

salesData.map((item)=>({

name:item.product,

sales:Number(item.amount)

}))

);



}
catch(error){

console.log(error);

}


}


loadSales();


},[]);




const cards=[

{
title:"Total Sales",
value:`Rs. ${stats.totalSales}`,
icon:"💰",
color:"bg-green-600"
},

{
title:"Total Stock",
value:stats.totalStock,
icon:"👜",
color:"bg-blue-600"
},

{
title:"Cash in Hand",
value:`Rs. ${stats.cashInHand}`,
icon:"💵",
color:"bg-yellow-600"
},

{
title:"Visitors",
value:stats.visitors,
icon:"👥",
color:"bg-purple-600"
},

{
title:"Total Profit",
value:`Rs. ${stats.totalProfit}`,
icon:"📈",
color:"bg-red-600"
}

];
return (

<main className="min-h-screen bg-slate-100 p-8">


{/* Header */}

<div className="bg-white rounded-2xl shadow-lg p-6 mb-8">

<h1 className="text-4xl font-bold text-gray-800">
WS Royal Bags Dashboard
</h1>

<p className="text-gray-500 mt-2">
Real Time Business Analytics Dashboard
</p>

</div>



{/* Cards */}

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">


{cards.map((card,index)=>(


<div
key={index}
className={`${card.color} text-white rounded-2xl shadow-xl p-6`}
>


<div className="text-5xl">
{card.icon}
</div>


<h2 className="mt-4 text-lg">
{card.title}
</h2>


<h1 className="text-3xl font-bold mt-2">
{card.value}
</h1>


</div>


))}


</div>





{/* Sales Chart */}

<div className="mt-10 bg-white rounded-2xl shadow-lg p-6">


<h2 className="text-2xl font-bold mb-5">
Sales Analytics 📊
</h2>



<ResponsiveContainer width="100%" height={300}>


<BarChart data={chartData}>


<CartesianGrid strokeDasharray="3 3" />


<XAxis dataKey="name" />


<YAxis />


<Tooltip />


<Bar dataKey="sales" />


</BarChart>


</ResponsiveContainer>


</div>
{/* Sales Table */}

<div className="mt-10 bg-white rounded-2xl shadow-lg overflow-hidden">


<div className="p-6">

<h2 className="text-2xl font-bold">
Recent Sales
</h2>

</div>



<table className="w-full">


<thead className="bg-gray-100">

<tr>

<th className="p-4 text-left">
Customer
</th>

<th className="p-4 text-left">
Product
</th>

<th className="p-4 text-left">
Quantity
</th>

<th className="p-4 text-left">
Amount
</th>

</tr>

</thead>



<tbody>


{sales.map((sale)=>(


<tr
key={sale.id}
className="border-t hover:bg-gray-50"
>


<td className="p-4">
{sale.customerName}
</td>


<td className="p-4">
{sale.product}
</td>


<td className="p-4">
{sale.quantity}
</td>


<td className="p-4 font-bold">
Rs. {sale.amount}
</td>


</tr>


))}


</tbody>


</table>


</div>



</main>

);

}
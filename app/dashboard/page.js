"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  collection,
  getDocs,
  query,
  orderBy,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

import { db } from "../../lib/firebase";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function Dashboard() {

  // ==========================
  // STATES
  // ==========================

  const [loading, setLoading] = useState(true);

  const [sales, setSales] = useState([]);

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const [purchases, setPurchases] = useState([]);

  const [salesChart, setSalesChart] = useState([]);

  const [topProducts, setTopProducts] = useState([]);

  const [filter, setFilter] = useState("month");

  const [stats, setStats] = useState({

    totalSales: 0,

    totalOrders: 0,

    totalProducts: 0,

    totalStock: 0,

    totalPurchase: 0,

    cashInHand: 0,

    averageOrderValue: 0,

    inventoryValue: 0,

    todaySales: 0,

    todayOrders: 0,

    weekSales: 0,

    weekOrders: 0,

    monthSales: 0,

    monthOrders: 0,

  });

  useEffect(() => {

    loadDashboard();

  }, []);
  async function updateOrderStatus(id,status){

try{

const orderRef = doc(
db,
"orders",
id
);


await updateDoc(orderRef,{

status:status

});


setOrders((prev)=>

prev.map(order=>

order.id===id

?

{
...order,
status:status
}

:

order

)

);


}
catch(error){

console.log(error);

}

}
async function deleteOrder(id){

const confirmDelete = window.confirm(
"Are you sure you want to delete this order?"
);


if(!confirmDelete){
return;
}


try{


await deleteDoc(
doc(db,"orders",id)
);



setOrders((prev)=>

prev.filter(
(order)=>order.id !== id
)

);



alert("Order Deleted Successfully");


}

catch(error){

console.log(error);

alert("Delete Failed");

}


}

  async function loadDashboard() {
    // ORDERS

const orderSnapshot = await getDocs(
  query(
    collection(db,"orders"),
    orderBy("createdAt","desc")
  )
);


const orderData = orderSnapshot.docs.map(doc=>({

id:doc.id,
...doc.data(),

}));


setOrders(orderData);

    try {

      setLoading(true);

      // SALES

      const salesSnapshot = await getDocs(

        query(

          collection(db, "sales"),

          orderBy("createdAt", "desc")

        )

      );

      const salesData = salesSnapshot.docs.map(doc => ({

        id: doc.id,

        ...doc.data(),

      }));

      setSales(salesData);

      // PRODUCTS

      const productSnapshot = await getDocs(
        collection(db, "products")
      );

      const productData = productSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProducts(productData);

      // PURCHASES

      const purchaseSnapshot = await getDocs(
        collection(db, "purchases")
      );

      const purchaseData = purchaseSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPurchases(purchaseData);

      calculateStats(
        salesData,
        productData,
        purchaseData
      );

      createSalesChart(salesData);

      calculateTopProducts(salesData);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  }
  // ===============================
// CALCULATE DASHBOARD STATS
// ===============================

function calculateStats(
  salesData,
  productData,
  purchaseData
) {

  const today = new Date();

  let totalSales = 0;
  let totalPurchase = 0;
  let totalStock = 0;
  let inventoryValue = 0;

  let todaySales = 0;
  let todayOrders = 0;

  let weekSales = 0;
  let weekOrders = 0;

  let monthSales = 0;
  let monthOrders = 0;

  // SALES

  salesData.forEach((sale) => {

    const amount = Number(
      sale.amount ||
      sale.total ||
      0
    );

    totalSales += amount;

    if (!sale.createdAt?.seconds) return;

    const saleDate = new Date(
      sale.createdAt.seconds * 1000
    );

    // TODAY

    if (
      saleDate.toDateString() ===
      today.toDateString()
    ) {

      todaySales += amount;
      todayOrders++;

    }

    // THIS WEEK

    const diffDays = Math.floor(

      (today - saleDate) /
      (1000 * 60 * 60 * 24)

    );

    if (diffDays <= 7) {

      weekSales += amount;
      weekOrders++;

    }

    // THIS MONTH

    if (

      saleDate.getMonth() ===
      today.getMonth()

      &&

      saleDate.getFullYear() ===
      today.getFullYear()

    ) {

      monthSales += amount;
      monthOrders++;

    }

  });

  // PURCHASES

  purchaseData.forEach((item) => {

    totalPurchase += Number(
      item.amount ||
      item.total ||
      0
    );

  });

  // PRODUCTS

  productData.forEach((item) => {

    const stock = Number(item.stock || 0);

    totalStock += stock;

    inventoryValue +=

      stock *

      Number(

        item.purchasePrice ||

        item.costPrice ||

        item.price ||

        0

      );

  });

  const totalOrders = salesData.length;

  const averageOrderValue =

    totalOrders > 0

      ? totalSales / totalOrders

      : 0;

  setStats({

    totalSales,

    totalOrders,

    totalProducts:
      productData.length,

    totalStock,

    totalPurchase,

    cashInHand:
      totalSales - totalPurchase,

    averageOrderValue,

    inventoryValue,

    todaySales,

    todayOrders,

    weekSales,

    weekOrders,

    monthSales,

    monthOrders,

  });

}
// ===============================
// CREATE SALES CHART
// ===============================

function createSalesChart(salesData) {

  const chart = {};

  salesData.forEach((sale) => {

    if (!sale.createdAt?.seconds) return;

    const date = new Date(
      sale.createdAt.seconds * 1000
    );

    const day = date.toLocaleDateString(
      "en-GB",
      {
        day: "2-digit",
        month: "short",
      }
    );

    if (!chart[day]) {
      chart[day] = 0;
    }

    chart[day] += Number(
      sale.amount ||
      sale.total ||
      0
    );

  });

  const result = Object.keys(chart).map((day) => ({

    day,

    revenue: chart[day],

  }));

  setSalesChart(result);

}

// ===============================
// TOP SELLING PRODUCTS
// ===============================

function calculateTopProducts(salesData) {

  const productMap = {};

  salesData.forEach((sale) => {

    const name =

      sale.productName ||

      sale.product ||

      "Unknown";

    const qty = Number(
      sale.quantity || 1
    );

    if (!productMap[name]) {

      productMap[name] = 0;

    }

    productMap[name] += qty;

  });

  const result =

    Object.keys(productMap)

      .map((name) => ({

        name,

        quantity: productMap[name],

      }))

      .sort(
        (a, b) =>
          b.quantity - a.quantity
      )

      .slice(0, 5);

  setTopProducts(result);

}

// ===============================
// FORMAT MONEY
// ===============================

function formatMoney(value) {

  return new Intl.NumberFormat(

    "en-PK",

    {

      style: "currency",

      currency: "PKR",

      maximumFractionDigits: 0,

    }

  ).format(value);

}
// ===============================
// LOADING SCREEN
// ===============================

if (loading) {

  return (

    <div className="
    min-h-screen
    flex
    items-center
    justify-center
    bg-gradient-to-br
    from-slate-100
    via-white
    to-blue-100
">
      <div className="
      bg-white
      p-10
      rounded-2xl
      shadow-xl
      text-center
      ">

        <h2 className="
        text-3xl
        font-bold
        text-gray-800
        ">

          Loading WS Royal Bags...

        </h2>

        <p className="
        text-gray-500
        mt-3
        ">

          Fetching Business Data...

        </p>

      </div>

    </div>

  );

}

// ===============================
// RETURN START
// ===============================

return (

<main
  className="
    min-h-screen
    bg-[#f5f7fb]
    p-6
  "
>

<div className="
max-w-7xl
mx-auto
">

<h1 className="
text-2xl
font-bold
text-gray-900
">

WS Royal Bags

</h1>

<p className="
text-gray-500
mt-1
">

Luxury Business Analytics Dashboard

</p>

<div className="
text-sm
text-gray-500
mt-2
">

Today's Date :

{

new Date().toLocaleString()

}

</div>

{/* KPI CARDS */}

<div className="
grid
grid-cols-1
md:grid-cols-2
lg:grid-cols-4
gap-5
mt-8
">

{/* Total Sales */}

<div className="
bg-white
rounded-2xl
shadow-lg
p-6
border-t-4
border-green-500
hover:shadow-xl
transition-all
duration-300
">

<p className="text-gray-500">

Total Sales

</p>

<h2 className="
text-2xl
font-bold
text-green-600
mt-2
">

{

formatMoney(stats.totalSales)

}

</h2>

</div>

{/* Today's Sales */}

<div className="
bg-white
rounded-2xl
shadow-lg
p-6
border-t-4
border-blue-500
hover:shadow-xl
transition-all
duration-300
">

<p className="text-gray-500">

Today's Sales

</p>

<h2 className="
text-2xl
font-bold
text-blue-600
mt-2
">

{

formatMoney(stats.todaySales)

}

</h2>

<p className="text-sm text-gray-400">

{

stats.todayOrders

}

Orders

</p>

</div>

{/* Week Sales */}

<div className="
bg-white
rounded-2xl
shadow-lg
p-6
border-t-4
border-purple-500
hover:shadow-xl
transition-all
duration-300
">
<p className="text-gray-500">

This Week

</p>

<h2 className="
text-2xl
font-bold
text-purple-600
mt-2
">

{

formatMoney(stats.weekSales)

}

</h2>

<p className="text-sm text-gray-400">

{

stats.weekOrders

}

Orders

</p>

</div>

{/* Month Sales */}

<div className="
bg-white
rounded-2xl
shadow-lg
p-6
border-t-4
border-red-500
hover:shadow-xl
transition-all
duration-300
">
<p className="text-gray-500">

This Month

</p>

<h2 className="
text-2xl
font-bold
text-orange-600
mt-2
">

{

formatMoney(stats.monthSales)

}

</h2>

<p className="text-sm text-gray-400">

{

stats.monthOrders

}

Orders

</p>

</div>

</div>
{/* ===========================
REVENUE CHART + INVENTORY
=========================== */}

<div
className="
grid
grid-cols-1
lg:grid-cols-3
gap-6
mt-8
">

{/* Revenue Chart */}

<div
className="
lg:col-span-2
bg-white
rounded-2xl
shadow-lg
border
border-gray-100
p-6
hover:shadow-xl
transition-all
duration-300
"
>

<h2
className="
text-xl
font-extrabold
text-gray-800
mb-5
"
>
Revenue Overview
</h2>

<ResponsiveContainer
width="100%"
height={280}
>

<LineChart
data={salesChart}
>

<CartesianGrid
strokeDasharray="3 3"
/>

<XAxis
dataKey="day"
/>

<YAxis
allowDecimals={false}
/>

<Tooltip/>

<Line
type="monotone"
dataKey="revenue"
stroke="#16a34a"
strokeWidth={3}
dot={{ r: 5 }}
/>
</LineChart>

</ResponsiveContainer>

</div>

{/* Inventory Card */}

<div
className="
bg-white
rounded-2xl
shadow-lg
border
border-gray-100
p-6
hover:shadow-xl
transition-all
duration-300
"
>

<h2
className="
text-xl
font-extrabold
text-gray-800
mb-6
">
Inventory Intelligence
</h2>

<div className="space-y-6">

<div>

<p className="text-gray-500">

Inventory Value

</p>

<h3
className="
text-2xl
font-bold
text-indigo-600
mt-2
">

{

formatMoney(
stats.inventoryValue
)

}

</h3>

</div>

<div>

<p className="text-gray-500">

Available Stock

</p>

<h3
className="
text-2xl
font-bold
text-green-600
mt-2
">

{

stats.totalStock

}

</h3>

</div>

<div>

<p className="text-gray-500">

Average Order

</p>

<h3
className="
text-2xl
font-bold
text-orange-600
mt-2
">

{

formatMoney(
stats.averageOrderValue
)

}

</h3>

</div>

</div>

</div>

</div>
{/* ===========================
BEST SELLING + LOW STOCK
=========================== */}

<div
className="
grid
grid-cols-1
lg:grid-cols-2
gap-6
mt-8
">

{/* Best Selling Bags */}

<div
className="
bg-white
rounded-2xl
shadow-lg
border
border-gray-100
p-6
hover:shadow-xl
transition-all
duration-300
"
>

<h2
className="
text-lg
font-bold
text-gray-800
mb-4
"
>
👜 Best Selling Bags
</h2>

<ResponsiveContainer
width="100%"
height={260}
>

<BarChart
data={topProducts}
>

<XAxis
dataKey="name"
hide
/>

<YAxis
allowDecimals={false}
/>

<Tooltip/>

<Bar
dataKey="quantity"
fill="#1e3a8a"
radius={[5,5,0,0]}
/>
</BarChart>

</ResponsiveContainer>

</div>

{/* Low Stock */}

<div
className="
bg-white
rounded-2xl
shadow-lg
border
border-gray-100
p-6
hover:shadow-xl
transition-all
duration-300
"
>

<h2
className="
text-lg
font-bold
mb-4
text-red-600
">

⚠️ Low Stock Alerts

</h2>

<div
className="
overflow-x-auto
">

<table
className="
w-full
">

<thead>

<tr
className="
border-b
text-gray-600
">

<th className="p-3 text-left">

Product

</th>

<th className="p-3 text-left">

Category

</th>

<th className="p-3 text-center">

Stock

</th>

</tr>

</thead>

<tbody>
  {products
    .filter((item) => Number(item.stock || 0) <= 5)
    .map((item) => (
      <tr key={item.id} className="border-b">
        <td className="px-3 py-2 text-sm">
          {item.productName || item.name || "Unknown"}
        </td>

        <td className="px-3 py-2 text-sm">
          {item.category || "Bags"}
        </td>

        <td className="p-3 text-center">
          <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full font-bold">
            {item.stock || 0}
          </span>
        </td>
      </tr>
    ))}
</tbody>

</table>

</div>

</div>

</div>
{/* ===========================
RECENT SALES
=========================== */}

<div
className="
bg-white
rounded-2xl
shadow-lg
border
border-gray-100
p-6
hover:shadow-xl
transition-all
duration-300
"
>
<div
className="
flex
justify-between
items-center
mb-6
">

<h2
className="
text-xl
font-bold
"
>
  
Recent Sales Transactions
</h2>
{/* WEBSITE ORDERS */}

<div className="bg-white rounded-2xl shadow-lg p-6 mt-8">

<h2 className="text-xl font-bold mb-5">
📦 Website Orders
</h2>


<div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

<div className="bg-yellow-50 p-4 rounded-xl">
<p className="text-gray-500">
Processing
</p>

<h3 className="text-2xl font-bold text-yellow-600">
{
orders.filter(
(order)=>order.status==="Processing"
).length
}
</h3>
</div>


<div className="bg-blue-50 p-4 rounded-xl">
<p className="text-gray-500">
Shipped
</p>

<h3 className="text-2xl font-bold text-blue-600">
{
orders.filter(
(order)=>order.status==="Shipped"
).length
}
</h3>
</div>


<div className="bg-green-50 p-4 rounded-xl">
<p className="text-gray-500">
Delivered
</p>

<h3 className="text-2xl font-bold text-green-600">
{
orders.filter(
(order)=>order.status==="Delivered"
).length
}
</h3>
</div>


<div className="bg-red-50 p-4 rounded-xl">
<p className="text-gray-500">
Cancelled
</p>

<h3 className="text-2xl font-bold text-red-600">
{
orders.filter(
(order)=>order.status==="Cancelled"
).length
}
</h3>
</div>

</div>


<div className="overflow-x-auto rounded-xl border">

<table className="w-full min-w-[900px]">

<thead>

<tr className="border-b text-gray-600">

<th className="p-3 text-left">
Customer
</th>

<th className="p-3 text-left">
Product
</th>

<th className="p-3">
Order ID
</th>

<th className="p-3">
Amount
</th>

<th className="p-3">
Status
</th>
<th className="p-3">
Action
</th>

</tr>

</thead>


<tbody>

{
orders.map((order)=>(

<tr key={order.id} className="border-b">

<td className="p-3">
{order.customerName}
</td>


<td className="p-3 w-64">
  <div className="font-semibold whitespace-nowrap">
    {order.productName}
  </div>
</td>


<td className="p-3 font-semibold text-blue-600">

<Link
href={`/orders/${order.id}`}
className="hover:underline"
>

{
order.orderCode ||
order.orderNumber ||
order.orderId ||
order.id
}

</Link>

</td>


<td className="p-3 font-bold">
Rs {order.amount}
</td>


<td className="p-3">

<span
className={`
px-3
py-1
rounded-full
text-sm
font-semibold
${
order.status==="Delivered"
?
"bg-green-100 text-green-700"
:
order.status==="Shipped"
?
"bg-blue-100 text-blue-700"
:
order.status==="Cancelled"
?
"bg-red-100 text-red-700"
:
"bg-yellow-100 text-yellow-700"
}
`}
>

{order.status || "Processing"}

</span>

</td>
<td className="p-3 text-center">

<div className="flex gap-2 justify-center">


<Link href={`/dashboard/orders/${order.id}`}>

<button
className="
bg-black
text-white
px-4
py-2
rounded-lg
text-sm
"
>
View
</button>

</Link>



<button

onClick={()=>deleteOrder(order.id)}

className="
bg-red-600
text-white
px-4
py-2
rounded-lg
text-sm
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

</div>


<select

value={filter}

onChange={(e)=>setFilter(e.target.value)}

className="
border
rounded-lg
px-4
py-2
"

>

<option value="month">

This Month

</option>

<option value="week">

This Week

</option>

<option value="all">

All Time

</option>

</select>

</div>

<div
className="
overflow-x-auto
">

<table
className="
w-full
">

<thead>

<tr
className="
border-b
text-gray-600
">

<th className="p-3 text-left">

Customer

</th>

<th className="p-3 text-left">

Phone

</th>

<th className="p-3 text-left">

Address

</th>

<th className="p-3 text-left">

Bag

</th>

<th className="p-3 text-center">

Qty

</th>

<th className="p-3 text-right">

Amount

</th>

<th className="p-3 text-center">

Payment

</th>

<th className="p-3 text-center">

Status

</th>

<th className="p-3 text-center">

Date & Time

</th>

</tr>

</thead>

<tbody>

{

sales

.slice(0,10)

.map((sale)=>(

<tr

key={sale.id}

className="border-b"

>

<td className="px-3 py-2 text-sm">

{

sale.customerName ||

"Walk In Customer"

}

</td>

<td className="px-3 py-2 text-sm">

{

sale.phone ||

"-"

}

</td>

<td className="px-3 py-2 text-sm">

{

sale.address ||

"-"

}

</td>

<td className="p-3 font-semibold">

{

sale.productName ||

sale.product ||

"-"

}

</td>

<td className="p-3 text-center">

{

sale.quantity ||

1

}

</td>

<td
className="
p-3
text-right
font-bold
text-green-600
">

{

formatMoney(

sale.amount ||

sale.total ||

0

)

}

</td>

<td className="p-3 text-center">

<span
className="
bg-blue-100
text-blue-700
px-3
py-1
rounded-full
text-sm
">

{

sale.paymentMethod ||

"Cash"

}

</span>

</td>
<td className="p-3 text-center">

<span
className="
bg-yellow-100
text-yellow-700
px-3
py-1
rounded-full
text-sm
"
>

{

sale.orderStatus ||

"Pending"

}

</span>

</td>

<td className="p-3 text-center">

{

sale.createdAt?.seconds

?

new Date(

sale.createdAt.seconds*1000

).toLocaleString()

:

"-"

}

</td>

</tr>

))

}

</tbody>

</table>

</div>

</div>
{/* ===========================
CUSTOMER ANALYTICS
=========================== */}

<div
className="
grid
grid-cols-1
md:grid-cols-3
gap-6
mt-8
">

<div className="bg-white rounded-2xl shadow-lg p-6">

<p className="text-gray-500">

Total Customers

</p>

<h2 className="text-3xl font-bold mt-3 text-indigo-600">

{

new Set(

sales.map(item=>item.customerName)

).size

}

</h2>

</div>

<div className="bg-white rounded-2xl shadow-lg p-6">

<p className="text-gray-500">

Online Sales

</p>

<h2 className="text-3xl font-bold mt-3 text-green-600">

{

formatMoney(

sales

.filter(item=>item.paymentMethod==="Online")

.reduce(

(sum,item)=>

sum+Number(item.amount||item.total||0),

0

)

)

}

</h2>

</div>

<div className="bg-white rounded-2xl shadow-lg p-6">

<p className="text-gray-500">

Cash Sales

</p>

<h2 className="text-3xl font-bold mt-3 text-blue-600">

{

formatMoney(

sales

.filter(item=>item.paymentMethod==="Cash")

.reduce(

(sum,item)=>

sum+Number(item.amount||item.total||0),

0

)

)

}

</h2>

</div>

</div>

{/* ===========================
EXPORT
=========================== */}

<div
className="
mt-8
bg-white
rounded-2xl
shadow-lg
p-6
flex
justify-between
items-center
">

<div>

<h2 className="text-xl font-bold">

Export Business Report

</h2>

<p className="text-gray-500 mt-2">

Download Sales Report

</p>

</div>

<button

className="
bg-black
text-white
px-6
py-3
rounded-xl
"

onClick={()=>{

const csv = [

[
"Customer",
"Phone",
"Address",
"Bag",
"Quantity",
"Amount",
"Payment",
"Status",
"Date"
],
...sales.map(item => [

item.customerName || "",

item.phone || "",

item.address || "",

item.productName || item.product || "",

item.quantity || 1,

item.amount || item.total || 0,

item.paymentMethod || "Cash",
item.orderStatus || "Pending",

item.createdAt?.seconds
? new Date(item.createdAt.seconds * 1000).toLocaleString()
: ""

])

]

.map(row => row.join(","))

.join("\n");

const blob=new Blob([csv],{

type:"text/csv"

});

const url=URL.createObjectURL(blob);

const a=document.createElement("a");

a.href=url;

a.download="WS_Royal_Bags_Report.csv";

a.click();

}}

>

Export CSV

</button>

</div>
<button

className="
bg-blue-700
text-white
px-6
py-3
rounded-xl
ml-3
"

onClick={()=>{

const csv = [

[
"Customer",
"Phone",
"Address",
"Product",
"Order ID",
"Amount",
"Payment",
"Status",
"Date"
],

...orders.map(order=>[

order.customerName || "",

order.phone || "",

order.address || "",

order.productName || "",

order.orderId || order.id,

order.amount || 0,

order.paymentMethod || "",

order.status || "",

order.createdAt?.seconds
?
new Date(
order.createdAt.seconds * 1000
).toLocaleString()
:
""

])

]

.map(row=>row.join(","))

.join("\n");


const blob = new Blob([csv],{
type:"text/csv"
});


const url = URL.createObjectURL(blob);


const a = document.createElement("a");

a.href=url;

a.download="WS_Royal_Website_Orders.csv";

a.click();

}}

>

Export Website Orders CSV

</button>

{/* ===========================
AI INSIGHT
=========================== */}

<div
className="
mt-8
bg-gradient-to-r
from-[#0f172a]
to-[#1e3a8a]
text-white
rounded-2xl
p-8
"
>

<h2 className="text-2xl font-bold">

WS Royal Bags AI Business Insight

</h2>

<div
className="
grid
grid-cols-3
gap-6
mt-6
">

<div>

<p className="text-gray-300">

Revenue

</p>

<h3 className="text-2xl font-bold mt-2">

{formatMoney(stats.totalSales)}

</h3>

</div>

<div>

<p className="text-gray-300">

Stock

</p>

<h3 className="text-2xl font-bold mt-2">

{stats.totalStock}

</h3>

</div>

<div>

<p className="text-gray-300">

Orders

</p>

<h3 className="text-2xl font-bold mt-2">

{stats.totalOrders}

</h3>

</div>

</div>

</div>

<div
className="
text-center
text-gray-500
mt-10
pb-5
">

© {new Date().getFullYear()} WS Royal Bags

</div>

</div>

</main>

);

}
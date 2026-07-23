"use client";

import { useEffect, useState } from "react";

import {
  collection,
  getDocs,
  query,
  orderBy,
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

  async function loadDashboard() {

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
    bg-gray-100
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

<main className="
min-h-screen
bg-gray-100
p-6
">

<div className="
max-w-7xl
mx-auto
">

<h1 className="
text-4xl
font-bold
text-gray-800
">

WS Royal Bags

</h1>

<p className="
text-gray-500
mt-2
">

Business Intelligence Dashboard

</p>

<div className="
text-sm
text-gray-500
mt-2
">

Today's Date :

{

new Date().toLocaleDateString()

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
p-5
">

<p className="text-gray-500">

Total Sales

</p>

<h2 className="
text-3xl
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
p-5
">

<p className="text-gray-500">

Today's Sales

</p>

<h2 className="
text-3xl
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
p-5
">

<p className="text-gray-500">

This Week

</p>

<h2 className="
text-3xl
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
p-5
">

<p className="text-gray-500">

This Month

</p>

<h2 className="
text-3xl
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
p-6
">

<h2
className="
text-xl
font-bold
mb-5
">

Revenue Overview

</h2>

<ResponsiveContainer
width="100%"
height={320}
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

<YAxis/>

<Tooltip/>

<Line
type="monotone"
dataKey="revenue"
stroke="#2563eb"
strokeWidth={3}
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
p-6
">

<h2
className="
text-xl
font-bold
mb-5
">

Inventory Intelligence

</h2>

<div className="space-y-5">

<div>

<p className="text-gray-500">

Inventory Value

</p>

<h3
className="
text-3xl
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
text-3xl
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
p-6
">

<h2
className="
text-xl
font-bold
mb-5
">

Best Selling Bags

</h2>

<ResponsiveContainer
width="100%"
height={300}
>

<BarChart
data={topProducts}
>

<XAxis
dataKey="name"
hide
/>

<YAxis/>

<Tooltip/>

<Bar
dataKey="quantity"
fill="#2563eb"
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
p-6
">

<h2
className="
text-xl
font-bold
mb-5
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

{

products

.filter(

item => Number(item.stock || 0) <= 5

)

.map(item => (

<tr
key={item.id}
className="border-b"
>

<td className="p-3">

{

item.productName ||

item.name ||

"Unknown"

}

</td>

<td className="p-3">

{

item.category ||

"Bags"

}

</td>

<td
className="
p-3
text-center
font-bold
text-red-600
">

{

item.stock || 0

}

</td>

</tr>

))

}

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
mt-8
bg-white
rounded-2xl
shadow-lg
p-6
">

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
">

Recent Sales Transactions

</h2>

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

Date

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

<td className="p-3">

{

sale.customerName ||

"Walk In Customer"

}

</td>

<td className="p-3">

{

sale.phone ||

"-"

}

</td>

<td className="p-3">

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

{

sale.createdAt?.seconds

?

new Date(

sale.createdAt.seconds*1000

).toLocaleDateString()

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

item.createdAt?.seconds
? new Date(item.createdAt.seconds * 1000).toLocaleDateString()
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

{/* ===========================
AI INSIGHT
=========================== */}

<div
className="
mt-8
bg-gradient-to-r
from-gray-900
to-gray-700
text-white
rounded-2xl
p-8
">

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
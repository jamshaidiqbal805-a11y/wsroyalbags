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
} from "../../lib/firebase";


import {
ResponsiveContainer,
LineChart,
Line,
CartesianGrid,
XAxis,
YAxis,
Tooltip,
BarChart,
Bar
} from "recharts";



export default function Dashboard(){


const [loading,setLoading]=useState(true);


const [sales,setSales]=useState([]);

const [orders,setOrders]=useState([]);

const [products,setProducts]=useState([]);

const [purchases,setPurchases]=useState([]);


const [salesChart,setSalesChart]=useState([]);

const [topProducts,setTopProducts]=useState([]);



const [stats,setStats]=useState({

totalSales:0,

todaySales:0,

weeklySales:0,

monthlySales:0,

totalOrders:0,

totalProducts:0,

totalStock:0,

totalPurchase:0,

cashInHand:0,

profit:0,

inventoryValue:0,

averageOrder:0,

lowStock:0,

customers:0

});





useEffect(()=>{

loadDashboard();

},[]);





async function loadCollection(name){


const snap = await getDocs(

query(

collection(db,name),

orderBy(
"createdAt",
"desc"
)

)

);


return snap.docs.map(item=>(

{

id:item.id,

...item.data()

}

));


}
async function loadDashboard(){


try{


setLoading(true);



const [

salesData,

ordersData,

productsData,

purchaseData

]=await Promise.all([


loadCollection("sales"),

loadCollection("orders"),

loadCollection("products"),

loadCollection("purchases")


]);



setSales(salesData);

setOrders(ordersData);

setProducts(productsData);

setPurchases(purchaseData);




calculateStats(

salesData,

ordersData,

productsData,

purchaseData

);



createSalesChart(
salesData
);



calculateTopProducts(
salesData
);



}

catch(error){

console.log(
"Dashboard Error:",
error
);

}

finally{

setLoading(false);

}


}






// ===============================
// ERP BUSINESS CALCULATIONS
// ===============================


function calculateStats(

salesData,

ordersData,

productsData,

purchaseData

){


let totalSales=0;

let todaySales=0;

let weeklySales=0;

let monthlySales=0;

let totalPurchase=0;

let totalStock=0;

let inventoryValue=0;

let profit=0;



const now=new Date();



salesData.forEach((sale)=>{


const amount=Number(

sale.amount ||

sale.total ||

0

);



totalSales += amount;




// PROFIT

profit += Number(

sale.profit ||

0

);




// DATE CALCULATION

if(sale.createdAt?.seconds){


const saleDate=new Date(

sale.createdAt.seconds*1000

);



const diffTime=

now-saleDate;



const diffDays=

diffTime/(1000*60*60*24);



if(

saleDate.toDateString()

===

now.toDateString()

){

todaySales += amount;

}



if(diffDays<=7){

weeklySales += amount;

}



if(

saleDate.getMonth()

===

now.getMonth()

&&

saleDate.getFullYear()

===

now.getFullYear()

){

monthlySales += amount;

}


}


});







purchaseData.forEach((item)=>{


totalPurchase += Number(

item.amount ||

item.total ||

0

);


});






productsData.forEach((item)=>{


const qty=Number(

item.stock ||

0

);



totalStock += qty;



inventoryValue +=

qty *

Number(

item.purchasePrice ||

item.costPrice ||

0

);



});






const lowStock=

productsData.filter(

(item)=>

Number(item.stock || 0)<=5

).length;






const customers =

[

...new Set(

ordersData.map(

(item)=>

item.customerName

).filter(Boolean)

)

].length;







setStats({

totalSales,

todaySales,

weeklySales,

monthlySales,

totalOrders:ordersData.length,

totalProducts:productsData.length,

totalStock,

totalPurchase,

cashInHand:

totalSales-totalPurchase,

profit,

inventoryValue,

averageOrder:

salesData.length

?

totalSales/salesData.length

:

0,

lowStock,

customers


});



}














// ===============================
// SALES CHART
// ===============================


function createSalesChart(data){


const chart={};



data.forEach((sale)=>{


if(!sale.createdAt?.seconds)

return;



const date=new Date(

sale.createdAt.seconds*1000

);



const day=date.toLocaleDateString(

"en-GB",

{

day:"2-digit",

month:"short"

}

);



if(!chart[day]){

chart[day]=0;

}



chart[day]+=Number(

sale.amount ||

sale.total ||

0

);



});




setSalesChart(

Object.keys(chart).map(day=>(

{

day,

revenue:chart[day]

}

))

);



}





// ===============================
// TOP PRODUCTS
// ===============================


function calculateTopProducts(data){


const map={};



data.forEach((sale)=>{


const name=

sale.productName ||

sale.product ||

"Unknown";



const qty=Number(

sale.quantity ||

1

);



if(!map[name]){

map[name]=0;

}



map[name]+=qty;



});




const result=

Object.keys(map)

.map(name=>(

{

name,

quantity:map[name]

}

))

.sort(

(a,b)=>

b.quantity-a.quantity

)

.slice(0,5);




setTopProducts(result);



}





// ===============================
// UPDATE ORDER STATUS
// ===============================


async function updateOrderStatus(id,status){


try{


await updateDoc(

doc(db,"orders",id),

{

status

}

);



setOrders(prev=>

prev.map(order=>

order.id===id

?

{

...order,

status

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






// ===============================
// DELETE ORDER
// ===============================


async function deleteOrder(id){


const confirmDelete=window.confirm(

"Delete this order?"

);



if(!confirmDelete)

return;



await deleteDoc(

doc(db,"orders",id)

);



setOrders(prev=>

prev.filter(

item=>item.id!==id

)

);


}




// ===============================
// FORMAT MONEY
// ===============================


function formatMoney(value){


return new Intl.NumberFormat(

"en-PK",

{

style:"currency",

currency:"PKR",

maximumFractionDigits:0

}

).format(value);


}
// ===============================
// UI
// ===============================


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


<div className="
bg-white/10
backdrop-blur-xl
border
border-white/20
rounded-3xl
p-10
text-center
">


<h2 className="
text-3xl
font-black
text-[#D4AF37]
">

WS Royal Bags

</h2>


<p className="
mt-3
text-gray-300
">

Loading Intelligence Dashboard...

</p>


</div>


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



<div className="
flex
justify-between
items-center
mb-8
">


<div>

<h1 className="
text-4xl
font-black
text-[#D4AF37]
">

WS Royal Bags

</h1>


<p className="
text-gray-300
mt-2
">

Luxury Business Intelligence Dashboard

</p>


</div>



<div className="
bg-white/10
border
border-white/20
rounded-xl
px-5
py-3
">

{

new Date().toLocaleDateString()

}

</div>



</div>



<div className="
grid
grid-cols-1
md:grid-cols-2
lg:grid-cols-4
gap-6
">


{/* TOTAL REVENUE */}

<div className="
bg-white/10
border
border-white/20
rounded-3xl
p-6
backdrop-blur-xl
hover:border-[#D4AF37]
transition
">


<p className="text-gray-300 text-sm">
💰 Total Revenue
</p>

<h2 className="
text-3xl
font-black
text-[#D4AF37]
mt-3
">

{formatMoney(stats.totalSales)}

</h2>

<p className="
text-xs
text-green-400
mt-3
">

Business Lifetime Sales

</p>

</div>





{/* TODAY SALE */}

<div className="
bg-white/10
border
border-white/20
rounded-3xl
p-6
backdrop-blur-xl
hover:border-green-400
transition
">


<p className="text-gray-300 text-sm">
📅 Today's Sale
</p>


<h2 className="
text-3xl
font-black
text-green-400
mt-3
">

{formatMoney(stats.todaySales)}

</h2>


<p className="text-xs text-gray-400 mt-3">

Daily Performance

</p>


</div>






{/* WEEKLY SALE */}

<div className="
bg-white/10
border
border-white/20
rounded-3xl
p-6
backdrop-blur-xl
hover:border-blue-400
transition
">


<p className="text-gray-300 text-sm">
📈 Weekly Sale
</p>


<h2 className="
text-3xl
font-black
text-blue-400
mt-3
">

{formatMoney(stats.weeklySales)}

</h2>


<p className="text-xs text-gray-400 mt-3">

Last 7 Days Revenue

</p>


</div>







{/* MONTHLY SALE */}

<div className="
bg-white/10
border
border-white/20
rounded-3xl
p-6
backdrop-blur-xl
hover:border-purple-400
transition
">


<p className="text-gray-300 text-sm">
🗓 Monthly Sale
</p>


<h2 className="
text-3xl
font-black
text-purple-300
mt-3
">

{formatMoney(stats.monthlySales)}

</h2>


<p className="text-xs text-gray-400 mt-3">

Current Month

</p>


</div>



</div>






{/* SECOND KPI ROW */}


<div className="
grid
grid-cols-1
md:grid-cols-2
lg:grid-cols-4
gap-6
mt-6
">





<div className="
bg-white/10
border
border-white/20
rounded-3xl
p-6
backdrop-blur-xl
">


<p className="text-gray-300">
📦 Orders
</p>


<h2 className="
text-4xl
font-black
text-blue-300
mt-3
">

{stats.totalOrders}

</h2>


</div>






<div className="
bg-white/10
border
border-white/20
rounded-3xl
p-6
backdrop-blur-xl
">


<p className="text-gray-300">
👥 Customers
</p>


<h2 className="
text-4xl
font-black
text-yellow-300
mt-3
">

{stats.customers}

</h2>


</div>






<div className="
bg-white/10
border
border-white/20
rounded-3xl
p-6
backdrop-blur-xl
">


<p className="text-gray-300">
💎 Profit
</p>


<h2 className="
text-3xl
font-black
text-green-400
mt-3
">

{formatMoney(stats.profit)}

</h2>


</div>







<div className="
bg-white/10
border
border-white/20
rounded-3xl
p-6
backdrop-blur-xl
">


<p className="text-gray-300">
⚠ Low Stock
</p>


<h2 className="
text-4xl
font-black
text-red-400
mt-3
">

{stats.lowStock}

</h2>


</div>


</div>






{/* INVENTORY */}

<div className="
group
bg-white/10
border
border-white/20
rounded-3xl
p-6
backdrop-blur-xl
hover:border-purple-400
transition-all
duration-300
hover:-translate-y-1
">


<p className="
text-gray-300
text-sm
">

🏦 Inventory Value

</p>


<h2 className="
text-2xl
font-black
text-purple-300
mt-3
">

{formatMoney(stats.inventoryValue)}

</h2>


<div className="
mt-4
text-xs
text-gray-400
">

Current Asset Value


</div>

// ===============================
// CHARTS SECTION
</div>


<div className="
grid
grid-cols-1
lg:grid-cols-2
gap-6
mt-8
">



<div className="
bg-white/10
border
border-white/20
rounded-3xl
p-6
backdrop-blur-xl
">


<h2 className="
text-xl
font-bold
text-[#D4AF37]
mb-5
">

Revenue Analytics

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
stroke="white"
/>


<YAxis
stroke="white"
/>


<Tooltip
contentStyle={{
background:"#020617",
borderRadius:"10px"
}}
/>


<Line

type="monotone"

dataKey="revenue"

stroke="#D4AF37"

strokeWidth={3}

/>


</LineChart>


</ResponsiveContainer>


</div>







<div className="
bg-white/10
border
border-white/20
rounded-3xl
p-6
backdrop-blur-xl
">


<h2 className="
text-xl
font-bold
text-[#D4AF37]
mb-5
">

Top Selling Bags

</h2>



<ResponsiveContainer
width="100%"
height={280}
>


<BarChart
data={topProducts}
>


<XAxis
dataKey="name"
hide
/>


<YAxis
stroke="white"
/>


<Tooltip/>


<Bar

dataKey="quantity"

fill="#D4AF37"

/>


</BarChart>


</ResponsiveContainer>



</div>



</div>





// ===============================
// INVENTORY SECTION
// ===============================


<div className="
grid
grid-cols-1
lg:grid-cols-2
gap-6
mt-8
">



<div className="
bg-white/10
border
border-white/20
rounded-3xl
p-6
backdrop-blur-xl
">


<h2 className="
text-xl
font-bold
text-[#D4AF37]
mb-5
">

Inventory Intelligence

</h2>



<div className="
space-y-5
">


<div>

<p className="text-gray-300">
Available Stock
</p>

<h3 className="
text-3xl
font-bold
">

{stats.totalStock}

</h3>

</div>



<div>

<p className="text-gray-300">
Average Order Value
</p>


<h3 className="
text-2xl
font-bold
">

{formatMoney(stats.averageOrder)}

</h3>


</div>




<div>

<p className="text-gray-300">
Cash In Hand
</p>


<h3 className="
text-2xl
font-bold
text-green-400
">

{formatMoney(stats.cashInHand)}

</h3>


</div>


</div>


</div>







<div className="
bg-white/10
border
border-white/20
rounded-3xl
p-6
backdrop-blur-xl
">


<h2 className="
text-xl
font-bold
text-red-400
mb-5
">

⚠ Low Stock Alerts

</h2>




<div className="space-y-2">


{

products

.filter(
item=>Number(item.stock || 0)<=5
)

.map(item=>(


<div

key={item.id}

className="
flex
justify-between
bg-black/20
rounded-xl
p-4
"


>


<span className="font-medium text-white">
  {item.productCode || "WS-000"} - {item.productName || item.name || "Product"}
</span>



<span className="
bg-red-500/20
text-red-300
px-3
py-1
rounded-full
font-bold
">


{

item.stock || 0

}


</span>



</div>


))


}



</div>


</div>

<div className="
mt-8
bg-white/10
border
border-white/20
rounded-3xl
p-6
backdrop-blur-xl
"></div>














</div>






<div className="
text-center
text-gray-400
mt-10
pb-6
">


© {new Date().getFullYear()} WS Royal Bags  
<br/>
Luxury ERP Intelligence System


</div>






</div>


</main>


);


}
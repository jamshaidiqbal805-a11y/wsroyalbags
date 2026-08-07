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



export default function Reports(){


const [loading,setLoading]=useState(true);


const [sales,setSales]=useState([]);

const [purchases,setPurchases]=useState([]);

const [activeTab,setActiveTab]=useState("sales");
const totalSales = sales.reduce(
(sum,item)=>
sum + Number(item.amount || item.total || 0),
0
);




const totalPurchase = purchases.reduce(
(sum,item)=>
sum + Number(item.amount || item.total || 0),
0
);


const totalProfit = sales.reduce(
(sum,item)=>
sum + Number(item.profit || 0),
0
);








useEffect(()=>{

loadReports();

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







async function loadReports(){


try{


const [
  salesData,
  purchaseData
] = await Promise.all([
  loadCollection("sales"),
  loadCollection("purchases")
]);

setSales(salesData);
setPurchases(purchaseData);



}

catch(error){

console.log(
"Reports Error:",
error
);

}


finally{

setLoading(false);

}


}







function exportCSV(data,fileName){


if(!data.length){

alert("No Data Found");

return;

}



const headers=Object.keys(data[0]);



const rows=[

headers.join(","),

...data.map(row=>

headers.map(key=>

`"${row[key] ?? ""}"`

).join(",")

)

];



const blob=new Blob(

[rows.join("\n")],

{
type:"text/csv"
}

);



const url=URL.createObjectURL(blob);



const link=document.createElement("a");


link.href=url;


link.download=fileName;


link.click();



URL.revokeObjectURL(url);


}







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

Loading Reports...

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

Reports Center

</h1>


<p className="
text-gray-300
mt-2
">
WS Royal Bags ERP Reports
</p>

<div className="
grid
grid-cols-1
md:grid-cols-3
gap-5
mt-8
">

  <div className="bg-white/10 border border-white/20 rounded-3xl p-5">
    <p className="text-gray-300">💰 Total Sales</p>
    <h2 className="text-3xl font-black text-[#D4AF37] mt-3">
      Rs {totalSales.toLocaleString()}
    </h2>
  </div>

  <div className="bg-white/10 border border-white/20 rounded-3xl p-5">
    <p className="text-gray-300">🛒 Purchases</p>
    <h2 className="text-3xl font-black text-purple-300 mt-3">
      Rs {totalPurchase.toLocaleString()}
    </h2>
  </div>

  <div className="bg-white/10 border border-white/20 rounded-3xl p-5">
    <p className="text-gray-300">📈 Profit</p>
    <h2 className="text-3xl font-black text-green-400 mt-3">
      Rs {totalProfit.toLocaleString()}
    </h2>
  </div>

</div>







<div className="
mt-8
flex
gap-4
flex-wrap
">


<button

onClick={()=>setActiveTab("sales")}

className={`
px-6
py-3
rounded-xl
font-bold
${
activeTab==="sales"
?
"bg-[#D4AF37] text-black"
:
"bg-white/10"
}
`}

>

Sales Report

</button>









<button

onClick={()=>setActiveTab("purchases")}

className={`
px-6
py-3
rounded-xl
font-bold
${
activeTab==="purchases"
?
"bg-[#D4AF37] text-black"
:
"bg-white/10"
}
`}

>

Purchases

</button>



</div>







<div className="
mt-6
">


<button

onClick={()=>


exportCSV(
activeTab==="sales"
?
sales
:
purchases,
`${activeTab}-report.csv`
)

}

className="
bg-green-600
px-6
py-3
rounded-xl
font-bold
"

>

📥 Download CSV

</button>



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


<h2 className="
text-2xl
font-bold
text-[#D4AF37]
mb-5
">


{

activeTab==="sales"
?
"Sales Report"
:
"Purchase Report"

}


</h2>






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

<th className="p-3 text-left">
Phone
</th>

<th className="p-3 text-left">
Product
</th>

<th className="p-3">
WS Code
</th>

<th className="p-3">
Qty
</th>

<th className="p-3">
Amount
</th>

<th className="p-3">
Payment
</th>

<th className="p-3">
Status
</th>

<th className="p-3">
Date
</th>

</tr>

</thead>







<tbody>


{

(
activeTab==="sales"
?
sales
:
purchases
)

.map(item=>(


<tr

key={item.id}

className="
border-b
border-white/10
"

>


<td className="p-3">
{item.customerName || "---"}
</td>


<td className="p-3">
{item.phone || "---"}
</td>


<td className="p-3">
{item.productName || "---"}
</td>


<td className="
p-3
text-[#D4AF37]
">

{item.productCode || "---"}

</td>


<td className="p-3">

{item.quantity || 0}

</td>


<td className="
p-3
font-bold
text-green-400
">

Rs {item.amount || item.total || 0}

</td>


<td className="p-3">

{item.paymentMethod || "---"}

</td>


<td className="p-3">

{item.paymentStatus || item.status || "Pending"}

</td>


<td className="p-3">

{
item.createdAt?.seconds

?

new Date(
item.createdAt.seconds * 1000
)
.toLocaleDateString()

:

"---"

}

</td>





</tr>


))


}



</tbody>


</table>







{

(
activeTab==="sales"
?
sales
:
purchases
)
.length===0

&&

(

<p className="
text-center
text-gray-400
py-8
">

No Data Available

</p>

)

}




</div>








<div className="
text-center
text-gray-400
mt-10
pb-6
">


© {new Date().getFullYear()} WS Royal Bags

<br/>

ERP Reports Intelligence System


</div>





</div>

</main>


)


}
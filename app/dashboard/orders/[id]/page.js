"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { 
doc, 
getDoc, 
updateDoc 
} from "firebase/firestore";

import { db } from "../../../../lib/firebase";


export default function OrderPage(){

const { id } = useParams();

const [order,setOrder] = useState(null);
const [loading,setLoading] = useState(true);



useEffect(()=>{


async function getOrder(){

try{


const orderRef = doc(
db,
"orders",
id
);


const snap = await getDoc(orderRef);


if(snap.exists()){

setOrder({

id:snap.id,

...snap.data()

});

}


}

catch(error){

console.log(error);

}

finally{

setLoading(false);

}


}


if(id){

getOrder();

}


},[id]);





async function changeStatus(status){


try{


const orderRef = doc(
db,
"orders",
id
);


await updateDoc(orderRef,{

status:status

});


setOrder(prev=>({

...prev,

status:status

}));


}

catch(error){

console.log(error);

}


}





if(loading){

return (

<div className="min-h-screen flex items-center justify-center bg-slate-100">

<div className="bg-white p-10 rounded-3xl shadow-xl">

<h2 className="text-2xl font-bold">

Loading Order...

</h2>

</div>

</div>

)

}





if(!order){

return (

<div className="p-10 text-xl">

Order Not Found

</div>

)

}





const image =

order.imageUrl ||

order.productImage ||

order.image;





return (

<div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-blue-100 p-6">


<div className="max-w-6xl mx-auto">


{/* HEADER */}

<div className="mb-8">

<h1 className="text-4xl font-bold text-slate-900">

📦 Order Details

</h1>


<p className="text-gray-500 mt-2">

WS Royal Bags Luxury Order Management

</p>


</div>






<div className="grid md:grid-cols-2 gap-6">






{/* CUSTOMER */}

<div className="
bg-white/80
backdrop-blur
rounded-3xl
shadow-xl
p-8
border
">


<h2 className="text-xl font-bold mb-6">

👤 Customer Information

</h2>


<div className="space-y-4">


<p>

<b>Name:</b>

<br/>

{order.customerName || "-"}

</p>



<p>

<b>Phone:</b>

<br/>

{order.phone || "-"}

</p>




<p>

<b>Address:</b>

<br/>

{order.address || "-"}

</p>



</div>


</div>








{/* PRODUCT */}

<div className="
bg-white/80
backdrop-blur
rounded-3xl
shadow-xl
p-8
border
">


<h2 className="text-xl font-bold mb-6">

👜 Product Information

</h2>




{image &&

<img

src={image}

alt="Bag"

className="
w-48
h-48
object-cover
rounded-2xl
mb-6
shadow-lg
"

/>

}




<div className="space-y-4">


<p>

<b>Product:</b>

<br/>

{order.productName || "-"}

</p>




<p>

<b>Order ID:</b>

<br/>

<span className="text-blue-600 font-bold">

{order.orderId || order.id}

</span>

</p>




<p>

<b>Amount:</b>

<br/>

<span className="text-green-600 text-xl font-bold">

Rs {order.amount}

</span>

</p>




<p>

<b>Status:</b>


<br/>


<span className="
inline-block
mt-2
px-4
py-2
rounded-full
bg-green-100
text-green-700
font-semibold
">

{order.status || "Processing"}

</span>


</p>



</div>


</div>





</div>









{/* STATUS */}

<div className="
bg-white
rounded-3xl
shadow-xl
p-8
mt-8
">


<h2 className="text-xl font-bold mb-6">

🚚 Update Order Status

</h2>



<div className="flex flex-wrap gap-4">


<button

onClick={()=>changeStatus("Processing")}

className="
bg-yellow-500
text-white
px-6
py-3
rounded-xl
font-semibold
"

>

Processing

</button>




<button

onClick={()=>changeStatus("Shipped")}

className="
bg-blue-600
text-white
px-6
py-3
rounded-xl
font-semibold
"

>

Shipped

</button>





<button

onClick={()=>changeStatus("Delivered")}

className="
bg-green-600
text-white
px-6
py-3
rounded-xl
font-semibold
"

>

Delivered

</button>





<button

onClick={()=>changeStatus("Cancelled")}

className="
bg-red-600
text-white
px-6
py-3
rounded-xl
font-semibold
"

>

Cancelled

</button>


</div>


</div>








{/* ACTIONS */}


<div className="
bg-slate-900
rounded-3xl
shadow-xl
p-8
mt-8
">


<h2 className="text-white text-xl font-bold mb-5">

Customer Actions

</h2>



<a

href={`https://wa.me/${order.phone}?text=Hello ${order.customerName}, your WS Royal Bags order status is ${order.status}`}

target="_blank"

className="
inline-block
bg-green-600
text-white
px-6
py-3
rounded-xl
mr-4
"

>

💬 WhatsApp Customer

</a>





<button

onClick={()=>window.print()}

className="
bg-white
text-black
px-6
py-3
rounded-xl
"

>

🧾 Print Invoice

</button>



</div>





</div>

</div>


)

}
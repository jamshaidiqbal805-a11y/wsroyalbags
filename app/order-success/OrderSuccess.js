"use client";

import { useSearchParams } from "next/navigation";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

import { db } from "@/lib/firebase";

import {
  collection,
  query,
  where,
  getDocs
} from "firebase/firestore";

import {
  useEffect,
  useState
} from "react";


export default function OrderSuccess(){

const params = useSearchParams();

const orderId =
params.get("orderId") || "";


const [order,setOrder] =
useState(null);


const [loading,setLoading] =
useState(true);



useEffect(()=>{


async function fetchOrder(){


if(!orderId){

setLoading(false);

return;

}


try{


const q = query(
collection(db,"orders"),
where(
"orderId",
"==",
orderId
)
);


const snapshot =
await getDocs(q);



if(!snapshot.empty){

setOrder(
snapshot.docs[0].data()
);

}


}
catch(error){

console.log(error);

}
finally{

setLoading(false);

}


}


fetchOrder();


},[orderId]);



function downloadInvoice(){


if(!order){

alert(
"Order details loading..."
);

return;

}


const pdf =
new jsPDF();



const date =
new Date().toLocaleDateString(
"en-US",
{
weekday:"long",
day:"2-digit",
month:"short",
year:"numeric"
}
);



const gold =
[212,175,55];


const black =
[10,10,10];


const light =
[245,245,245];



// ======================
// HEADER
// ======================


pdf.setFillColor(...black);

pdf.rect(
0,
0,
210,
45,
"F"
);



pdf.setTextColor(...gold);

pdf.setFontSize(24);

pdf.text(
"WS ROYAL",
20,
20
);



pdf.setFontSize(14);

pdf.text(
"LUXURY BAGS",
20,
32
);



pdf.setTextColor(
255,
255,
255
);


pdf.setFontSize(10);

pdf.text(
"Premium Luxury Handbags Collection",
120,
25
);


// ======================
// TITLE
// ======================


pdf.setTextColor(
0,
0,
0
);


pdf.setFontSize(20);


pdf.text(
"LUXURY INVOICE",
20,
65
);



pdf.setDrawColor(...gold);


pdf.line(
20,
72,
190,
72
);
// ======================
// ORDER INFO
// ======================

pdf.setFontSize(11);


pdf.text(
`Invoice ID: ${orderId}`,
20,
90
);


pdf.text(
`Date: ${date}`,
20,
100
);


pdf.text(
`Status: ${order.status || "Processing"}`,
120,
90
);


pdf.text(
`Tracking: ${order.trackingNumber || "Pending"}`,
120,
100
);


// ======================
// CUSTOMER DETAILS
// ======================

pdf.setFillColor(...light);


pdf.roundedRect(
20,
115,
170,
45,
5,
5,
"F"
);



pdf.setFontSize(14);


pdf.text(
"Customer Details",
30,
130
);



pdf.setFontSize(11);



pdf.text(
`Name: ${order.customerName || "-"}`,
30,
142
);



pdf.text(
`Phone: ${order.phone || "-"}`,
30,
150
);



pdf.text(
`Address: ${order.address || "-"}`,
30,
158
);



// ======================
// PRODUCT DETAILS TABLE
// ======================


autoTable(pdf,{

startY:175,


head:[
[
"Product",
"Qty",
"Price",
"Total"
]
],


body:[
[
order.productName || "-",
order.quantity || 1,
`Rs ${order.amount || 0}`,
`Rs ${order.amount || 0}`
]
],


theme:"grid",


headStyles:{
fillColor:gold,
textColor:0,
fontSize:10
},


bodyStyles:{
fontSize:10
},


margin:{
left:20,
right:20
}

});



// ======================
// PAYMENT DETAILS
// ======================


let finalY =
pdf.lastAutoTable.finalY + 15;



pdf.setFillColor(...light);



pdf.roundedRect(
20,
finalY,
170,
35,
5,
5,
"F"
);



pdf.setFontSize(13);



pdf.text(
"Payment Information",
30,
finalY + 12
);



pdf.setFontSize(11);



pdf.text(
`Payment Method: ${order.paymentMethod || "-"}`,
30,
finalY + 23
);



pdf.text(
`Amount Paid: Rs ${order.amount || 0}`,
120,
finalY + 23
);
// ======================
// FOOTER / THANK YOU
// ======================

let footerY =
finalY + 55;


if(footerY > 260){

footerY = 260;

}



pdf.setDrawColor(...gold);


pdf.line(
20,
footerY - 10,
190,
footerY - 10
);



pdf.setTextColor(...gold);


pdf.setFontSize(14);


pdf.text(
"Thank You For Choosing",
20,
footerY + 5
);



pdf.setFontSize(16);


pdf.text(
"WS Royal Luxury Bags",
20,
footerY + 15
);



pdf.setTextColor(
0,
0,
0
);



pdf.setFontSize(10);



pdf.text(
"Luxury Redefined",
20,
footerY + 25
);



pdf.text(
"Easypaisa: 03XX-XXXXXXX",
20,
footerY + 35
);



pdf.text(
"www.wsroyalbags.com",
120,
footerY + 35
);



// ======================
// DOWNLOAD PDF
// ======================

pdf.save(
`WS-Royal-Invoice-${orderId}.pdf`
);


}



if(loading){

return (

<div className="min-h-screen flex items-center justify-center">

Loading Order...

</div>

);

}



return (

<div className="min-h-screen flex flex-col items-center justify-center gap-5">

<h1 className="text-3xl font-bold">
Order Confirmed 🎉
</h1>


<p>
Order ID: {orderId}
</p>



<button

onClick={downloadInvoice}

className="bg-black text-white px-6 py-3 rounded-lg"

>

Download Invoice

</button>



<button

onClick={()=>{

const message =
`✨ WS Royal Luxury Bags

Hello,

Your order has been confirmed successfully 🎉

Order ID: ${orderId}

Product: ${order?.productName || "-"}

Amount: Rs ${order?.amount || 0}

Status: ${order?.status || "Processing"}

Thank you for shopping with WS Royal Luxury Bags 👜

Luxury Redefined`;



const phone =
order?.phone?.replace(/\D/g,"");



const whatsappURL =
`https://wa.me/92${phone}?text=${encodeURIComponent(message)}`;



window.open(
whatsappURL,
"_blank"
);


}}

className="bg-green-600 text-white px-6 py-3 rounded-lg"

>

Send WhatsApp Confirmation

</button>


</div>

);



}
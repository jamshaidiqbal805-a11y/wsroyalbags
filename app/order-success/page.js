"use client";

import { useSearchParams } from "next/navigation";
import { jsPDF } from "jspdf";

export default function OrderSuccess(){

const params = useSearchParams();

const orderId = params.get("orderId") || "";
const name = params.get("name") || "";
const product = params.get("product") || "";
const amount = params.get("amount") || "";
const payment = params.get("payment") || "";


function downloadInvoice(){

const doc = new jsPDF();


doc.setFontSize(22);
doc.text(
"WS Royal Luxury Bags",
20,
25
);


doc.setFontSize(14);

doc.text(
"Luxury Invoice",
20,
40
);


doc.text(
`Order ID: ${orderId}`,
20,
60
);


doc.text(
`Customer: ${name}`,
20,
75
);


doc.text(
`Product: ${product}`,
20,
90
);


doc.text(
`Amount: Rs ${amount}`,
20,
105
);


doc.text(
`Payment: ${payment}`,
20,
120
);


doc.text(
"Thank you for shopping with WS Royal Bags",
20,
150
);


doc.save(
`${orderId}-invoice.pdf`
);


}



return (

<main className="min-h-screen flex items-center justify-center bg-[#faf8f5] p-6">


<div className="bg-white rounded-3xl shadow-xl p-10 text-center">


<h1 className="text-3xl font-black text-green-600">
Order Confirmed 🎉
</h1>


<p className="mt-4">
Your order has been placed successfully.
</p>


<p className="mt-3 font-bold">
Order ID: {orderId}
</p>



<button

onClick={downloadInvoice}

className="mt-8 px-8 py-4 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-600 text-white font-bold"

>

Download Invoice PDF

</button>


</div>


</main>

)

}
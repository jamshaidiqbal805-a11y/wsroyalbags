"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
  doc,
  updateDoc
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { products } from "@/data/products";
import Image from "next/image";


export default function CheckoutForm(){

const searchParams = useSearchParams();
const router = useRouter();

const productCode = searchParams.get("product");

const [product,setProduct] = useState(null);

const [customerName,setCustomerName] = useState("");
const [email,setEmail] = useState("");
const [phone,setPhone] = useState("");
const [address,setAddress] = useState("");

const [paymentMethod,setPaymentMethod] =
useState("Cash on Delivery");


const [loading,setLoading] = useState(false);



useEffect(()=>{

async function loadProduct(){

try{

const q = query(
collection(db,"products"),
where("productCode","==",productCode)
);


const snapshot = await getDocs(q);


if(!snapshot.empty){

setProduct({
id:snapshot.docs[0].id,
...snapshot.docs[0].data()
});

}
else{

const localProduct = products.find(
(item)=>
item.productCode === productCode ||
item.code === productCode
);

setProduct(localProduct);

}


}catch(error){

console.log(error);

const localProduct = products.find(
(item)=>
item.productCode === productCode ||
item.code === productCode
);

setProduct(localProduct);

}

}


if(productCode){
loadProduct();
}


},[productCode]);






async function placeOrder(){
console.log("Place Order Started");


if(!customerName || !phone || !address){

alert("Please fill required fields");
return;

}


setLoading(true);

try{


const orderId =
"WS-ORD-" +
Math.floor(1000 + Math.random()*9000);



const trackingNumber =
"TRK" +
Math.floor(100000 + Math.random()*900000);



const orderRef = await addDoc(
collection(db,"orders"),
{

orderId,

customerName,

email,

phone,

address,


productCode:
product?.productCode || product?.code || "",


productName:
product?.productName || product?.name || "",


productImage:
product?.imageUrl || product?.image || "",


amount:
Number(product?.salePrice || product?.price || 0),


quantity:1,

status:"Processing",

paymentMethod,

paymentStatus:"Pending",


trackingNumber,


createdAt:serverTimestamp()

}

);
console.log("Firebase ID:", orderRef.id);
console.log("Order Saved");



router.push(
`/order-success?orderId=${orderId}`
);



}
catch(error){

console.log("ORDER ERROR:", error);

alert(error.message);

}
finally{

setLoading(false);

}


}





return (

<main className="min-h-screen bg-[#faf8f5] flex justify-center items-center p-6">


<div className="w-full max-w-xl bg-white rounded-3xl shadow-xl p-8">


<h1 className="text-3xl font-black text-center">
Checkout
</h1>


<p className="text-center text-gray-500 mt-2">
Complete your order details
</p>



<div className="space-y-4 mt-8">


<input
placeholder="Customer Name"
value={customerName}
onChange={(e)=>setCustomerName(e.target.value)}
className="w-full h-14 px-5 rounded-xl border"
/>


<input
placeholder="Email Address"
value={email}
onChange={(e)=>setEmail(e.target.value)}
className="w-full h-14 px-5 rounded-xl border"
/>


<input
placeholder="Phone Number"
value={phone}
onChange={(e)=>setPhone(e.target.value)}
className="w-full h-14 px-5 rounded-xl border"
/>



<textarea
placeholder="Shipping Address"
value={address}
onChange={(e)=>setAddress(e.target.value)}
className="w-full h-28 px-5 py-4 rounded-xl border"
/>



<select
value={paymentMethod}
onChange={(e)=>setPaymentMethod(e.target.value)}
className="w-full h-14 px-5 rounded-xl border"
>

<option>
Cash on Delivery
</option>

<option>
Bank Transfer
</option>

<option>
Easypaisa / JazzCash
</option>

</select>
{
paymentMethod !== "Cash on Delivery" && (

<div className="bg-yellow-50 p-4 rounded-xl">

<h3 className="font-bold">
Payment Details
</h3>

<p>
Easypaisa/JazzCash: 03XX-XXXXXXX
</p>

<p>
Account Title: WS Royal Bags
</p>

<p className="text-sm text-gray-500 mt-2">
Once your payment is completed, kindly share the payment confirmation screenshot with us on WhatsApp. Our team will verify your payment and confirm your order shortly.

</p>


</div>

)
}




<div className="bg-slate-100 rounded-xl p-4">

{
product?.imageUrl &&

<Image
src={product.imageUrl}
alt="product"
width={100}
height={100}
className="rounded-xl"
/>

}


<p className="font-bold mt-3">
{product?.productName || product?.name}
</p>


<p>
Code: {productCode}
</p>


<p>
Amount: Rs {Number(product?.salePrice || product?.price || 0).toLocaleString()}
</p>


</div>




<div className="mt-5 bg-gray-50 rounded-xl p-4 text-sm text-gray-600">

  <p className="font-bold text-gray-800 mb-2">
    WS Royal Bags Order Policy
  </p>

  <p>
    • Delivery time: 3-5 working days
  </p>

  <p>
    • Exchange available within 7 days (conditions apply)
  </p>

  <p>
    • Orders are confirmed after verification
  </p>

  <p>
    • Customer information is kept secure
  </p>

</div>


<button
  onClick={placeOrder}
  disabled={loading}
  className="w-full h-14 bg-gradient-to-r from-yellow-500 to-amber-600 text-white rounded-xl font-bold mt-5"
>

  {
    loading ? "Processing..." : "Place Order"
  }

</button>

</div>

</div>

</main>

);
}
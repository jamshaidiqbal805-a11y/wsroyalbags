"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { products } from "@/data/products";
import Image from "next/image";


export default function CheckoutPage(){


const searchParams = useSearchParams();
const router = useRouter();



const productCode =
searchParams.get("product");



const [product,setProduct] = useState(null);


const [customerName,setCustomerName] = useState("");

const [email,setEmail] = useState("");

const [phone,setPhone] = useState("");

const [address,setAddress] = useState("");
const [paymentMethod,setPaymentMethod] = useState("Cash on Delivery");

const [loading,setLoading] = useState(false);




// LOAD PRODUCT

useEffect(()=>{


async function loadProduct(){


try{


const q = query(

collection(db,"products"),

where(
"productCode",
"==",
productCode
)

);



const snapshot = await getDocs(q);



if(!snapshot.empty){


setProduct({

id:snapshot.docs[0].id,

...snapshot.docs[0].data()

});


}

else{


const localProduct =
products.find(

(item)=>
item.productCode === productCode ||
item.code === productCode

);


setProduct(localProduct);


}



}

catch(error){


console.log(error);



const localProduct =
products.find(

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


if(
!customerName ||
!phone ||
!address
){


alert(
"Please fill required fields"
);


return;


}



setLoading(true);



try{


const orderId =
"WS-ORD-" +
Math.floor(
1000 + Math.random()*9000
);



const trackingNumber =
"TRK" +
Math.floor(
100000 + Math.random()*900000
);





await addDoc(

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
Number(
product?.salePrice || product?.price || 0
),



quantity:1,

status:"Processing",

paymentMethod,

paymentStatus:"Pending",

trackingNumber,



createdAt:
serverTimestamp()



}

);




router.push(
  `/order-success?orderId=${orderId}` +
  `&name=${encodeURIComponent(customerName)}` +
  `&product=${encodeURIComponent(product?.productName || product?.name || "")}` +
  `&amount=${Number(product?.salePrice || product?.price || 0)}` +
  `&payment=${encodeURIComponent(paymentMethod)}`
);



setCustomerName("");

setEmail("");

setPhone("");

setAddress("");
setPaymentMethod("Cash on Delivery");



}

catch(error){


console.log(error);


alert(
"Order failed"
);


}

finally{


setLoading(false);


}


}







return (

<main className="min-h-screen bg-[#faf8f5] p-6">


<div className="max-w-xl mx-auto bg-white rounded-3xl shadow-xl p-8 mt-10">


<h1 className="text-3xl font-black text-center">

Checkout

</h1>


<p className="text-center text-gray-500 mt-2">

Complete your order details

</p>





<div className="space-y-4 mt-8">



<input

type="text"

placeholder="Customer Name"

value={customerName}

onChange={(e)=>setCustomerName(e.target.value)}

className="w-full h-14 px-5 rounded-xl border"

/>




<input

type="email"

placeholder="Email Address"

value={email}

onChange={(e)=>setEmail(e.target.value)}

className="w-full h-14 px-5 rounded-xl border"

/>





<input

type="text"

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

<option value="Cash on Delivery">
Cash on Delivery
</option>

<option value="Bank Transfer">
Bank Transfer
</option>

<option value="Online Payment">
Online Payment
</option>

</select>






<div className="bg-slate-100 rounded-xl p-4">



{
product?.imageUrl && (

<Image

src={product.imageUrl}

alt="product"

width={100}

height={100}

className="rounded-xl mb-3"

/>

)

}



<p className="font-bold">

Product: {product?.productName || product?.name}

</p>



<p>

Code: {productCode}

</p>



<p>

Amount: Rs {Number(product?.salePrice || product?.price || 0).toLocaleString()}

</p>



</div>







<button

onClick={placeOrder}

disabled={loading}

className="w-full h-14 bg-gradient-to-r from-yellow-500 to-amber-600 text-white rounded-xl font-bold"

>


{

loading

?

"Processing..."

:

"Place Order"

}



</button>





</div>


</div>


</main>


)


}
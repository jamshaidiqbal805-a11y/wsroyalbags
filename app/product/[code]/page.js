"use client";

import { useEffect, useState } from "react";

import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { products as localProducts } from "@/data/products";


export default function ProductDetail() {


const params = useParams();

const code = params.code;

const searchCode = code.startsWith("WS-")
? code
: `WS-${String(code).padStart(3,"0")}`;



const [product,setProduct] = useState(null);

const [loading,setLoading] = useState(true);



useEffect(()=>{


async function loadProduct(){


try{


const q = query(

collection(db,"products"),

where(
"productCode",
"==",
searchCode
)

);



const snapshot = await getDocs(q);



if(!snapshot.empty){


const data = snapshot.docs[0].data();


setProduct({

id:snapshot.docs[0].id,

productCode:data.productCode || "",

code:data.productCode || "",

productName:data.productName || "",

name:data.productName || "",

category:data.category || "",

imageUrl:data.imageUrl || "",

image:data.imageUrl || "",

salePrice:data.salePrice || 0,

colors:data.colors || [
"Black",
"Brown",
"White"
],

description:data.description || ""

});


}

else{


const localProduct = localProducts.find(

(item)=>

item.productCode === searchCode ||

item.code === searchCode ||

item.code === code

);


setProduct(localProduct);


}


}

catch(error){


console.log(error);


const localProduct = localProducts.find(

(item)=>

item.productCode === searchCode ||

item.code === searchCode ||

item.code === code

);


setProduct(localProduct);


}

finally{


setLoading(false);


}


}



if(code){

loadProduct();

}


},[code]);





if(loading){


return (

<div className="min-h-screen flex items-center justify-center">

<h1 className="text-2xl font-bold">

Loading Product...

</h1>

</div>

)

}




if(!product){


return (

<div className="min-h-screen flex items-center justify-center">

<div className="text-center">

<h1 className="text-3xl font-black">

Product Not Found

</h1>


<Link href="/">

<button className="mt-5 px-6 py-3 bg-blue-600 text-white rounded-xl">

Back Home

</button>

</Link>


</div>

</div>

)

}





return (


<main className="min-h-screen bg-gradient-to-br from-[#faf8f5] via-white to-[#efe7db] p-6">


<div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-xl border border-amber-100 rounded-3xl shadow-2xl p-8">


<div className="grid md:grid-cols-2 gap-10">



{/* IMAGE */}


<div className="relative group bg-gradient-to-br from-[#faf8f5] to-[#efe7db] rounded-[35px] p-8 border border-amber-200 shadow-xl overflow-hidden">


<div className="absolute top-6 left-6 z-20 rounded-full bg-black/90 backdrop-blur px-5 py-2 text-sm font-bold text-[#D4AF37] shadow-xl border border-[#D4AF37]/30">

✨ Premium Collection

</div>



<Image

src={
product.imageUrl ||
product.image ||
"/bags/bags1.jpeg"
}

alt={
product.productName ||
product.name ||
"Luxury Bag"
}

width={600}

height={700}

priority

className="
rounded-3xl 
object-contain 
w-full 
transition-all 
duration-700
group-hover:scale-110
drop-shadow-[0_25px_35px_rgba(0,0,0,.15)]
"

/>


</div>





{/* DETAILS */}


<div>


<span className="inline-block px-4 py-2 rounded-full bg-amber-100 text-amber-700 font-bold text-sm">

{product.productCode || product.code}

</span>



<h1 className="text-4xl md:text-5xl font-black mt-5 text-gray-900">

{product.productName || product.name}

</h1>



<span className="inline-block mt-4 px-4 py-2 rounded-full bg-gray-100 text-gray-600 font-semibold">

{product.category}

</span>





<div className="mt-8 flex items-center justify-between flex-wrap gap-4">


<div>

<p className="text-sm text-gray-500 font-semibold">
Premium Price
</p>


<h2 className="text-4xl font-black text-[#B8860B] mt-1">

Rs {Number(product.salePrice || 0).toLocaleString()}

</h2>

</div>



<div className="px-5 py-3 rounded-full bg-green-50 border border-green-200">

<p className="text-green-700 font-bold text-sm">

✓ In Stock

</p>

</div>


</div>




<p className="mt-5 text-gray-600 leading-7">

{
product.description ||
"Premium luxury handbag designed with elegance, quality material and modern fashion style."
}

</p>




{/* TRUST */}

<div className="mt-6 grid grid-cols-2 gap-4">


<div className="rounded-2xl bg-[#faf8f5] p-4">

🚚

<p className="font-bold mt-2">

Fast Delivery

</p>

<span className="text-sm text-gray-500">

Across Pakistan

</span>

</div>



<div className="rounded-2xl bg-[#faf8f5] p-4">

🔒

<p className="font-bold mt-2">

Secure Order

</p>

<span className="text-sm text-gray-500">

Safe Shopping

</span>

</div>


</div>






{/* COLORS */}


<div className="mt-6">


<h3 className="font-bold">

Available Colors

</h3>


<div className="flex gap-3 mt-3 flex-wrap">


{
(product.colors || []).map((color)=>(


<span

key={color}

className="px-4 py-2 rounded-full bg-slate-100 font-semibold"

>

{color}

</span>


))

}


</div>


</div>







<Link href={`/checkout?product=${product.productCode || product.code}`}>


<button className="mt-8 w-full h-14 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#B8860B] to-[#8B6508] text-white font-bold">

Buy Now

</button>


</Link>






<a

href={`https://wa.me/923157405911?text=${encodeURIComponent(

`🛍️ WS Royal Luxury Bags

Product: ${product.productName || product.name}

Code: ${product.productCode || product.code}

Price: Rs ${product.salePrice}

Please confirm availability.`

)}`}

target="_blank"

rel="noopener noreferrer"

>


<button className="mt-4 w-full h-14 rounded-2xl bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-bold">

Order on WhatsApp

</button>


</a>



</div>


</div>


</div>


</main>


)


}
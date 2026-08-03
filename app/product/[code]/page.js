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



// LOAD PRODUCT

useEffect(()=>{


async function loadProduct(){


try{


// Firebase Product Search

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

id: snapshot.docs[0].id,

productCode: data.productCode || "",

code: data.productCode || "",

productName: data.productName || "",

name: data.productName || "",

category: data.category || "",

imageUrl: data.imageUrl || "",

image: data.imageUrl || "",

salePrice: data.salePrice || 0,

colors: data.colors || [
"Black",
"Brown",
"White"
],

description: data.description || ""

});

}

else{


// fallback local data

const localProduct =
localProducts.find(
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


const localProduct =
localProducts.find(
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

<main className="min-h-screen bg-[#faf8f5] p-6">


<div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl p-8">


<div className="grid md:grid-cols-2 gap-10">


{/* IMAGE */}

<div className="bg-slate-50 rounded-3xl p-5">


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

className="rounded-3xl object-contain w-full"

priority

/>

</div>





{/* DETAILS */}

<div>


<p className="text-yellow-600 font-bold">

{
product.productCode ||
product.code
}

</p>


<h1 className="text-4xl font-black mt-3">

{
product.productName ||
product.name
}

</h1>


<p className="text-gray-500 mt-3">

{
product.category
}

</p>



<h2 className="text-3xl font-black text-[#B8860B] mt-5">

Rs {
Number(
product.salePrice || 0
).toLocaleString()
}

</h2>



<p className="mt-5 text-gray-600 leading-7">

{
product.description ||
"Premium luxury handbag designed with elegance, quality material and modern fashion style."
}

</p>




<div className="mt-6">


<h3 className="font-bold">

Available Colors

</h3>


<div className="flex gap-3 mt-3">


{(product.colors ||
[
"Black",
"Brown",
"White"
])

.map((color)=>(

<span

key={color}

className="px-4 py-2 rounded-full bg-slate-100 font-semibold"

>

{color}

</span>

))}


</div>


</div>





<Link href={`/checkout?product=${product.productCode || product.code}`}>


<button className="mt-8 w-full h-14 bg-gradient-to-r from-yellow-500 to-amber-600 text-white rounded-2xl font-bold">

Buy Now

</button>


</Link>





<a

href={`https://wa.me/923157405911?text=${encodeURIComponent(

`🛍️ WS Royal Luxury Bags

Product: ${
product.productName || product.name
}

Code: ${
product.productCode || product.code
}

Price: Rs ${
product.salePrice
}

Please confirm availability.`

)}`}

target="_blank"

rel="noopener noreferrer"

>


<button className="mt-4 w-full h-14 bg-green-600 text-white rounded-2xl font-bold">

Order on WhatsApp

</button>


</a>



</div>


</div>


</div>


</main>

)


}
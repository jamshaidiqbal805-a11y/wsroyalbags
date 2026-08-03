"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { products } from "@/data/products";

import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";


export default function Home() {


const [search,setSearch] = useState("");

const [category,setCategory] = useState("All");
const [firebaseProducts,setFirebaseProducts] = useState([]);
useEffect(()=>{

async function loadProducts(){

try{

const snapshot = await getDocs(
collection(db,"products")

);


const list = snapshot.docs.map((doc)=>{

const data = doc.data();

return {

id: doc.id,
productCode: data.productCode || "",


code:
data.productCode || "",

name:
data.productName || "",

category:
data.category || "",

image:
data.imageUrl || "",
imageUrl:
data.imageUrl || "",

price:
`PKR ${Number(data.salePrice || 0).toLocaleString()} (~$${Math.round(Number(data.salePrice || 0) / 280)})`,

oldPrice:
`PKR ${(Number(data.salePrice || 0) + 3000).toLocaleString()}`,

colors:
data.colors || [
"white",
"brown",
"black"
],

badge:
"Premium Collection",

discount:
"Premium Deal"

};

});


console.log("Firebase Products:", list);
setFirebaseProducts(list);


}catch(error){

console.log("Firebase Error:", error);

}

}


loadProducts();


},[]);



const displayProducts =
firebaseProducts.length > 0
? firebaseProducts
: products;


const filteredProducts = displayProducts.filter((item)=>{


const searchText =
search.toLowerCase();



const matchSearch =
item.name.toLowerCase()
.includes(searchText)

||

item.code.toLowerCase()
.includes(searchText);



const matchCategory =
category === "All"

||

item.category === category;



return matchSearch && matchCategory;



});



return (


<main>


<Navbar />


<Hero />



<section
id="collection"
className="collection"
>


<div className="container">


<div className="section-heading">


<span className="section-badge">

PREMIUM COLLECTION

</span>



<h2 className="section-title">

Explore Our Luxury Bags

</h2>



<p className="section-description">

Discover premium handbags,
office bags, shoulder bags and
travel bags crafted with elegance.

</p>



</div>



{/* SEARCH AREA */}


<div className="search-wrapper">


<div className="search-filter">


<input

type="text"

placeholder="Search WS code or bag name..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

className="search-box"

/>



<select

value={category}

onChange={(e)=>setCategory(e.target.value)}

className="filter-box"

>


<option value="All">

All Categories

</option>


<option value="All">
All Categories
</option>

<option value="Luxury Handbags">
Luxury Handbags
</option>

<option value="Office Bags">
Office Bags
</option>

<option value="Shoulder Bags">
Shoulder Bags
</option>

<option value="Travel Bags">
Travel Bags
</option>

<option value="Leather Collection">
Leather Collection
</option>


</select>



</div>


</div>
{/* PRODUCTS GRID */}

<div className="products">


{
filteredProducts.map((item)=>(


<div
key={item.id || item.code}
className="product-card premium-card"
>

{
item.badge &&

<span className="product-badge">

{item.badge}

</span>

}




<div className="product-image">


<Image

src={
item.imageUrl && item.imageUrl.trim() !== ""
?
item.imageUrl
:
"/bags/bags1.jpeg"
}

alt={item.name || "WS Royal Bag"}

width={500}

height={600}

loading="lazy"

unoptimized

className="product-img object-contain hover:scale-105 transition duration-500"

/>

</div>




<div className="product-info">



<small className="product-code">

{item.code}

</small>




<h2 className="product-title">

{item.name}

</h2>




<p className="product-category">

{item.category}

</p>




<div className="stars">

★★★★★

</div>




<div className="price-box">

  <span className="old-price">
    {item.oldPrice}
  </span>

  <h3 className="price">
    {item.price}
  </h3>

  <span className="discount">
    {item.discount}
  </span>

</div>





<p className="color-title">

Available Colors

</p>




<div className="color-list">


{

item.colors.map((color,index)=>(


<span

key={index}

className={`color ${color}`}

title={color}

></span>


))

}



</div>
<Link href={`/product/${item.code}`}>

<button className="order-btn mb-3">
View Details
</button>

</Link>


<a
href={`https://wa.me/923157405911?text=${encodeURIComponent(

`🛍️ WS Royal Luxury Bags

✨ New Website Order Request

👜 Product: ${item.name}

🔖 Code: ${item.code}

💰 Price: ${item.price}

Please confirm availability.

Thank you.`

)}`}


target="_blank"

rel="noopener noreferrer"


>


<button className="order-btn">


Order on WhatsApp


</button>



</a>




</div>



</div>



))

}



</div>


</div>


</section>
{/* =========================
    PREMIUM STATS
========================= */}


<section className="stats">


<div className="container">


<div className="stats-grid">



<div className="stat-card">
<h2>
50+
</h2>
<p>
Luxury Bags
</p>
</div>


<div className="stat-card">
<h2>
Premium
</h2>
<p>
Quality Collection
</p>
</div>


<div className="stat-card">
<h2>
100%
</h2>
<p>
Quality Checked
</p>
</div>


<div className="stat-card">
<h2>
24/7
</h2>
<p>
WhatsApp Support
</p>
</div>


<div className="stat-card">
<h2>
Fast
</h2>
<p>
Delivery Service
</p>
</div>


<div className="stat-card">
<h2>
Luxury
</h2>
<p>
Modern Designs
</p>
</div>


<div className="stat-card">
<h2>
Secure
</h2>
<p>
Shopping Experience
</p>
</div>




</div>


</div>


</section>





{/* =========================
    ABOUT SECTION
========================= */}



<section

id="about"

className="about"

>


<div className="container">



<div className="section-heading">


<span className="section-badge">

ABOUT US

</span>




<h2 className="section-title">

WS Royal Luxury Bags

</h2>




<p className="section-description">

Luxury bags designed with
quality, elegance and modern
fashion for customers across Pakistan.

</p>



</div>





<div className="about-grid">



<div className="about-content">



<h3>

Premium Bags For Every Occasion

</h3>




<p>

WS Royal Luxury Bags offers
premium handbags, office bags,
shoulder bags and travel bags
with stylish designs and trusted quality.

</p>




<p>

Every product is carefully selected
to provide luxury style and
customer satisfaction.

</p>




<a

href="#collection"

className="about-btn"

>

Explore Collection

</a>




</div>





<div className="about-features">



<div className="feature-box">


<span>

🚚

</span>


<div>

<h4>

Nationwide Delivery

</h4>


<p>

Fast Shipping Across Pakistan

</p>


</div>


</div>





<div className="feature-box">


<span>

⭐

</span>


<div>

<h4>

Premium Quality

</h4>


<p>

Elegant Finish & Modern Design

</p>


</div>


</div>





<div className="feature-box">


<span>

🔒

</span>


<div>

<h4>

Secure Shopping

</h4>


<p>

Safe WhatsApp Ordering

</p>


</div>


</div>



</div>



</div>



</div>


</section>
{/* =========================
    CONTACT SECTION
========================= */}


<section

id="contact"

className="contact"

>


<div className="container">



<div className="section-heading">


<span className="section-badge">

CONTACT US

</span>



<h2 className="section-title text-white">

Let's Connect

</h2>




<p className="section-description text-gray-300">

Have questions about our luxury collection?
Contact us anytime.

</p>



</div>





<div className="contact-grid">



<div className="contact-card">


<h3>

📍 Address

</h3>


<p>

Lahore, Pakistan

</p>


</div>





<div className="contact-card">


<h3>

📞 Phone

</h3>


<p>

+92 315 7405911

</p>


</div>





<div className="contact-card">


<h3>

✉ Email

</h3>


<p>

info@wsroyalbags.com

</p>


</div>



</div>





<div className="contact-action">


<a

href="https://wa.me/923157405911"

target="_blank"

rel="noopener noreferrer"

className="contact-btn"

>


Chat on WhatsApp


</a>



</div>



</div>



</section>
{/* =========================
    FOOTER
========================= */}


<footer className="footer">


<div className="container">



<div className="footer-container">





<div className="footer-box">


<h2>

WS Royal Luxury Bags

</h2>



<p>

Premium handbags, office bags,
shoulder bags and travel bags
crafted with elegance and luxury.

</p>



</div>






<div className="footer-box">


<h3>

Quick Links

</h3>



<a href="/">

Home

</a>



<a href="#collection">

Collection

</a>



<a href="#about">

About

</a>



<a href="#contact">

Contact

</a>



</div>






<div className="footer-box">


<h3>

Customer Care

</h3>



<p>

🚚 Nationwide Delivery

</p>



<p>

🔒 Secure Shopping

</p>



<p>

💬 WhatsApp Support

</p>



<p>

⭐ Premium Quality

</p>



</div>






<div className="footer-box">


<h3>

Contact

</h3>



<p>

📍 Lahore, Pakistan

</p>



<p>

📞 +92 315 7405911

</p>



<p>

✉ info@wsroyalbags.com

</p>



</div>





</div>






<div className="footer-bottom">


© 2026 WS Royal Luxury Bags | All Rights Reserved.


</div>




</div>



</footer>





{/* FLOATING WHATSAPP */}



<a


href="https://wa.me/923157405911"


target="_blank"


rel="noopener noreferrer"


className="floating-whatsapp"


>


💬


</a>
</main>


);


}
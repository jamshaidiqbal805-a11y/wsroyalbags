

import Image from "next/image";


export default function Home() {


const bags = [

{
code:"WS-001",
name:"Royal Elegance Tote",
price:"Rs. 2,000",
image:"/bags/bags1.jpeg"
},

{
code:"WS-002",
name:"Prestige Leather Handbag",
price:"Rs. 4,000",
image:"/bags/bags2.jpeg"
},

{
code:"WS-003",
name:"Imperial Shoulder Bag",
price:"Rs. 2,500",
image:"/bags/bags3.jpeg"
},

{
code:"WS-004",
name:"Elite Fashion Tote",
price:"Rs. 14,000",
image:"/bags/bags4.jpeg"
},

{
code:"WS-005",
name:"Diamond Grace Bag",
price:"Rs. 3,000",
image:"/bags/bags5.jpeg"
},


...Array.from({length:45},(_,index)=>({

code:`WS-${String(index+6).padStart(3,"0")}`,

name:[
"Royal Classic Handbag",
"Premium Office Bag",
"Elegant Travel Bag",
"Luxury Designer Tote",
"Fashion Leather Bag",
"Executive Style Bag",
"Royal Charm Collection"
][index % 7],

price:`Rs. ${4000 + (index * 250)}`,

image:`/bags/bags${index+6}.jpeg`

}))


];



return (

<main>


<nav className="site-navbar">


<div className="logo">

<h2>
WS Royal
</h2>

<span>
Luxury Bags
</span>

</div>



<div className="nav-links">

<a href="#">
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



<a
className="nav-whatsapp"
href="https://wa.me/923157405911"
target="_blank"
>

WhatsApp

</a>


</nav>




<section className="luxury-hero">


<div className="hero-content">


<p className="small-title">
PREMIUM COLLECTION 2026
</p>


<h1>
Luxury Bags
<br/>
For Elegant Style
</h1>


<p>
Discover premium handbags, office bags and travel collections designed for modern fashion lovers.
</p>



<a href="#collection">

<button className="gold-btn">

Explore Collection

</button>

</a>


</div>




<div className="hero-image">


<Image

src="/bags/hero.webp.webp"

alt="WS Royal Luxury Bag"

width={500}

height={500}

priority

/>


</div>



</section>
{/* Collection */}

<section id="collection" className="collection">


<div className="section-heading">


<p>
OUR COLLECTION
</p>


<h1>
Premium Luxury Bags
</h1>


<span>
Handbags • Office Bags • Travel Bags
</span>


</div>




<div className="products">


{bags.map((bag,index)=>(


<div className="product-card" key={index}>


<Image

src={bag.image}

alt={bag.name}

width={350}

height={350}

/>




<div className="product-info">


<small>
{bag.code}
</small>



<h2>
{bag.name}
</h2>




<p className="stars">
⭐⭐⭐⭐⭐
</p>




<h3>
{bag.price}
</h3>
<div className="available-colors">

<p>Available Colors</p>

<div className="color-list">

<span className="color black"></span>
<span className="color brown"></span>
<span className="color white"></span>
<span className="color red"></span>
<span className="color blue"></span>
<span className="color gold"></span>

</div>

</div>




<a

href={`https://wa.me/923157405911?text=${encodeURIComponent(
`Hello WS Royal Luxury Bags,

I would like to inquire about the following product:

👜 Product Name: ${bag.name}
🆔 Product Code: ${bag.code}
💰 Price: ${bag.price}

Please share:
• Available Colors
• Stock Availability
• Delivery Charges
• Payment Method
• Estimated Delivery Time

Thank you.`
)}`}

target="_blank"

>


<button className="order-btn">

Order on WhatsApp

</button>


</a>



</div>


</div>


))}



</div>


</section>





{/* Stats */}


<section className="stats">


<div>

<h2>
500+
</h2>

<p>
Happy Customers
</p>

</div>



<div>

<h2>
50+
</h2>

<p>
Luxury Bags
</p>

</div>



<div>

<h2>
4.9★
</h2>

<p>
Customer Rating
</p>

</div>



<div>

<h2>
24/7
</h2>

<p>
WhatsApp Support
</p>

</div>


</section>







{/* About */}


<section id="about" className="about">


<h1>
About WS Royal Luxury Bags
</h1>


<p>

WS Royal Luxury Bags offers premium handbags,
office bags and travel collections with elegant
designs, excellent quality and reliable customer
service across Pakistan.

</p>


</section>







{/* Contact */}


<section id="contact" className="contact">


<h1>
Contact Us
</h1>


<p>
WhatsApp: +92 315 7405911
</p>


<p>
Location: Lahore, Pakistan
</p>


</section>
<a
href="https://wa.me/923157405911"
target="_blank"
className="floating-whatsapp"
>

💬

</a>
{/* Premium Trust Section */}

<section className="trust-section">

  <div className="trust-card">

    <h2>🚚</h2>

    <h3>
      Nationwide Delivery
    </h3>

    <p>
      Delivery Available Across Pakistan
    </p>

  </div>



  <div className="trust-card">

    <h2>🔒</h2>

    <h3>
      Secure Shopping
    </h3>

    <p>
      Safe & Easy WhatsApp Ordering
    </p>

  </div>



  <div className="trust-card">

    <h2>⭐</h2>

    <h3>
      Premium Quality
    </h3>

    <p>
      Elegant Designs & Quality Products
    </p>

  </div>



  <div className="trust-card">

    <h2>💬</h2>

    <h3>
      24/7 Customer Support
    </h3>

    <p>
      Always Here To Help You
    </p>

  </div>


</section>





<footer className="footer">

  <div className="footer-container">

    <div className="footer-box">

      <h2>WS Royal Luxury Bags</h2>

      <p>
        Premium handbags, office bags and travel bags with elegant
        designs and trusted quality across Pakistan.
      </p>

    </div>

    <div className="footer-box">

      <h3>Quick Links</h3>

      <a href="#">Home</a>
      <a href="#collection">Collection</a>
      <a href="#about">About</a>
      <a href="#contact">Contact</a>

    </div>

    <div className="footer-box">

      <h3>Contact</h3>

      <p>📍 Lahore, Pakistan</p>

      <p>📞 +92 315 7405911</p>

      <p>✉ info@wsroyalbags.com</p>

    </div>

    <div className="footer-box">

      <h3>Follow Us</h3>

      <a
        href="https://wa.me/923157405911"
        target="_blank"
        rel="noopener noreferrer"
      >
        WhatsApp
      </a>

      <p>Facebook (Coming Soon)</p>

      <p>Instagram (Coming Soon)</p>

    </div>

  </div>

  <div className="footer-bottom">

    © 2026 WS Royal Luxury Bags | All Rights Reserved.

  </div>

</footer>



</main>


);


}

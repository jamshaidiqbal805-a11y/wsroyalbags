import Image from "next/image";

export default function Home() {
const bags = [
  { code: "WS-001", name: "Royal Elegance Tote", image: "/bags/bags1.jpeg", price: "Rs. 14,000", rating: "⭐⭐⭐⭐⭐" },
  { code: "WS-002", name: "Prestige Leather Handbag", image: "/bags/bags2.jpeg", price: "Rs. 14,000", rating: "⭐⭐⭐⭐⭐" },
  { code: "WS-003", name: "Imperial Shoulder Bag", image: "/bags/bags3.jpeg", price: "Rs. 14,000", rating: "⭐⭐⭐⭐⭐" },
  { code: "WS-004", name: "Elite Fashion Tote", image: "/bags/bags4.jpeg", price: "Rs. 14,000", rating: "⭐⭐⭐⭐⭐" },
  { code: "WS-005", name: "Diamond Grace Bag", image: "/bags/bags5.jpeg", price: "Rs. 14,000", rating: "⭐⭐⭐⭐⭐" },
  { code: "WS-006", name: "Signature Office Bag", image: "/bags/bags6.jpeg", price: "Rs. 14,000", rating: "⭐⭐⭐⭐⭐" },
  { code: "WS-007", name: "Luxury Classic Tote", image: "/bags/bags7.jpeg", price: "Rs. 14,000", rating: "⭐⭐⭐⭐⭐" },
  { code: "WS-008", name: "Premium Chic Bag", image: "/bags/bags8.jpeg", price: "Rs. 14,000", rating: "⭐⭐⭐⭐⭐" },
  { code: "WS-009", name: "Royal Charm Handbag", image: "/bags/bags9.jpeg", price: "Rs. 14,000", rating: "⭐⭐⭐⭐⭐" },
  { code: "WS-010", name: "Executive Leather Bag", image: "/bags/bags10.jpeg", price: "Rs. 14,000", rating: "⭐⭐⭐⭐⭐" },
  { code: "WS-011", name: "Elite Queen Bag", image: "/bags/bags11.jpeg", price: "Rs. 14,000", rating: "⭐⭐⭐⭐⭐" },
  { code: "WS-012", name: "Golden Luxe Tote", image: "/bags/bags12.jpeg", price: "Rs. 14,000", rating: "⭐⭐⭐⭐⭐" },
  { code: "WS-013", name: "Diamond Edition Bag", image: "/bags/bags13.jpeg", price: "Rs. 14,000", rating: "⭐⭐⭐⭐⭐" },
  { code: "WS-014", name: "Royal Grace Collection", image: "/bags/bags14.jpeg", price: "Rs. 14,000", rating: "⭐⭐⭐⭐⭐" },
  { code: "WS-015", name: "Signature Luxury Bag", image: "/bags/bags15.jpeg", price: "Rs. 14,000", rating: "⭐⭐⭐⭐⭐" },
  { code: "WS-016", name: "Prestige Office Tote", image: "/bags/bags16.jpeg", price: "Rs. 14,000", rating: "⭐⭐⭐⭐⭐" },
  { code: "WS-017", name: "Elegant Charm Bag", image: "/bags/bags17.jpeg", price: "Rs. 14,000", rating: "⭐⭐⭐⭐⭐" },
  { code: "WS-018", name: "Premium Voyager Bag", image: "/bags/bags18.jpeg", price: "Rs. 14,000", rating: "⭐⭐⭐⭐⭐" },
  { code: "WS-019", name: "Crown Collection Bag", image: "/bags/bags19.jpeg", price: "Rs. 14,000", rating: "⭐⭐⭐⭐⭐" },
  { code: "WS-020", name: "Elite Executive Bag", image: "/bags/bags20.jpeg", price: "Rs. 14,000", rating: "⭐⭐⭐⭐⭐" },
  { code: "WS-021", name: "Royal Heritage Bag", image: "/bags/bags21.jpeg", price: "Rs. 14,000", rating: "⭐⭐⭐⭐⭐" },
];

  return (

    <main>


      {/* Navbar */}

      <nav>

        <h2>
          WS Royal Luxury Bags
        </h2>


        <div>

          <a href="#">
            Home
          </a>

          <a href="#products">
            Collection
          </a>

          <a href="#contact">
            Contact
          </a>

        </div>

      </nav>



      {/* Hero Section */}

      <section className="hero">

        <div className="hero-text">


          <h1>
            WS Royal Luxury Bags
          </h1>


          <h2>
            Premium Luxury Bags Collection 
          </h2>


          <p>
            WS Royal Luxury Bags is a premium fashion brand offering stylish handbags, travel bags, shoulder bags and designer collections. Our mission is to deliver luxury products with excellent quality and affordable prices.
          </p>


          <button>
            Explore Collection
          </button>


        </div>

      </section>




     {/* Products Section */}

     <section id="products">

     <div
     style={{
      display: "flex",
      justifyContent: "center",
      margin: "30px 0"
     }}
     >
     <input
      type="text"
      placeholder="Search Luxury Bags..."
      style={{
        width: "400px",
        padding: "15px",
        fontSize: "18px",
        borderRadius: "30px",
        border: "2px solid #8b5e34"
      }}
      />
       </div>

       <div className="section-title">

          <h1>
            Luxury That Defines Your Style
          </h1>


          <p>
            Premium Handbags | Travel Bags | Fashion Collection
          </p>


        </div>




        <div className="products">


          {bags.map((bag, index) => (


            <div className="card" key={index}>


              <Image

                src={bag.image}

                alt={bag.name}

                width={300}

                height={300}

              />



              <p
            style={{
            color: "#8b5e34",
            fontWeight: "bold",
            fontSize: "14px",
            marginTop: "10px",
            letterSpacing: "1px",
            }}
          >
          {bag.code}
          </p>

          <h2
          style={{
          fontSize: "22px",
          fontWeight: "700",
          margin: "8px 0",
          color: "#222",
         }}
         >
         {bag.name}
        </h2>

        <p
        style={{
        color: "#f4b400",
        fontSize: "16px",
        marginBottom: "8px",
        }}
       >
       {bag.rating}
      </p>

      <p
       style={{
       fontSize: "20px",
       fontWeight: "bold",
      color: "#8b5e34",
      marginBottom: "15px",
      }}
    >
    {bag.price}
      </p>

             <a
             href={`https://wa.me/923157405911?text=${encodeURIComponent(
            `👜 WS Royal Bags Inquiry

            Product: ${bag.name}
            Price: ${bag.price}

            Hello,

            I would like to know:

            • Latest Price
            • Availability
            • Delivery Charges
            • Color Options

            Website:
            https://wsroyalbags.vercel.app`
           )}`}
           target="_blank"
           >
           <button>
            Order on WhatsApp
           </button>
           </a>


            </div>



          ))}


        </div>


       </section>

    {/* Statistics */}

   <section className="stats">

    <div className="stat">
    <h2>500+</h2>
    <p>Happy Customers</p>
    </div>

    <div className="stat">
    <h2>50+</h2>
    <p>Luxury Bags</p>
    </div>

    <div className="stat">
     <h2>4.9★</h2>
     <p>Customer Rating</p>
     </div>

     <div className="stat">
     <h2>24/7</h2>
     <p>WhatsApp Support</p>
     </div>

      </section>

      {/* About Section */}

      <section className="about">

        <h1>
          About WS Royal Luxury Bags
        </h1>


        <p>
          WS Royal Luxury Bags offers premium handbags, shoulder bags, office bags and travel bags with elegant designs and excellent quality. We are committed to providing stylish collections at affordable prices with reliable customer service across Pakistan.
        </p>


      </section>






      {/* Features */}


      <section className="features">


        <h1>
          Why Choose Us
        </h1>


        <p>
          Premium Quality | Latest Designs | Affordable Prices | Customer Satisfaction
        </p>


      </section>







      {/* Contact */}


      <section className="contact" id="contact">


        <h1>
          Contact Us
        </h1>


        <p>
         WhatsApp:
         +92 315 7405911

         Email:
         info@wsroyalbags.com

         Location:
         Lahore, Pakistan
        </p>


      </section>







      {/* Footer */}


      <footer>


        © 2026 WS Royal Luxury Bags


      </footer>



    </main>

  );

}
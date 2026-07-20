import Image from "next/image";

export default function Home() {
const bags = [
  { code: "WS-001", name: "Premium Bag 01", image: "/bags/bags1.jpeg", price: "Rs. 14,000", rating: "⭐⭐⭐⭐⭐" },
  { code: "WS-002", name: "Premium Bag 02", image: "/bags/bags2.jpeg", price: "Rs. 14,000", rating: "⭐⭐⭐⭐⭐" },
  { code: "WS-003", name: "Premium Bag 03", image: "/bags/bags3.jpeg", price: "Rs. 14,000", rating: "⭐⭐⭐⭐⭐" },
  { code: "WS-004", name: "Premium Bag 04", image: "/bags/bags4.jpeg", price: "Rs. 14,000", rating: "⭐⭐⭐⭐⭐" },
  { code: "WS-005", name: "Premium Bag 05", image: "/bags/bags5.jpeg", price: "Rs. 14,000", rating: "⭐⭐⭐⭐⭐" },
  { code: "WS-006", name: "Premium Bag 06", image: "/bags/bags6.jpeg", price: "Rs. 14,000", rating: "⭐⭐⭐⭐⭐" },
  { code: "WS-007", name: "Premium Bag 07", image: "/bags/bags7.jpeg", price: "Rs. 14,000", rating: "⭐⭐⭐⭐⭐" },
  { code: "WS-008", name: "Premium Bag 08", image: "/bags/bags8.jpeg", price: "Rs. 14,000", rating: "⭐⭐⭐⭐⭐" },
  { code: "WS-009", name: "Premium Bag 09", image: "/bags/bags9.jpeg", price: "Rs. 14,000", rating: "⭐⭐⭐⭐⭐" },

  { code: "WS-010", name: "Premium Shoulder Bag", image: "/bags/bags10.jpeg", price: "Rs. 14,000", rating: "⭐⭐⭐⭐⭐" },
  { code: "WS-011", name: "Elegant Fashion Bag", image: "/bags/bags11.jpeg", price: "Rs. 14,000", rating: "⭐⭐⭐⭐⭐" },
  { code: "WS-012", name: "Luxury Hand Bag", image: "/bags/bags12.jpeg", price: "Rs. 14,000", rating: "⭐⭐⭐⭐⭐" },
  { code: "WS-013", name: "Luxury Bag 13", image: "/bags/bags13.jpeg", price: "Rs. 14,000", rating: "⭐⭐⭐⭐⭐" },
  { code: "WS-014", name: "Luxury Bag 14", image: "/bags/bags14.jpeg", price: "Rs. 14,000", rating: "⭐⭐⭐⭐⭐" },
  { code: "WS-015", name: "Luxury Bag 15", image: "/bags/bags15.jpeg", price: "Rs. 14,000", rating: "⭐⭐⭐⭐⭐" },
  { code: "WS-016", name: "Luxury Bag 16", image: "/bags/bags16.jpeg", price: "Rs. 14,000", rating: "⭐⭐⭐⭐⭐" },
  { code: "WS-017", name: "Luxury Bag 17", image: "/bags/bags17.jpeg", price: "Rs. 14,000", rating: "⭐⭐⭐⭐⭐" },
  { code: "WS-018", name: "Luxury Bag 18", image: "/bags/bags18.jpeg", price: "Rs. 14,000", rating: "⭐⭐⭐⭐⭐" },
  { code: "WS-019", name: "Luxury Bag 19", image: "/bags/bags19.jpeg", price: "Rs. 14,000", rating: "⭐⭐⭐⭐⭐" },
  { code: "WS-020", name: "Luxury Bag 20", image: "/bags/bags20.jpeg", price: "Rs. 14,000", rating: "⭐⭐⭐⭐⭐" },
  { code: "WS-021", name: "Luxury Bag 21", image: "/bags/bags21.jpeg", price: "Rs. 14,000", rating: "⭐⭐⭐⭐⭐" },
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



              <h2>
                {bag.name}
              </h2>



              <p>
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
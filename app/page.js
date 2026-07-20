import Image from "next/image";

export default function Home() {

  const bags = [
    {
      name: "Luxury Hand Bag",
      image: "/bags/bags1.jpeg",
      price: "Rs. 5,000"
    },
    {
      name: "Elegant Ladies Bag",
      image: "/bags/bags2.jpeg",
      price: "Rs. 6,000"
    },
    {
      name: "Travel Luxury Bag",
      image: "/bags/bags3.jpeg",
      price: "Rs. 7,000"
    },
    {
      name: "Classic Leather Bag",
      image: "/bags/bags4.jpeg",
      price: "Rs. 8,000"
    },
    {
      name: "Designer Fashion Bag",
      image: "/bags/bags5.jpeg",
      price: "Rs. 9,000"
    },
    {
      name: "Premium Carry Bag",
      image: "/bags/bags6.jpeg",
      price: "Rs. 10,000"
    },
    {
      name: "Royal Collection Bag",
      image: "/bags/bags7.jpeg",
      price: "Rs. 11,000"
    },
    {
      name: "Luxury Travel Bag",
      image: "/bags/bags8.jpeg",
      price: "Rs. 12,000"
    },
    {
      name: "Premium Women Bag",
      image: "/bags/bags9.jpeg",
      price: "Rs. 13,000"
    }
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
            Premium Bags Collection
          </h2>


          <p>
            Discover elegant handbags and luxury travel bags designed with style, quality and modern fashion.
          </p>


          <button>
            Shop Now
          </button>


        </div>

      </section>




      {/* Products Section */}

      <section id="products">


        <div className="section-title">


          <h1>
            Our Luxury Collection
          </h1>


          <p>
            Explore our premium quality handbags and travel bags.
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

                href={`https://wa.me/923157405911?text=Assalamualaikum%20mujhe%20${bag.name}%20order%20karna%20hai`}

              >

                <button>
                  Order on WhatsApp
                </button>


              </a>



            </div>



          ))}


        </div>


      </section>





      {/* About Section */}


      <section className="about">


        <h1>
          About WS Royal Luxury Bags
        </h1>


        <p>
          We provide premium quality luxury bags with elegant designs, modern style and customer satisfaction.
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
          WhatsApp: 03157405911
        </p>


      </section>







      {/* Footer */}


      <footer>


        © 2026 WS Royal Luxury Bags


      </footer>



    </main>

  );

}
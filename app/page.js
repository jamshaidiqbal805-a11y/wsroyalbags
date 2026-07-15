import Image from "next/image";
<Image
  src="/bags/bags1.jpeg"
  width={300}
  height={300}
  alt="Luxury Bag"
/>

export default function Home() {

  const bags = [
  {
    name: "Luxury Bag 1",
    image: "/bags/bags1.jpeg",
    price: "Rs. 5,000"
  },
  {
    name: "Luxury Bag 2",
    image: "/bags/bags2.jpeg",
    price: "Rs. 6,000"
  },
  {
    name: "Luxury Bag 3",
    image: "/bags/bags3.jpeg",
    price: "Rs. 7,000"
  },
  {
    name: "Luxury Bag 4",
    image: "/bags/bags4.jpeg",
    price: "Rs. 8,000"
  },
  {
    name: "Luxury Bag 5",
    image: "/bags/bags5.jpeg",
    price: "Rs. 9,000"
  },
  {
    name: "Luxury Bag 6",
    image: "/bags/bags6.jpeg",
    price: "Rs. 10,000"
  },
  {
    name: "Luxury Bag 7",
    image: "/bags/bags7.jpeg",
    price: "Rs. 11,000"
  },
  {
    name: "Luxury Bag 8",
    image: "/bags/bags8.jpeg",
    price: "Rs. 12,000"
  },
  {
    name: "Luxury Bag 9",
    image: "/bags/bags9.jpeg",
    price: "Rs. 13,000"
  }
];

  return (
    <main>

      {/* Navbar */}
      <nav>

        <div className="logo">
  <h1>WS Royal Bags</h1>
          
        </div>

        <div className="menu">
          <a href="#">Home</a>
          <a href="#">Collection</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </div>

      </nav>


      {/* Hero */}
      <section className="hero">

        <div className="hero-text">

          <h1>WS Royal Bags</h1>

          <h2>Luxury Bags Collection</h2>

          <p>
            Premium Handbags & Travel Bags Designed for Style and Elegance.
          </p>

          <button>
            Shop Now
          </button>

        </div>

      </section>


      {/* Products */}
      <h1>Our Collection</h1>

      <div className="products">

        {bags.map((bag) => (

          <div className="card" key={bag.name}>

            <Image
              src={bag.image}
              width={300}
              height={300}
              alt={bag.name}
            />

            <h2>{bag.name}</h2>

            <p>
              Premium Quality Luxury Bag
            </p>

            <h3>
              {bag.price}
            </h3>

            <a
              href="https://wa.me/923157405911"
              target="_blank"
            >
              <button>
                Order on WhatsApp
              </button>
            </a>

          </div>

        ))}

      </div>


      {/* About */}
      <section className="about">

        <h1>About WS Royal Bags</h1>

        <p>
          WS Royal Bags provides premium quality luxury handbags,
          travel bags and stylish collections.
        </p>

      </section>


      {/* Why Choose Us */}
      <section className="features">

        <h1>Why Choose Us?</h1>

        <h3>Premium Quality</h3>
        <p>High quality material and elegant designs.</p>

        <h3>Affordable Prices</h3>
        <p>Luxury bags at competitive prices.</p>

        <h3>Customer Support</h3>
        <p>Easy WhatsApp ordering service.</p>

      </section>


      {/* Contact */}
      <section className="contact">

        <h1>Contact Us</h1>

        <p>
          Order your favorite bag today.
        </p>

        <a href="https://wa.me/923157405911">
          <button>
            WhatsApp Order
          </button>
        </a>

      </section>


      {/* Footer */}
      <footer>

        <h2>WS Royal Bags</h2>

        <p>
          Luxury Handbags & Travel Bags Collection
        </p>

        <p>
          © 2026 WS Royal Bags
        </p>

      </footer>


    </main>
  );
}
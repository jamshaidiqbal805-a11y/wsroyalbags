import Image from "next/image";

export default function Home() {

  const bags = [
    {
      name: "Luxury Hand Bag",
      image: "/bags/Bags1.jpeg",
      price: "Rs. 5,000",
      description: "Premium quality luxury handbag"
    },
    {
      name: "Elegant Ladies Bag",
      image: "/bags/Bags2.jpeg",
      price: "Rs. 6,000",
      description: "Stylish design for modern women"
    },
    {
      name: "Travel Luxury Bag",
      image: "/bags/Bags3.jpeg",
      price: "Rs. 7,000",
      description: "Strong and premium travel bag"
    }
  ];

  return (
    <main className="min-h-screen bg-gray-100">

      {/* Header */}
      <header className="bg-black text-white p-6 text-center">
        <h1 className="text-3xl font-bold">
          WS Royal Luxury Bags
        </h1>
        <p className="mt-2">
          Premium Bags Collection
        </p>
      </header>


      {/* Products */}
      <section className="p-6">

        <h2 className="text-3xl font-bold text-center mb-8">
          Our Collection
        </h2>


        <div className="grid md:grid-cols-3 gap-6">

          {bags.map((bag, index) => (

            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-4"
            >

              <Image
                src={bag.image}
                alt={bag.name}
                width={400}
                height={400}
                className="rounded-lg"
              />


              <h3 className="text-xl font-bold mt-4">
                {bag.name}
              </h3>


              <p className="text-gray-600 mt-2">
                {bag.description}
              </p>


              <p className="text-xl font-bold mt-3">
                {bag.price}
              </p>


              <a
                href={`https://wa.me/923157405911?text=I want to order ${bag.name}`}
                target="_blank"
                className="block text-center bg-green-600 text-white mt-4 py-3 rounded-lg"
              >
                Order on WhatsApp
              </a>


            </div>

          ))}

        </div>

      </section>


      {/* Footer */}
      <footer className="bg-black text-white text-center p-4">
        © WS Royal Luxury Bags
      </footer>

    </main>
  );
}
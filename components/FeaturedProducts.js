import Image from "next/image";

const products = [
  { id: 1, image: "/bags/bags1.jpeg" },
  { id: 2, image: "/bags/bags2.jpeg" },
  { id: 3, image: "/bags/bags3.jpeg" },
  { id: 4, image: "/bags/bags4.jpeg" },
  { id: 5, image: "/bags/bags5.jpeg" },
  { id: 6, image: "/bags/bags6.jpeg" },
  { id: 7, image: "/bags/bags7.jpeg" },
  { id: 8, image: "/bags/bags8.jpeg" },
];

export default function FeaturedProducts() {
  return (
    <section id="collection" className="py-20 bg-white">
      <div className="container">

        <h2 className="section-title">
          Featured Collection
        </h2>

        <p className="section-subtitle">
          Premium handbags designed with elegance,
          quality and modern style.
        </p>

        <div className="grid-4">

          {products.map((item) => (
            <div key={item.id} className="card">

              <Image
                src={item.image}
                alt={`Bag ${item.id}`}
                width={400}
                height={450}
              />

              <div className="p-5">

                <h3 className="font-bold text-lg">
                  Luxury Bag {item.id}
                </h3>

                <p className="text-gray-500 mt-2">
                  Premium Quality
                </p>

                <a
                  href="https://wa.me/923157405911"
                  target="_blank"
                  className="btn-primary mt-5 inline-block"
                >
                  Order Now
                </a>

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
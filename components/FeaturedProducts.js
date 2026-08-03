import Image from "next/image";

import { products } from "@/data/products";
import Link from "next/link";


export default function FeaturedProducts() {
  return (
    <section
      id="collection"
      className="py-24 bg-gradient-to-b from-[#faf8f5] to-white"
    >

      <div className="container">


        {/* Heading */}
        <div className="text-center mb-14">

          <span className="inline-block px-4 py-2 rounded-full bg-amber-100 text-amber-700 text-sm font-semibold tracking-[3px] uppercase">
            Featured Collection
          </span>


          <h2 className="mt-5 text-4xl md:text-5xl font-black text-gray-900">
            Discover Luxury Bags
          </h2>


          <p className="mt-5 max-w-2xl mx-auto text-gray-600 leading-8">
            Explore our carefully selected premium handbags crafted with
            elegance, durability and timeless fashion.
          </p>

        </div>



        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">


          {products.map((item) => (

            <div
              key={item.id}
              className="group overflow-hidden rounded-3xl bg-white shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
            >


              {/* Image Area */}
              <div className="relative flex h-[420px] items-center justify-center bg-[#faf8f5] p-5">


                <span className="absolute top-4 left-4 z-10 rounded-full bg-black px-3 py-1 text-xs font-semibold text-amber-400">
                  Bestseller
                </span>


                <Image
                  src={item.image}
                  alt={item.name}
                  width={500}
                  height={600}
                  quality={75}
                  className="h-full w-full object-contain transition duration-500 group-hover:scale-110"
                />


              </div>



              {/* Product Info */}
              <div className="p-6 text-center">


                <h3 className="text-xl font-bold text-gray-900">
                  {item.name}
                </h3>


                <div className="mt-3 text-lg text-amber-500">
                  ★★★★★
                </div>


                <p className="mt-3 text-2xl font-black text-amber-600">
                  {item.price}
                </p>


                <a
                  href="https://wa.me/923157405911"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex w-full justify-center rounded-full bg-green-500 py-3 font-semibold text-white transition hover:bg-green-600"
                >
                  Order on WhatsApp
                </a>


              </div>


            </div>

          ))}


        </div>


      </div>


    </section>
  );
}
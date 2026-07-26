import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-[#faf8f5] py-16">
      <div className="container grid md:grid-cols-2 gap-10 items-center">

        {/* Left Content */}
        <div>
          <p className="text-amber-600 font-semibold mb-3">
            Premium Collection
          </p>

          <h1 className="text-5xl font-bold leading-tight mb-6">
            Luxury Bags <br />
            For Every Style
          </h1>

          <p className="text-gray-600 mb-8">
            Discover premium handbags, office bags, shoulder bags and travel
            bags designed with elegance, quality and comfort.
          </p>

          <div className="flex flex-wrap gap-4">
            <a href="#collection" className="btn-primary">
              Shop Now
            </a>

            <a
              href="https://wa.me/923157405911"
              target="_blank"
              className="btn-outline"
            >
              WhatsApp
            </a>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex justify-center">
          <Image
           src="/bags/bags1.jpeg"
            alt="WS Royal Bag"
            width={500}
            height={600}
            className="rounded-3xl shadow-2xl"
            priority
          />
        </div>

      </div>
    </section>
  );
}
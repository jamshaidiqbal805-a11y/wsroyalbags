import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#fffdf9] via-[#f9f5ee] to-[#efe7db]">

      {/* Premium Background */}
      <div className="absolute -top-40 -right-40 h-[700px] w-[700px] rounded-full bg-yellow-300/20 blur-[180px]" />

      <div className="absolute -bottom-60 -left-44 h-[700px] w-[700px] rounded-full bg-amber-200/20 blur-[180px]" />

      <div className="absolute left-1/2 top-1/2 h-[550px] w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-200/10 blur-[200px]" />


      <div className="container relative z-10 grid min-h-[520px] grid-cols-1 items-center gap-8 py-10 lg:grid-cols-[1fr_1fr] lg:py-14">

        {/* LEFT CONTENT */}
        <div className="max-w-2xl">

          <span className="inline-flex items-center rounded-full border border-amber-200 bg-white/80 px-5 py-2 text-xs font-bold uppercase tracking-[4px] text-amber-700 shadow-lg backdrop-blur-md">
            ✨ Premium Luxury Collection
          </span>


          <h1 className="mt-7 text-4xl font-black leading-tight tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-[58px]">
  Luxury That
  <span className="mt-3 block bg-gradient-to-r from-[#c28b00] via-[#d4a017] to-[#f4c542] bg-clip-text text-transparent">
    Defines Your Style
  </span>
</h1>

<p className="mt-4 text-lg font-semibold text-[#c28b00]">
  Premium Bags. Timeless Elegance.
</p>


          <p className="mt-8 max-w-2xl text-base leading-8 text-gray-600 sm:text-lg lg:text-xl">

            Discover premium handbags, office bags and travel bags crafted with exceptional quality, elegant design and timeless luxury. Perfect for every occasion.
          </p>


          <div className="mt-10 flex flex-col gap-4 sm:flex-row">

            <a
              href="#collection"
              className="rounded-full bg-gradient-to-r from-[#c28b00] to-[#f4c542] px-9 py-4 font-semibold text-white shadow-[0_20px_40px_rgba(212,160,23,.35)] transition-all duration-500 hover:-translate-y-1 hover:scale-105"
            >
              Explore Collection →
            </a>


            <a
              href="https://wa.me/923157405911"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border-2 border-[#d4a017] bg-white/70 px-9 py-4 font-semibold text-[#d4a017] backdrop-blur-md transition-all duration-500 hover:bg-[#d4a017] hover:text-white"
            >
              💬 WhatsApp
            </a>

          </div>
          <div className="mt-8 flex flex-wrap gap-6 text-sm font-medium text-gray-700">

  <div className="flex items-center gap-2">
    <span>✔</span>
    <span>Premium Quality</span>
  </div>

  <div className="flex items-center gap-2">
    <span>🚚</span>
    <span>Nationwide Delivery</span>
  </div>

  <div className="flex items-center gap-2">
    <span>⭐</span>
    <span>Trusted Collection</span>
  </div>

  <div className="flex items-center gap-2">
    <span>💬</span>
    <span>WhatsApp Support</span>
  </div>

</div>

        </div>



        {/* RIGHT IMAGE */}

        <div className="relative flex flex-col items-center justify-center lg:items-end">
          

          <div className="absolute h-[380px] w-[380px] rounded-full bg-gradient-to-br from-yellow-300/20 to-amber-400/10 blur-[120px]" />

          <div className="absolute h-[420px] w-[420px] rounded-full border border-yellow-300/20" />

          <div className="absolute h-[520px] w-[520px] rounded-full border border-yellow-200/20" />


        <Image
  src="/bags/hero.webp.jpeg"
  alt="WS Royal Bags Luxury Collection"
  width={1000}
  height={1200}
  priority
  quality={75}
  className="relative z-10 w-[380px] lg:w-[430px] rounded-[36px] border border-white/70 object-cover shadow-[0_40px_90px_rgba(0,0,0,.22)] transition-all duration-700 hover:scale-105"
/>


<div className="relative z-10 mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-md">

  <div className="rounded-2xl bg-white/80 backdrop-blur-md p-4 shadow-lg text-center">
    <h3 className="text-2xl font-bold text-[#c28b00]">50+</h3>
    <p className="text-sm text-gray-600">Luxury Bags</p>
  </div>

  <div className="rounded-2xl bg-white/80 backdrop-blur-md p-4 shadow-lg text-center">
    <h3 className="text-2xl font-bold text-[#c28b00]">100%</h3>
    <p className="text-sm text-gray-600">Quality</p>
  </div>

  <div className="rounded-2xl bg-white/80 backdrop-blur-md p-4 shadow-lg text-center">
    <h3 className="text-2xl font-bold text-[#c28b00]">24/7</h3>
    <p className="text-sm text-gray-600">Support</p>
  </div>

</div>

      


        </div>

      </div>

    </section>
  );
}
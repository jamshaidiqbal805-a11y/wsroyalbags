export default function Footer() {
  return (
    <footer id="contact" className="bg-black text-white py-16">
      <div className="container grid md:grid-cols-3 gap-10">

        {/* Company */}
        <div>
          <h2 className="text-2xl font-bold mb-4">
            WS Royal Bags
          </h2>

          <p className="text-gray-400">
            Premium handbags, office bags, shoulder bags and travel bags
            with elegant designs and excellent quality.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold mb-4">
            Contact Us
          </h3>

          <p className="mb-2">
            📱 WhatsApp: +92 315 7405911
          </p>

          <p className="mb-2">
            📧 info@wsroyalbags.com
          </p>

          <p>
            📍 Lahore, Pakistan
          </p>
        </div>

        {/* Buttons */}
        <div>
          <h3 className="text-xl font-semibold mb-4">
            Quick Links
          </h3>

          <div className="flex flex-col gap-3">

            <a
              href="https://wa.me/923157405911"
              target="_blank"
              className="btn-primary text-center"
            >
              WhatsApp
            </a>

            <a
              href="#collection"
              className="btn-outline text-center"
            >
              View Collection
            </a>

          </div>

        </div>

      </div>

      <div className="container mt-12 border-t border-gray-700 pt-6 text-center text-gray-400">

  <div className="flex justify-center gap-6 mb-4 text-sm">

 <div className="flex justify-center gap-6 mb-4 text-sm">

  <a
    href="/privacy-policy"
    className="hover:text-yellow-500"
  >
    Privacy Policy
  </a>


  <a
    href="/return-policy"
    className="hover:text-yellow-500"
  >
    Return & Exchange Policy
  </a>

</div>

</div>


© 2026 WS Royal Luxury Bags | All Rights Reserved.

</div>
    </footer>
  );
}

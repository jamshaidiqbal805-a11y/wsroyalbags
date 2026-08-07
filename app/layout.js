import "./globals.css";


export const metadata = {

  title:
    "WS Royal Luxury Bags | Premium Handbags Pakistan",


  description:
    "WS Royal Luxury Bags offers premium handbags, office bags, shoulder bags and travel bags with elegant designs and trusted quality across Pakistan.",


  keywords: [

    "WS Royal Luxury Bags",

    "Luxury Bags Pakistan",

    "Premium Handbags",

    "Ladies Handbags",

    "Office Bags",

    "Travel Bags",

    "Fashion Bags",

    "Luxury Fashion"

  ],


  authors: [
    {
      name: "WS Royal Luxury Bags"
    }
  ],


  creator:
    "WS Royal Luxury Bags",


  metadataBase:
    new URL("https://wsroyalbags.vercel.app"),


  openGraph: {

    title:
      "WS Royal Luxury Bags | Premium Collection",


    description:
      "Discover premium luxury handbags crafted with elegance and modern style.",


    url:
      "https://wsroyalbags.vercel.app",


    siteName:
      "WS Royal Luxury Bags",


    locale:
      "en_PK",


    type:
      "website",

  },


  twitter: {

    card:
      "summary_large_image",


    title:
      "WS Royal Luxury Bags | Premium Handbags",


    description:
      "Luxury handbags, office bags and travel bags with premium quality.",

  },


  robots: {

    index:
      true,

    follow:
      true,

  },


  verification: {

    google:
      "9o4ySkZl7Id_5ta84DoeBQ4T6MP7cXUXFZqYUcxIEBY",

  },


};



export default function RootLayout({ children }) {


  return (

    <html lang="en">


      <body>


        {children}


      </body>


    </html>

  );


}
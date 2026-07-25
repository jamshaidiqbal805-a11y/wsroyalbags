import "./globals.css";

export const metadata = {
  title: "WS Royal Bags",
  description: "Premium Luxury Bags",

  verification: {
    google: "9o4ySkZl7Id_5ta84DoeBQ4T6MP7cXUXFZqYUcxIEBY",
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
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Sri Bhashyakara — House of Sacred Indian Jewellery",
  description:
    "A legendary heritage jewellery house rooted in Hyderabad — concierge-led, generationally crafted masterpieces in 22K gold, diamonds, rubies, emeralds and pearls.",
  keywords: "Indian jewellery, gold jewellery, bridal jewellery, Hyderabad jewellery, temple jewellery, diamond necklace",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#FFF8F0" />
      </head>
      <body className="text-royalNavy" style={{ background: "#FFF8F0" }}>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

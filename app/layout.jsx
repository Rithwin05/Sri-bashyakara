import "./globals.css";
import ClientShell from "./ClientShell";

export const metadata = {
  title: "SBJ — The House of Cinematic Heritage",
  description: "A cinematic heritage jewellery house — concierge-led, generationally crafted, and rooted in the sacred geometry of South Indian temples.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=Cinzel:wght@400;500;600;700&family=Tenor+Sans&display=swap" rel="stylesheet" />
      </head>
      <body>
        <div className="grain" aria-hidden="true" />
        <ClientShell>
          {children}
        </ClientShell>
      </body>
    </html>
  );
}

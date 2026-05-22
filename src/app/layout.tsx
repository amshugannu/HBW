import type { Metadata } from "next";
import { Playfair_Display, Outfit, Poppins } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "A Night of Magic & Celebration | Birthday Invitation",
  description: "Step into a cinematic, dreamlike atmosphere celebrating a special day under the glowing night sky. A magical, princess-inspired birthday landing page.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${outfit.variable} ${poppins.variable} h-full scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <body 
        className="h-full bg-slate-950 text-slate-100 selection:bg-rose-500/20 selection:text-rose-200"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}


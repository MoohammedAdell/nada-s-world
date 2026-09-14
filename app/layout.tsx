import type { Metadata } from "next";
import "./globals.css";
import { AudioProvider } from "../context/AudioContext";
import FloatingMusicControl from "../components/FloatingMusicControl";

export const metadata: Metadata = {
  title: "Nada's World ❤️ | عالمنا الصغير",
  description: "A special digital romantic experience created just for Nada.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/logo.jfif" />
      </head>
      <body className="antialiased min-h-screen bg-[#0d0614] text-white selection:bg-[#ff4d8d] selection:text-white">
        <AudioProvider>
          {children}
          <FloatingMusicControl />
        </AudioProvider>
      </body>
    </html>
  );
}
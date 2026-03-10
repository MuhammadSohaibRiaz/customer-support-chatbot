import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

const SITE_URL = "https://support-chatbot-customer.vercel.app";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: "AI Customer Support Chatbot Platform | SupportAI",
  description:
    "Create AI chatbots trained on your company data. Embed a secure, modern AI widget on your site to capture leads and automate support.",
  openGraph: {
    title: "SupportAI — AI Customer Support Chatbot Platform",
    description:
      "Create AI chatbots trained on your company data. Embed a GPT-powered widget on your website to capture leads and automate support 24/7.",
    url: SITE_URL,
    siteName: "SupportAI",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "SupportAI — AI Customer Support Chatbot Platform Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SupportAI — AI Customer Support Chatbot Platform",
    description:
      "Create AI chatbots trained on your company data. Embed a GPT-powered widget on your website to capture leads and automate support 24/7.",
    images: [
      {
        url: "/twitter-image.png",
        width: 1200,
        height: 630,
        alt: "SupportAI Logo",
      }
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-slate-950 text-slate-200 antialiased`}>
        {children}
        <Toaster position="top-right" toastOptions={{
          style: {
            background: '#1e293b',
            color: '#fff',
            border: '1px solid #334155',
          }
        }} />
      </body>
    </html>
  );
}

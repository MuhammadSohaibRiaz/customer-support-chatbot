import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL('https://support-chatbot-customer.vercel.app'),
  title: "AI Customer Support Chatbot Platform | SupportAI",
  description: "Create AI chatbots trained on your company data. Embed a secure, modern AI widget on your site to capture leads and automate support.",
  openGraph: {
    title: "SupportAI - Custom Customer Support Chatbots",
    description: "Automate your customer support with AI trained on your own PDFs, FAQs, and URLs.",
    url: "/",
    siteName: "SupportAI",
    images: [
      {
        url: "/logo.png", // Next.js will resolve this against metadataBase
        width: 1024,
        height: 1024,
        alt: "SupportAI Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SupportAI - AI Support Chatbots",
    description: "Train an AI on your company data in minutes.",
    images: ["/logo.png"],
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

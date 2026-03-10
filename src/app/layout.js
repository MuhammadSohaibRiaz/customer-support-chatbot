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
        url: `${SITE_URL}/logo.png`,
        width: 1024,
        height: 1024,
        alt: "SupportAI — AI Customer Support Chatbot Platform Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "SupportAI — AI Customer Support Chatbot Platform",
    description:
      "Create AI chatbots trained on your company data. Embed a GPT-powered widget on your website to capture leads and automate support 24/7.",
    images: [`${SITE_URL}/logo.png`],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Explicit fallback OG meta tags for maximum social media compatibility */}
        <meta property="og:title" content="SupportAI — AI Customer Support Chatbot Platform" />
        <meta property="og:description" content="Create AI chatbots trained on your company data. Embed a GPT-powered widget on your website to capture leads and automate support 24/7." />
        <meta property="og:image" content={`${SITE_URL}/logo.png`} />
        <meta property="og:image:width" content="1024" />
        <meta property="og:image:height" content="1024" />
        <meta property="og:image:alt" content="SupportAI Logo" />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="SupportAI" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="SupportAI — AI Customer Support Chatbot Platform" />
        <meta name="twitter:description" content="Create AI chatbots trained on your company data. Embed a GPT-powered widget on your website to capture leads and automate support 24/7." />
        <meta name="twitter:image" content={`${SITE_URL}/logo.png`} />
      </head>
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

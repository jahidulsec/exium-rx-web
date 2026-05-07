import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { APP_METADATA } from "@/lib/data";
import ProgressProviders from "@/providers/progress-provider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/providers/auth-provider";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: APP_METADATA.title,
    template: "%s - " + APP_METADATA.title,
  },
  description: "Developed for analyze RX data of exium products",
  creator: "Impala Intech LTD.",
  publisher: "Exium Mups",
  openGraph: {
    title: {
      default: `${APP_METADATA.title}`,
      template: `%s - ${APP_METADATA.title}`,
    },
    description: APP_METADATA.desc,
    siteName: APP_METADATA.title,
    images: [
      {
        url: "/logos/Exium-Mups.png",
        width: 1200,
        height: 630,
        alt: APP_METADATA.title,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "/",
  },
};

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        outfit.variable,
      )}
    >
      <body className="flex min-h-full flex-col">
        <AuthProvider>
          <ProgressProviders>
            <TooltipProvider>{children}</TooltipProvider>
            <Toaster closeButton richColors position="top-right" />
          </ProgressProviders>
        </AuthProvider>
      </body>
    </html>
  );
}

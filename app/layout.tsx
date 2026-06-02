import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-roboto",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://inceptionwlab.es"),
  title: {
    default: "Inception Woman Lab — Venture Studio Boutique · Málaga",
    template: "%s | Inception Woman Lab",
  },
  description:
    "Construimos compañías tech lideradas por mujeres. Venture studio boutique en Málaga. 4 proyectos por cohorte, 0 € fees de entrada. Convocatoria abierta: 15 Abr – 15 Jun 2026. Respaldado por Niage Consulting.",
  keywords: [
    "venture studio",
    "startup mujeres",
    "incubadora tecnológica",
    "Málaga",
    "emprendimiento femenino",
    "tech startup España",
    "financiación startups",
    "Niage Consulting",
    "fundadoras tech",
    "inversión femenina",
  ],
  authors: [{ name: "Niage Consulting", url: "https://niage.es" }],
  creator: "Niage Consulting",
  publisher: "Inception Woman Lab",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://inceptionwlab.es",
    siteName: "Inception Woman Lab",
    title: "Inception Woman Lab — Venture Studio Boutique · Málaga",
    description:
      "Construimos compañías tech lideradas por mujeres. 4 proyectos por cohorte, 0 € fees de entrada. Convocatoria: 15 Abr – 15 Jun 2026.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Inception Woman Lab — Venture Studio Boutique en Málaga",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Inception Woman Lab — Venture Studio Boutique · Málaga",
    description:
      "Construimos compañías tech lideradas por mujeres. 4 proyectos por cohorte, 0 € fees. Convocatoria: 15 Abr – 15 Jun 2026.",
    images: ["/og-image.jpg"],
    creator: "@inceptionwlab",
  },
  alternates: {
    canonical: "https://inceptionwlab.es",
    languages: {
      "es-ES": "https://inceptionwlab.es",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Inception Woman Lab",
  url: "https://inceptionwlab.es",
  logo: "https://inceptionwlab.es/logo.svg",
  description:
    "Venture studio boutique en Málaga que construye compañías tech lideradas por mujeres.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Ancha del Carmen 32",
    addressLocality: "Málaga",
    addressCountry: "ES",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+34-951-838-292",
    contactType: "customer service",
    email: "info@inceptionwlab.es",
    availableLanguage: ["Spanish", "English"],
  },
  parentOrganization: {
    "@type": "Organization",
    name: "Niage Consulting",
    url: "https://niage.es",
  },
  foundingLocation: {
    "@type": "Place",
    name: "Málaga, España",
  },
  sameAs: [],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={roboto.variable}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-black antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}

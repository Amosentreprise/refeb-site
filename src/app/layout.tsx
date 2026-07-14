import type { Metadata } from "next";

import { Geist, Geist_Mono } from "next/font/google";
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ 
  subsets: ['latin'], 
  variable: '--font-montserrat' 
});

import "./globals.css";


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
    default:
      "REFEB | Réseau Évangélique des Frères Enseignants du Bénin",
    template:
      "%s | REFEB - Enseignants chrétiens engagés au Bénin",
  },


  description:
    "Le REFEB (Réseau Évangélique des Frères Enseignants du Bénin) mobilise et forme des enseignants chrétiens pour transformer l'école par l'Évangile, l'intégrité, l'excellence et la solidarité.",


  keywords: [
    "REFEB",
    "Réseau Évangélique des Frères Enseignants du Bénin",
    "enseignants chrétiens au Bénin",
    "éducation chrétienne au Bénin",
    "formation biblique des enseignants",
    "mission chrétienne dans les écoles",
    "clubs bibliques scolaires",
    "discipolat chrétien",
    "formation pédagogique chrétienne",
    "enseignants évangéliques",
    "Abomey-Calavi",
    "Bénin",
  ],


  authors: [
    {
      name:
        "Réseau Évangélique des Frères Enseignants du Bénin (REFEB)",
    },
  ],


  creator:
    "Réseau Évangélique des Frères Enseignants du Bénin",


  publisher:
    "REFEB",


  metadataBase: new URL(
    "https://refeb.vercel.app/"
  ),


  alternates: {
    canonical: "/",
  },


  openGraph: {

    type: "website",

    locale: "fr_FR",

    url:
      "https://refeb.vercel.app/",

    siteName:
      "REFEB - Réseau Évangélique des Frères Enseignants du Bénin",

    title:
      "REFEB | Former des enseignants transformés par l'Évangile",

    description:
      "Une vision éducative chrétienne qui accompagne les enseignants dans leur mission d'impacter l'école, l'Église et la société.",

  },


  twitter: {

    card:
      "summary_large_image",

    title:
      "REFEB | Enseignants chrétiens engagés pour transformer l'école",

    description:
      "Découvrez la mission, la vision et les actions du Réseau Évangélique des Frères Enseignants du Bénin.",

  },
  icons: {
    icon: '/images/logo-refeb.png', // Assure-toi que le chemin est correct
  },


  robots: {

    index: true,

    follow: true,

    googleBot: {

      index: true,

      follow: true,

      "max-image-preview": "large",

      "max-snippet": -1,

      "max-video-preview": -1,

    },

  },

};



export default function RootLayout({

  children,

}: Readonly<{

  children: React.ReactNode;

}>) {


  const organizationSchema = {

    "@context": "https://schema.org",

    "@type": "Organization",

    name:
      "Réseau Évangélique des Frères Enseignants du Bénin (REFEB)",

    description:
      "Organisation chrétienne regroupant des enseignants engagés dans la transformation de l'école par l'Évangile, la formation et le développement humain.",

    foundingDate:
      "2016",

    address: {

      "@type": "PostalAddress",

      addressCountry:
        "BJ",

    },


    contactPoint: {

      "@type": "ContactPoint",

      telephone:
        "+2290195206304",

      contactType:
        "customer service",

    },


    slogan:
      "Intégrité - Excellence - Solidarité",

  };



  return (

    <html

      lang="fr"

     
      className={`${montserrat.variable} h-full antialiased`}

    >

      <head>

        <script

          type="application/ld+json"

          dangerouslySetInnerHTML={{

            __html:
              JSON.stringify(organizationSchema),

          }}

        />

      </head>


      <body className="min-h-full flex flex-col">

        {children}

      </body>


    </html>

  );

}
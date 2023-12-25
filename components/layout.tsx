import Head from "next/head";
import React from "react";
import Script from "next/script";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next'

interface LayoutProps {
  children: JSX.Element | JSX.Element[];
  className: string;
}

const siteDetails = {
  title: "agirlcodes",
  description:
    "Welcome to my software development blog! Here, I provide valuable insights into modern web development using various technologies such as React JS, Typescript, Express/Node JS, Golang, and PostgreSQL. If you're looking for comprehensive articles on these technologies, you've come to the right place.",
  image: "/agirlcodes.jpg",
};

export default function Layout({ children, className }: LayoutProps) {
  return (
    <div className={`${className}`}>
      <Head>
        <meta name="description" content={siteDetails.description} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={siteDetails.title} />
        <meta property="og:description" content={siteDetails.description} />
        <meta
          property="og:image"
          content={`https://www.agirlcodes.dev${siteDetails.image}`}
        />
        <meta property="og:url" content="https://www.agirlcodes.dev" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:description" content={siteDetails.description} />
        <meta name="twitter:title" content={siteDetails.title} />
        <meta name="twitter:site" content="https://www.agirlcodes.dev" />
        <meta
          name="twitter:image"
          content={`https://www.agirlcodes.dev${siteDetails.image}`}
        />
        <meta name="twitter:creator" content="@kelly_perrie" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://www.agirlcodes.dev" />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon-96x96.png"
        ></link>
        <link rel="preconnect" href="https://fonts.gstatic.com"></link>
        <title>{siteDetails.title}</title>
      </Head>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-XDTTRJGD01"
      />

      <Script id="google-analytics">
        {`
   window.dataLayer = window.dataLayer || [];
   function gtag(){dataLayer.push(arguments);}
   gtag('js', new Date());
 
   gtag('config', 'G-XDTTRJGD01');
 `}
      </Script>

      <main>
      {children}
      </main>
      <Analytics />
      <SpeedInsights/> 
    </div>
  );
}

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';


interface LayoutProps {
  children: JSX.Element | JSX.Element[]

}

export default function Layout({ children }: LayoutProps){
  return (
    <div>
      <Head>
       <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon-96x96.png"
        />
      </Head>
      
      <main>{children}</main>
    </div>
  );
}
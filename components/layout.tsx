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
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="title"
          content="Agirlcodes"
        />
      </Head>
      
      <main>{children}</main>
    </div>
  );
}
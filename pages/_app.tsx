import type { AppProps } from "next/app";
import "../styles/global.css";
import { pacifico, roboto, spaceMono } from "../utils/fonts";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={`${pacifico.variable} ${roboto.variable} ${spaceMono.variable}`}>
      <Component {...pageProps} />
    </main>
  );
}

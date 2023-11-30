import type { AppProps } from "next/app";
import "../styles/global.css";
import { pacifico, roboto } from "../utils/fonts";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={`${pacifico.variable} ${roboto.variable}`}>
      <Component {...pageProps} />
    </main>
  );
}

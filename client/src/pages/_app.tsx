import React from "react";
import type { AppProps } from "next/app";
import { EthProvider } from "../contexts/EthContext";
import Header from "../components/template/Header";
import "@/styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <EthProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header />
      <Component {...pageProps} />
    </EthProvider>
  );
}

//app.tsx
import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { NextUIProvider } from "@nextui-org/react";
import { ContextProvider } from "@/Context/Context";

// Sugestão para evitar o uso de namespace em favor da sintaxe de módulos ES2015
// No seu arquivo separado de tipos, por exemplo, globals.d.ts

import React from "react";

declare module "react" {
  interface IntrinsicElements {
    "ion-icon": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  }
}


export default function App({ Component, pageProps }: AppProps) {

  return (
    <ContextProvider>
        <NextUIProvider>
        <Component {...pageProps} />
      </NextUIProvider>
    </ContextProvider>
   
  );
}
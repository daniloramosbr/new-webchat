import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="PT-BR">
      <Head />
      <body className="antialiased">
        <Main />
        <NextScript />
        <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js" defer></script>
        <script src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js" defer></script>
      </body>
    </Html>
  );
}

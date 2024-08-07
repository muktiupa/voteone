import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <div style={{height:"100vh"}} className=" flex justify-evenly  mx-auto">
          <Main />
        </div>
        <NextScript />
      </body>
    </Html>
  );
}

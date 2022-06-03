import { Html, Head, Main, NextScript } from 'next/document'
import Footer from '../components/footer'

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Plus+Jakarta+Sans&display=swap" rel="stylesheet" />
        {/* scrollRestoration set to manual for better scroll behaviour when using router */}
        <script
          dangerouslySetInnerHTML={{
            __html: `history.scrollRestoration = "manual"`,
          }}
        />
      </Head>
      <body>
        <Main />
        <Footer />
        <NextScript />
      </body>
    </Html>
  )
}
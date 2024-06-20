import 'server-only'


import './globals.css'
import NextTopLoader from 'nextjs-toploader';

// do not cache this layout
export const revalidate = 0

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <html lang="en">
      <head>
        <title>Whatsapp Webhook</title>
        <meta name="description" content="Whatsapp Cloud API Webhook" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <NextTopLoader color="#000"/>
        <>
          {children}
        </>
      </body>
    </html>
  )
}

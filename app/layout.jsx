import { Inter } from "next/font/google";
import "./globals.css";
import PocketBase from 'pocketbase';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  //title: "Thushara Auto Parts",
  description: "Online Shopping Auto Parts",
}

export default async function RootLayout({ children }) {
  const pb = new PocketBase(process.env.POCKETBASE_URL || 'http://127.0.0.1:8090');
  const settings = await pb.collection('settings').getOne('bussiness__data')
  return (
    <html lang="en" >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={ settings.metaicon || "/copyright.png" } />
        <link rel="stylesheet" href="/animations.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"/>
        <title>{settings.name}</title>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}

import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '/components/navbar'
import 'notyf/notyf.min.css';


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "Encryptid '23",
  description: "Encryptid '23",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

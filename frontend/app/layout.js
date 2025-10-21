import "./globals.css";
import Navbar from '@/components/navbar'
import { UserProvider } from "@/contexts/UserContext";

export const metadata = {
  title: '安放Safedrop',
  description: '无痕传输，就用安放',
}


export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <UserProvider>
          <div className="fixed top-0 left-0 w-full h-16 z-50" >
            <Navbar />
          </div>
          <main className="flex flex-col items-center w-full mt-16 px-4">
            {children}
          </main>
        </UserProvider>
      </body>
    </html>
  )
}

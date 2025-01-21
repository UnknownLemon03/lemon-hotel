'use server'
import "./globals.css";
import Navbar from "../components/Navbar";
import ToastProvider from "@/components/ToastProvider";
import { isLogin } from "@/backend/Auth";


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await isLogin()
  let user = false
  if(session) user =true;
  return (
    <html lang="en">
      <head>
      </head>
      <body
        className={` antialiased  w-full h-screen  bg-blue-200 ` }
      >
        <ToastProvider>
          <>
            <Navbar isLogin={user}/>
            <div className="h-[90%] relative  scrollbar-hide first-letter:relative">
              <div id="portal" />
                {children}
            </div>
          </>
        </ToastProvider>
      </body>
    </html>
  );
}

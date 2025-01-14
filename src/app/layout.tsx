import BallClump from "@/components/BallClump";
import "./globals.css";
import AppHeader from "./header";
import { BallClumpProvider } from "@/hooks/BallClumpProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <BallClumpProvider>
          <AppHeader/>
          <div className='w-screen h-screen z-0 fixed'>
            <BallClump/>
          </div>
          {children}
        </BallClumpProvider>
      </body>
    </html>
  );
}

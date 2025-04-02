import type { Metadata } from "next";
import "./globals.css";
import App from "@/padges/App";
export const metadata: Metadata = {
  title: {
    default: "Blog App",
    template: ""
  },
  description: "Blog app let ths users add post and modify it",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}
      >
        <App>
          {children}
        </App>
      </body>
    </html>
  );
}

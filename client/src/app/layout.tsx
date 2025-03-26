import type { Metadata } from "next";
import "./globals.css";
import App from "@/pages/App";
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
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />
      </head>
      <body suppressHydrationWarning={true}
      >
        <App>
          {children}
        </App>
      </body>
    </html>
  );
}

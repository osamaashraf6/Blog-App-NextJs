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
      <head>
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
// import type { Metadata } from "next";
// import "./globals.css";
// import Providers from "@/providers/Providers"; // Import the new Providers component
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import Announcement from "@/components/Announcement";

// export const metadata: Metadata = {
//   title: {
//     default: "Blog App",
//     template: "%s | Blog App"
//   },
//   description: "Blog app lets users add posts and modify them",
// };

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en">
//       <head />
//       <body suppressHydrationWarning={true}>
//         <Providers>
//           <Announcement />
//           <Navbar />
//           {children}
//           <a
//             href="#top"
//             className="fixed bottom-[50px] right-[50px] flex w-[30px] h-[30px] items-center justify-center rounded-full bg-amber-500 text-4xl"
//           >
//             ⭡
//           </a>
//           <Footer />
//         </Providers>
//       </body>
//     </html>
//   );
// }

import { Poppins } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import ReduxProvider from "@/providers/ReduxProvider";

// If loading a variable font, you don't need to specify the font weight
const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export const metadata = {
  title: "Commercify",
  description: "an e-Commerce NextJS App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ReactQueryProvider>
          <ReduxProvider>{children}</ReduxProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}

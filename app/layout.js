import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from '../context/AuthContext'; // Adjust the path if necessary


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Personal Portfolio",
  description: "Abdulgani Muhammedsanii's personal portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <AuthProvider>
        {children}
      </AuthProvider></body>
    </html>
  );
}

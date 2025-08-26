import { DarkModeProvider } from "@/components/DarkModeContext";
import "./globals.css";
import ScrollbarStyle from "@/components/ScrollbarStyle";

export const metadata = {
  title: "Admin Dashboard",
  description: "Login page first",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <DarkModeProvider>
          {children}
        </DarkModeProvider>
      </body>
    </html>
  );
}

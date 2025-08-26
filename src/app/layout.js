import { DarkModeProvider } from "@/components/DarkModeContext";
import ScrollbarStyle from "@/components/ScrollbarStyle";
import "./globals.css";

export const metadata = {
  title: "Admin Dashboard",
  description: "Login page first",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <DarkModeProvider>
          <ScrollbarStyle /> {/* ✅ Tambahkan */}
          {children}
        </DarkModeProvider>
      </body>
    </html>
  );
}

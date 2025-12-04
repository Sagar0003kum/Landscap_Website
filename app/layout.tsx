import "./globals.css";
import { AuthProvider } from "./context/AuthContext";

export const metadata = {
  title: "Landscape Website",
  description: "Professional landscaping service website",
};

// 👇 ADD THIS TYPE
type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

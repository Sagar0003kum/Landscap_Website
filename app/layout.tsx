import "./globals.css";
import { AuthProvider } from "./context/AuthContext";

export const metadata = {
  title: "Landscape Website",
  description: "Professional landscaping service website",
};

// Required type for Vercel build
type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

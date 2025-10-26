import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";
import Layout from "@/components/Layout";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <Layout>
            {children}
          </Layout>
        </QueryProvider>
      </body>
    </html>
  );
}

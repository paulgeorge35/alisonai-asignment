import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Roboto } from "next/font/google";
import ThemeRegistry from "./_components/ThemeRegistry";
import Navigation from "./_components/Navigation";
import { Toaster } from "sonner";
import ErrorBoundary from "./_components/ErrorBoundary";
import { Suspense } from "react";
import { Box, CircularProgress } from "@mui/material";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
  preload: true,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  title: "Alison AI - Assignment",
};

function LoadingFallback() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <CircularProgress />
    </Box>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <AppRouterCacheProvider>
          <ThemeRegistry>
            <ErrorBoundary>
              <Navigation />
              <Suspense fallback={<LoadingFallback />}>
                {children}
              </Suspense>
              <Toaster />
            </ErrorBoundary>
          </ThemeRegistry>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

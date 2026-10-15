import type { Metadata } from "next"
import { Geist_Mono, Inter } from "next/font/google"

import "./globals.css"
import { InlineScript } from "@/components/inline-script"
import { SettingsRestoreGate } from "@/components/settings-restore-gate"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { restoreScript } from "@/lib/tokens/persist"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Design System Generator",
  description:
    "Turn brand colors and a type preference into a shadcn-ready design system: palettes, roles, type scale and tokens.",
}

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        inter.variable
      )}
    >
      <head>
        <InlineScript html={restoreScript} />
      </head>
      <body>
        <ThemeProvider>
          <SettingsRestoreGate />
          <TooltipProvider>{children}</TooltipProvider>
          <Toaster position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { ThemeProvider } from './components/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'RoastBot - Get Hilariously Roasted by AI',
  description: 'Get personalized, funny AI roasts based on your X profile for social sharing.',
  keywords: ['roast', 'AI', 'funny', 'social', 'X', 'twitter', 'base', 'miniapp'],
  openGraph: {
    title: 'RoastBot - Get Hilariously Roasted by AI',
    description: 'Get personalized, funny AI roasts based on your X profile for social sharing.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <Providers>
            <main className="min-h-screen">
              {children}
            </main>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}

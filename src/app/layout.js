import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import ErrorBoundary from './components/ErrorBoundary'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ToastProvider from './components/ToastProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'EcomStore - Your Trusted Online Shopping Destination',
  description: 'Discover amazing products at unbeatable prices. From electronics to fashion, find everything you need at EcomStore.',
  keywords: 'ecommerce, online shopping, electronics, fashion, deals',
  authors: [{ name: 'EcomStore Team' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ErrorBoundary fallbackMessage="Something went wrong with the application. Please refresh the page.">
          <Providers>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-grow">
                <ErrorBoundary fallbackMessage="This page encountered an error.">
                  {children}
                </ErrorBoundary>
              </main>
              <Footer />
            </div>
            <ToastProvider />
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  )
}
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SARA AI-KMS - Knowledge Management System',
  description: 'AI-powered knowledge management system for SARA Learning - providing instant access to internal documentation, training materials, and company resources.',
  generator: 'SARA Learning',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

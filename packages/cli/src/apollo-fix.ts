// Corrected Apollo setup for Next.js App Router
export const fixedApolloSetup = {
  apolloWrapper: `'use client'

import { ApolloProvider } from '@apollo/client'
import { apolloClient } from '@/lib/apollo'

export function ApolloWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={apolloClient}>
      {children}
    </ApolloProvider>
  )
}
`,

  layout: `import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ApolloWrapper } from '@/lib/apollo-wrapper'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LunarCrush App',
  description: 'Crypto social trading app powered by LunarCrush',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloWrapper>
          {children}
        </ApolloWrapper>
      </body>
    </html>
  )
}
`
};

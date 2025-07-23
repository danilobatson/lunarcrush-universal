'use client'

import Image from 'next/image'
import { useQuery } from '@apollo/client'
import { GET_BITCOIN_DATA } from '@/lib/queries'

export default function Home() {
  const { data, loading, error } = useQuery(GET_BITCOIN_DATA, {
    pollInterval: 30000, // Refresh every 30 seconds
  })

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">src/app/page.tsx</code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
<a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://lunarcrush.com/developers"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <span className="font-bold">LunarCrush</span>
          </a>
        </div>
      </div>

      <div className="relative flex flex-col place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:translate-y-[-10px] before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Welcome to{' '}
          <a className="text-blue-600 hover:underline" href="https://nextjs.org">
            Next.js!
          </a>
        </h1>
        <p className="text-xl text-center mb-8 text-gray-600 dark:text-gray-300">
          Connected to LunarCrush GraphQL API
        </p>
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
          <h2 className="mb-3 text-2xl font-semibold">
            Bitcoin Data{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          {loading && <p className="text-sm opacity-50">Loading Bitcoin data...</p>}
          {error && <p className="text-sm text-red-500">Error: {error.message}</p>}
          {data && data.getCrypto && (
            <div className="text-sm opacity-70">
              <p><strong>Price:</strong> ${data.getCrypto.price?.toLocaleString()}</p>
              <p><strong>24h Change:</strong> {data.getCrypto.percent_change_24h}%</p>
              <p><strong>Sentiment:</strong> {data.getCrypto.sentiment}/100</p>
              <p className="mt-2 text-xs opacity-50">Updates every 30 seconds</p>
            </div>
          )}
        </div>

<a
          href="https://lunarcrush-universal-backend.cryptoguard-api.workers.dev/graphql"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            GraphQL API{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Explore 23+ endpoints with real-time crypto social data
          </p>
        </a>

        <a
          href="https://lunarcrush.com/developers"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Documentation{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Complete LunarCrush API documentation and guides
          </p>
        </a>

        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
          <h2 className="mb-3 text-2xl font-semibold">
            Next Steps{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <div className="text-sm opacity-70">
            <p>• Query more crypto symbols</p>
            <p>• Add social influencer data</p>
            <p>• Build sentiment analysis</p>
            <p>• Create real-time alerts</p>
          </div>
        </div>
      </div>
    </main>
  )
}

import Head from 'next/head'
import LoginLayout from '@/components/Login'

export default function Home() {
  return (
    <>
      <Head>
        <title>SEO INSPECTOR</title>
        <meta name="description" content="seo inspector by ADN" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main >
        <LoginLayout />
      </main>
    </>
  )
}

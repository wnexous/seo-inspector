import Header from '@/Layout/Header/Index'
import Head from 'next/head'
import { PagePropsInterface } from './_app'
import MaxWidth from '@/components/MaxWidth'
import WebScrapping from '@/components/Inspector/views/WebScrapping'

export default function Home({ state }: PagePropsInterface) {


  return (
    <>
      <Head>
        <title>SEO INSPECTOR</title>
        <meta name="description" content="seo inspector by ADN" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main >
        <Header username={state.profile!.username} />
        <MaxWidth>
          <WebScrapping />
        </MaxWidth>
      </main>
    </>
  )
}

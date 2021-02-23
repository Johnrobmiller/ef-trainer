import Head from 'next/head'

type deleteThisType = 'Testing Typescript to make sure it is working.'
const deleteThisString: deleteThisType = 'Testing Typescript to make sure it is working.'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Homepage (change this later)</title>
        <meta name='keywords' content='change this later' />
      </Head>

      <h1 className=' bg-blue-300'>Testing Tailwind to make sure it is working.</h1>
      <p>{deleteThisString}</p>
    </div>
  )
}

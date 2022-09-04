import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <div className="w-screen h-screen">
      <Head>
        <title>NextJS Tailwind Template</title>
      </Head>

      <div className="w-full h-full bg-[#F2F2F2] flex flex-col space-y-2 justify-center items-center">
        <div className="flex space-x-2">
          <h1 className="text-6xl font-sans font-bold text-[#090909]">NextJS</h1>
          <h1 className="text-6xl font-sans font-bold text-blue-500">TailwindCSS</h1>
          <h1 className="text-6xl font-sans font-bold text-[#DEA584]">Template</h1>
        </div>
        <Link href="https://github.com/TheLDB/templates/tree/main/nextjs-tailwind-template">
          <h1 className="text-2xl font-sans font-bold text-blue-500 underline hover:cursor-pointer">
            Github
          </h1>
        </Link>
      </div>
    </div>
  )
}

export default Home

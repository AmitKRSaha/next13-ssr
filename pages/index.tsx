import Head from 'next/head';
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import ErrorBoundary from "./ErrorBoundary";
import Photos from './Photos';
import Name from "./Counter";
import dynamic from 'next/dynamic'
import useTodoStore from '@/store/ssrStore';
import AppInitializer from "./AppInitializer";


const inter = Inter({ subsets: ['latin'] })


type Post = {
  userId: number
  id: number
  title: string
  body: string
}

const DynamicBear = dynamic(() => import('./Bear'), {
  ssr: false,
})

export const getServerSideProps = (async () => {
  // Fetch data from external API
  const res = await fetch('https://jsonplaceholder.typicode.com/posts/1')
  const repo: Post = await res.json()

  // TO check For the server side,
  const dataRes = await fetch("https://api.slingacademy.com/v1/sample-data/photos");
  const photos: any = await dataRes.json()
  // console.log('photos', photos.photos);
  // useTodoStore.setState(photos);

  // Pass data to the page via props
  return { props: { repo, photos } }
}) satisfies GetServerSideProps<{ repo: any }>

export default function Home({
  repo,
  photos
}: InferGetServerSidePropsType<typeof getServerSideProps>) {

  // console.log('useTodoStore.getState().photo',useTodoStore.getState().photos);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        
        <ErrorBoundary>
          Name <Name />
        </ErrorBoundary>
        <AppInitializer photos={photos}>
          <div>SSR</div>
          <Photos />
        </AppInitializer>
        {/* <Photos /> */}
        <div>

          <div>
            <p className='italic'>{repo?.title}</p>
            <p>{repo?.body}</p>

          </div>
          <DynamicBear />
          {/* <Bear/> */}
        </div>

      </main>
    </>
  )
}

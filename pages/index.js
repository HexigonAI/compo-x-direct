import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import {useQuery} from 'react-query';
import { getHomepagePosts } from '@/queries/queries';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const {status, data: posts, error, isFetching, isSuccess} = useQuery("posts", async () =>  await getHomepagePosts())
  console.log(posts)

  return (
    < div classname=" bg-black">
          {isSuccess && posts.map(post => <div> {post.title} </div> )}

    </div>
  )
}

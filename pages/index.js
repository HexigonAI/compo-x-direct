// import styles from '@/styles/Home.module.css'
import { Inter } from 'next/font/google'
import {useQuery} from 'react-query';
import { getHomepagePosts } from '@/queries/queries';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const {status, data: posts, error, isFetching, isSuccess} = useQuery("posts", async () =>  await getHomepagePosts())

  console.log(posts)

  return (
    <div>
          {isSuccess && posts.map(post => <div key={post.id}> {post.title} </div> )}
    </div>
  )
}

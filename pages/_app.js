import '@/styles/globals.css';
import '../styles/compox-trim.webflow.css';
import '../styles/webflow.css';
import '../styles/normalize.css';
import { QueryClientProvider, QueryClient } from 'react-query';
import { SessionProvider } from 'next-auth/react'

import Header from '@/components/Header';

const queryClient = new QueryClient()


export default function App({ Component, pageProps: { session, ...pageProps} }) {
  return (
    <>   
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={session}>
        {/* <Header/> */}
        <Component {...pageProps} />
        </SessionProvider>

      </QueryClientProvider>
    </>  
  )
  
}

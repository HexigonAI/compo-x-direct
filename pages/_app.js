import '@/styles/globals.css';
import '../styles/compox-trim.webflow.css';
import '../styles/webflow.css';
import '../styles/normalize.css';
import { QueryClientProvider, QueryClient } from 'react-query';
import Header from '@/components/Header';

const queryClient = new QueryClient()


export default function App({ Component, pageProps }) {
  return (
    <>   
      <QueryClientProvider client={queryClient}>
        {/* <Header/> */}
        <Component {...pageProps} />
      </QueryClientProvider>
    </>  
  )
  
}

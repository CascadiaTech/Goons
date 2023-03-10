import '../styles/globals.css'
import type { AppProps } from 'next/app'
import '../styles/fonts.css'
import { Web3ReactProvider } from '@web3-react/core'

import { Web3Provider } from '@ethersproject/providers'

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}

function MyApp({ Component, pageProps }: AppProps) {
 // useEffect(() => {
 //   const provider = window.localStorage.getItem("provider");
  //  if (provider) activate(connectors as any[typeof provider]);
 // }, []);
  return(
  <Web3ReactProvider getLibrary={getLibrary}>
   <Component {...pageProps} />
   </Web3ReactProvider>
  )
}

export default MyApp

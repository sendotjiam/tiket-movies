import { ChakraProvider } from '@chakra-ui/react'
import '../public/css/login.css'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp

import '@/styles/globals.css'
import Nav from '@/comps/nav'

export default function App({ Component, pageProps }) {

  return (
    <div>
      <Nav />
      <Component {...pageProps} />
    </div>
  )
}

import { Head } from '@/components'
import AppProvider from '@/contexts'
import { HeaderLayout } from '@/layouts'
import '@/styles/globals.css'
import { appWithTranslation } from 'next-i18next'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <HeaderLayout>
          <Head title="Next App" />
          <Component {...pageProps} />
        </HeaderLayout>
      </AppProvider>
    </QueryClientProvider>
  )
}

export default appWithTranslation(App)

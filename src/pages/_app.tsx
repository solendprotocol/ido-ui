import '../components/toast/toast.scss'
import '../components/tooltip/tooltip.scss'
import '../styles/global.scss'

import { WalletProvider } from '@parrotfi/wallets'
import BigNumber from 'bignumber.js'
import Head from 'next/head'
import { ThemeProvider } from 'next-themes'
import React from 'react'

import Notifications from '../components/Notifications'
import ScriptAnalytics from '../components/ScriptAnalytics'
import { DEFAULT_RPC, RPC_ENDPOINTS } from '../config/constants'
import { IDOProvider } from '../contexts/IDOContext'
import { ModalProvider } from '../contexts/ModalContext'
import { RefreshProvider } from '../contexts/RefreshContext'
import { notify } from '../stores/useNotificationStore'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

function MyApp({ Component, pageProps }) {
  const title = 'Solend IDO'
  const description =
    'Solend is the autonomous interest rate machine for SolanaThis is the IDO (initial DEX offering) page for Solend P, a liquidity network for borrowing and lending on Solana.'
  const keywords = 'Solend, IDO, DeFi, Solana, Lending, Borrow'
  const baseUrl = 'https://ido.solend.fi'

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content={keywords} />
        <meta name="description" content={description} />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono&family=IBM+Plex+Sans:wght@300;400;500&display=swap"
          rel="stylesheet"
        />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={`${baseUrl}/images/og.jpeg`} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@solendprotocol" />
      </Head>
      <ThemeProvider defaultTheme="dark" attribute="class">
        <WalletProvider
          endpoints={RPC_ENDPOINTS}
          defaultEndpoint={DEFAULT_RPC}
          onNotify={notify}
        >
          <ModalProvider>
            <IDOProvider>
              <RefreshProvider>
                <Component {...pageProps} />
              </RefreshProvider>
              <Notifications />
              <div id="tooltip-portal-root" />
            </IDOProvider>
          </ModalProvider>
        </WalletProvider>
        <ScriptAnalytics analyticsID="G-S8MXERDM2M" />
      </ThemeProvider>
    </>
  )
}

export default MyApp

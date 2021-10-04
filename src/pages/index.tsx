import { useWallet } from '@parrotfi/wallets'
import React, { useCallback } from 'react'
import Skeleton from 'react-loading-skeleton'

import AboutPanel from '../components/about/AboutPanel'
import { Button } from '../components/button'
import { Footer } from '../components/footer'
import { Header } from '../components/header'
import BigCountdown from '../components/ido/BigCountdown'
import CardBase from '../components/ido/CardBase'
import PoolCard from '../components/ido/PoolCard'
import { IDO_STARTS } from '../config/constants'
import { useIDO } from '../hooks/useIDO'
import { useRefresh } from '../hooks/useRefresh'
import useWalletStore from '../stores/useWalletStore'

const Main = () => {
  const pool = useWalletStore((s) => s.pools)[0]
  const { endpoint } = useWallet()
  const { loadIDO, loadingIDO, loadingError } = useIDO()

  const handleReload = useCallback(() => {
    loadIDO(endpoint)
  }, [endpoint.rpcURL, loadIDO])

  const pools = pool ? [pool] : []

  return (
    <main className="gap-48 w-full flex flex-col items-center items-center justify-center my-4 space-y-4 sm:my-6 md:space-x-6 md:flex-row md:space-y-0">
      <AboutPanel />
      {pools.map((pool, index) => (
        <PoolCard
          key={pool.publicKey.toBase58()}
          pool={pool}
          round={`${index + 1}`}
        />
      ))}
      {!!loadingError && (
        <CardBase endIdo={false} title="Error" className="md:col-span-2">
          <p className="leading-snug mb-6">{loadingError}</p>
          <Button size="sm" onClick={handleReload}>
            Retry to load
          </Button>
        </CardBase>
      )}
      {loadingIDO &&
        [1].map((key) => (
          <CardBase endIdo={false} key={key} title="Loading...">
            <Skeleton count={3} height={90} className="mt-2" />
          </CardBase>
        ))}
    </main>
  )
}

const Page: React.FC = () => {
  const { doForceRefresh } = useRefresh()
  const isStarted = IDO_STARTS.isBefore()

  return (
    <div className="min-h-screen flex flex-col bg-scaffold">
      <Header />
      <div
        className="mb-4 py-8"
        style={{
          background: `url(/images/bg/market_hero.dark.svg)`,
        }}
      >
        {!isStarted && (
          <BigCountdown date={IDO_STARTS} onComplete={doForceRefresh} />
        )}
        {isStarted && <Main />}
      </div>
      <Footer />
    </div>
  )
}

export default Page

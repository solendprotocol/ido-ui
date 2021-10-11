import { useWallet } from '@parrotfi/wallets'
import React, { useCallback, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import Drawer from 'antd/lib/drawer';


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

import { BN, web3 } from '@project-serum/anchor'
import useDeviceMode from '../hooks/useDeviceMode';
import moment from 'moment';

const Main = () => {
  const pool = useWalletStore((s) => s.pools)[0]
  const { endpoint } = useWallet()
  const { loadIDO, loadingIDO, loadingError } = useIDO()
  const { isMobile } = useDeviceMode();
  const [drawerVisible, setDrawerVisible] = useState(false);
  

  const handleReload = useCallback(() => {
    loadIDO(endpoint)
  }, [endpoint.rpcURL, loadIDO])

  const pools = pool ? [pool] : [{
    publicKey: new web3.PublicKey('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'),
    distributionAuthority: new web3.PublicKey('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'),
    startIdoTs: new BN('123123123'),
    endDepositsTs: new BN('123123123'),
    endIdoTs: new BN('123123123'),
    withdrawMelonTs: new BN('1231231231'),
    nonce: 1231,
    numIdoTokens: new BN('1231242'),
    poolUsdc: new web3.PublicKey('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'),
    poolWatermelon: new web3.PublicKey('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'),
    watermelonMint: new web3.PublicKey('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'),
    redeemableMint: new web3.PublicKey('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'),
  }]

  const poolCards = pools.map((pool, index) => (
    <PoolCard
      key={pool.publicKey.toBase58()}
      pool={pool}
      round={`${index + 1}`}
    />
  ));
  return (
    <>
    {isMobile && <Drawer
      closable
      onClose={() => setDrawerVisible(false)}
      visible={drawerVisible}
      destroyOnClose
      footer={null}
      getContainer={false}
      style={{ 
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: drawerVisible ? 11 : -1,
      }}
      placement='bottom'
    >
        {poolCards}
        <div className="px-4" style={{
          marginTop: -16,
        }}>
        {isMobile && <Button
        onClick={() => setDrawerVisible(false)}
        className="w-full white-button"
      >
        Back
      </Button>}
      </div>
      </Drawer>}
    <main className="pt-4 gap-48 w-full flex flex-col items-center items-center justify-center pb-4 space-y-4 sm:my-6 md:space-x-6 md:flex-row md:space-y-0">
      <AboutPanel 
        setDrawerVisible={setDrawerVisible}
      />
      {!isMobile && poolCards}
      {/* {!!loadingError && (
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
        ))} */}
    </main>
    </>
  )
}

const Page: React.FC = () => {
  const { doForceRefresh } = useRefresh()
  const isStarted = IDO_STARTS.isBefore()

  return (
    <div className="min-h-screen flex flex-col bg-scaffold">
      <Header />
      <div
        className="sm:py-8"
        style={{
          background: `url(/images/bg/market_hero.dark.svg)`,
        }}
      >
        {!isStarted && (
          <BigCountdown date={moment()} onComplete={doForceRefresh} />
        )}
        {isStarted && <Main />}
      </div>
      <Footer />
    </div>
  )
}

export default Page

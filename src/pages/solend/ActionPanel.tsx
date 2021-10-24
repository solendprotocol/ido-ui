import { Col, Drawer, Row } from 'antd'
import React from 'react'

import { Button } from '../../components/button'
import PoolCard from '../../components/ido/PoolCard'
import { IDO_STARTS } from '../../config/constants'
import useDeviceMode from '../../hooks/useDeviceMode'
import usePool from '../../hooks/usePool'
import useWalletStore from '../../stores/useWalletStore'
import Countdown from './ActionTabs/Countdown'

const Main: React.FC<{
  setDrawerVisible: (arg: boolean) => void
}> = ({ setDrawerVisible }) => {
  const pool = useWalletStore((s) => s.pools)[0]
  const { startIdo } = usePool(pool)

  if (IDO_STARTS.isAfter() || !startIdo || startIdo?.isAfter()) {
    return <Countdown />
  }

  const poolCard = pool ? (
    <PoolCard key={pool.publicKey.toBase58()} pool={pool} round={'1'} setDrawerVisible={setDrawerVisible} />
  ) : null

  return (
    <>
      <Row justify="center" align="middle" className="actionCardHolder">
        <Col>{poolCard}</Col>
      </Row>
    </>
  )
}

export default Main

import { Col, Row } from 'antd'
import React, { useState } from 'react'

import PoolCard from '../../components/ido/PoolCard'
import { IDO_STARTS } from '../../config/constants'
import usePool from '../../hooks/usePool'
import useWalletStore from '../../stores/useWalletStore'
import Countdown from './ActionTabs/Countdown'
import ProhibitedScreen from './ActionTabs/ProhibitedScreen'

const Main: React.FC<{
  setDrawerVisible: (arg: boolean) => void
}> = ({ setDrawerVisible }) => {
  const pool = useWalletStore((s) => s.pools)[0]
  const [acceptedDisclaimer, setAcceptedDisclaimer] = useState<boolean>(false)
  const { startIdo } = usePool(pool)

  if (!acceptedDisclaimer) {
    return <ProhibitedScreen setAcceptedDisclaimer={setAcceptedDisclaimer} />
  }

  if (IDO_STARTS.isAfter() || !startIdo || startIdo?.isAfter()) {
    return <Countdown />
  }

  const poolCard = pool ? (
    <PoolCard
      key={pool.publicKey.toBase58()}
      pool={pool}
      round={'1'}
      setDrawerVisible={setDrawerVisible}
    />
  ) : null

  return (
    <>
      <Row justify="center" className="actionCardHolder">
        <Col className="poolCard">{poolCard}</Col>
      </Row>
    </>
  )
}

export default Main

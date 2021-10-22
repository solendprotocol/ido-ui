import React from 'react'
import { Col, Drawer, Row } from 'antd'

import { Button } from '../../components/button'
import { IDO_STARTS } from '../../config/constants'
import useDeviceMode from '../../hooks/useDeviceMode'
import Countdown from './ActionTabs/Countdown'
import useWalletStore from '../../stores/useWalletStore'
import PoolCard from '../../components/ido/PoolCard'
import usePool from '../../hooks/usePool'


const Main: React.FC<{
  drawerVisible: boolean,
  setDrawerVisible: (arg: boolean) => void,
}> = ({
  drawerVisible,
  setDrawerVisible,
}) => {
  const pool = useWalletStore((s) => s.pools)[0]
  const { startIdo } = usePool(pool)
  const { isMobile } = useDeviceMode()

  console.log(IDO_STARTS, IDO_STARTS.isBefore());

  if (IDO_STARTS.isAfter() || startIdo?.isAfter()) {
    return <Countdown/>
  }

  const poolCard = pool ? <PoolCard
    key={pool.publicKey.toBase58()}
    pool={pool}
    round={'1'}
  /> : null;

  return (
    <>
          {isMobile && (
            <Drawer
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
              placement="bottom"
            >
              {poolCard}
                {isMobile && (
                  <Button
                    onClick={() => setDrawerVisible(false)}
                    className="w-full white-button"
                  >
                    Back
                  </Button>
                )}
            </Drawer>
          )}
          <Row justify="center" align="middle" className="actionCardHolder">
            <Col>
      {!isMobile && poolCard}
          </Col>
      </Row>
    </>
  )
}

export default Main

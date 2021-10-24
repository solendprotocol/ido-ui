import { Col, Row } from 'antd'
import React from 'react'
import { Button } from '../../components/button'

import BigCountdown from '../../components/ido/BigCountdown'
import Typography from '../../components/typography/Typography'
import { IDO_STARTS } from '../../config/constants'
import useDeviceMode from '../../hooks/useDeviceMode'
import usePool from '../../hooks/usePool'
import { useRefresh } from '../../hooks/useRefresh'
import useWalletStore from '../../stores/useWalletStore'

const CardBase: React.FC<{
  setDrawerVisible: (arg: boolean) => void
}> = ({ setDrawerVisible }) => {
  const pool = useWalletStore((s) => s.pools)[0]
  const { startIdo, endDeposits, endIdo, startRedeem } = usePool(pool)
  const { isMobile } = useDeviceMode()
  const { doForceRefresh } = useRefresh()

  return (
    <Row gutter={[0, 24]} justify={isMobile ? "center" : undefined} className="side">
      <Col>
        <Typography level="display" className="welcome">
          Welcome {isMobile && <br />}to the
          <br />
          Solend <Typography level="display" color="brand" className="inline-block idoText">IDO</Typography>
        </Typography>
      </Col>
      {isMobile && (IDO_STARTS.isAfter() || startIdo?.isAfter() ?  <Col className="w-full text-center">
        <Typography>Begins in:</Typography>
        <BigCountdown
          date={startIdo}
          onComplete={doForceRefresh}
        />
      </Col> : <Col span={24}>
        <Button onClick={() => setDrawerVisible(true)} className="w-full participate primaryBtnColors">
            Participate
        </Button>
      </Col>)}
      <Col className="card">
        <Typography level="headline">How it works</Typography>
        <br />
        <Typography color="secondary">
          The token sale consists of two consecutive 24 hour phases:
          <br />- <u>Sale period</u>: USDC may be deposited or withdrawn from
          the pool. SLND price will flunctuate based on the size of the pool.
          <br />- <u>Grace period</u>: USDC may only be withdrawn from the pool.
          SLND price will only go down in this phase.
          <br />
          <br />
          Afterwards, depositers can redeem an amount of SLND tokens
          proprotional to their share of the pool.
        </Typography>
      </Col>
      <Col className="card">
        <Typography level="headline">Timeline</Typography>
        <Typography className="date">{startIdo?.utc()?.format("MMM DD HH:mma")} UTC</Typography>{' '}
        {isMobile && <br/>}
        <Typography color="secondary">
          Sale period (deposit and withdrawals)
        </Typography>
        <br />
        <Typography className="date">{endDeposits?.utc()?.format("MMM DD HH:mma")} UTC</Typography>{' '}
        {isMobile && <br/>}
        <Typography color="secondary">
          Grace period (withdrawal only)
        </Typography>
        <br />
        <Typography className="date">{endIdo?.utc()?.format("MMM DD HH:mma")} UTC</Typography>{' '}
        {isMobile && <br/>}
        <Typography color="secondary">
          IDO ends
        </Typography>
        <br />
        <Typography className="date">{startRedeem?.utc()?.format("MMM DD HH:mma")} UTC</Typography>{' '}
        {isMobile && <br/>}
        <Typography color="secondary">Tokens redeemable</Typography>
      </Col>
      <Col>
      </Col>
      <Col>
        <Typography level="headline">
          <a>
            <u>Learn more</u>
          </a>
        </Typography>
      </Col>
    </Row>
  )
}

export default CardBase

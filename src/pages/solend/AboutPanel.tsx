import { Col, Row } from 'antd'
import React from 'react'

import { Button } from '../../components/button'
import Typography from '../../components/typography/Typography'
import useDeviceMode from '../../hooks/useDeviceMode'

const CardBase: React.FC<{
  setDrawerVisible: (arg: boolean) => void
}> = ({ setDrawerVisible }) => {
  const { isMobile } = useDeviceMode()

  return (
    <Row gutter={[0, 24]} className="side">
      <Col>
        <Typography level="display" className="welcome">
          Welcome to the
          <br />
          Solend IDO
        </Typography>
      </Col>
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
        <Typography className="date">Oct 26 12:00pm UTC</Typography>{' '}
        <Typography color="secondary">Withdrawal closed</Typography>
        <br />
        <Typography className="date">Oct 24 12:00pm UTC</Typography>{' '}
        <Typography color="secondary">
          Deposit and withdrawal (sale period)
        </Typography>
        <br />
        <Typography className="date">Oct 25 12:00pm UTC</Typography>{' '}
        <Typography color="secondary">
          Withdrawal only (grace period)
        </Typography>
        <br />
        <Typography className="date">Oct 27 12:00pm UTC</Typography>{' '}
        <Typography color="secondary">Tokens airdropped</Typography>
      </Col>
      <Col>
        <Typography level="headline">
          <a>
            <u>Learn more</u>
          </a>
        </Typography>
      </Col>
      <Col>
        {isMobile && (
          <Button onClick={() => setDrawerVisible(true)} className="w-full">
            Participate
          </Button>
        )}
      </Col>
    </Row>
  )
}

export default CardBase

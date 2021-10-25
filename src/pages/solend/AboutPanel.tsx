import { Col, Row } from 'antd'
import moment from 'moment'
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
    <Row
      gutter={[0, 24]}
      justify={isMobile ? 'center' : undefined}
      className="side"
    >
      <Col>
        <Typography level="display" className="welcome">
          Welcome {isMobile && <br />}to the
          <br />
          Solend{' '}
          <Typography
            level="display"
            color="brand"
            className="inline-block idoText"
          >
            IDO
          </Typography>
        </Typography>
      </Col>
      {isMobile &&
        (IDO_STARTS.isAfter() || startIdo?.isAfter() ? (
          <Col className="w-full text-center">
            <Typography>Begins in:</Typography>
            <BigCountdown
              date={IDO_STARTS ?? startIdo}
              onComplete={doForceRefresh}
            />
          </Col>
        ) : (
          <Col span={24}>
            <Button
              onClick={() => setDrawerVisible(true)}
              className="w-full participate primaryBtnColors"
            >
              Participate
            </Button>
          </Col>
        ))}
      <Col span={24}>
        <div className="card w-full">
          <Typography level="headline">How it works</Typography>
          <br />
          <Typography color="secondary">
            The IDO consists of two consecutive 24 hour phases:
            <br />- <u>Sale period</u>: USDC may be deposited or withdrawn from
            the pool. SLND price will fluctuate based on the size of the pool.
            <br />- <u>Grace period</u>: USDC may only be withdrawn from the
            pool. SLND price will only go down in this phase.
            <br />
            <br />
            Afterwards, depositors can redeem an amount of SLND tokens
            proprotional to their share of the pool.
          </Typography>
        </div>
      </Col>
      <Col span={24}>
        <div className="card w-full">
          <Typography level="headline">Timeline</Typography>
          <Typography className="date">
            {/* {startIdo?.utc()?.format('MMM DD HH:mma')} UTC */}
            {moment('2021-11-01T12:00:00Z')?.utc()?.format('MMM DD HH:mma')} UTC
          </Typography>{' '}
          {isMobile && <br />}
          <Typography color="secondary">
            Sale period (deposit and withdrawals)
          </Typography>
          <br />
          <Typography className="date">
            {/* {endDeposits?.utc()?.format('MMM DD HH:mma')} UTC */}
            {moment('2021-11-02T12:00:00Z')?.utc()?.format('MMM DD HH:mma')} UTC
          </Typography>{' '}
          {isMobile && <br />}
          <Typography color="secondary">
            Grace period (withdrawal only)
          </Typography>
          <br />
          <Typography className="date">
            {/* {endIdo?.utc()?.format('MMM DD HH:mma')} UTC */}
            {moment('2021-11-03T12:00:00Z')?.utc()?.format('MMM DD HH:mma')} UTC
          </Typography>{' '}
          {isMobile && <br />}
          <Typography color="secondary">IDO ends</Typography>
          <br />
          <Typography className="date">
            {/* {startRedeem?.utc()?.format('MMM DD HH:mma')} UTC */}
            {moment('2021-11-03T16:00:00Z')?.utc()?.format('MMM DD HH:mma')} UTC
          </Typography>{' '}
          {isMobile && <br />}
          <Typography color="secondary">Tokens redeemable</Typography>
        </div>
      </Col>
      <Col>
        <Typography level="headline">
          {/* TODO UPDATE */}
          <a target="_blank" href="/" rel="noreferrer">
            <u>Learn more</u>
          </a>
        </Typography>
      </Col>
      <Col span={24} className="m-1" />
      <Col>
        <Typography level="display" className="text-center">
          Investors
        </Typography>
        <Row justify="center" gutter={[48, 48]} align="middle">
          <Col flex="150px">
            <a target="_blank" href="https://www.dcp.capital/" rel="noreferrer">
              <img src="/partners/dragonfly.png" />
            </a>
          </Col>
          <Col flex="150px">
            <a
              target="_blank"
              href="https://polychain.capital/"
              rel="noreferrer"
            >
              <img src="/partners/polychain.png" />
            </a>
          </Col>
          <Col flex="150px">
            <a target="_blank" href="https://race.capital/" rel="noreferrer">
              <img src="/partners/race.png" />
            </a>
          </Col>
          <Col flex="150px">
            <a
              target="_blank"
              href="https://ventures.coinbase.com/"
              rel="noreferrer"
            >
              <img src="/partners/coinbase.png" />
            </a>
          </Col>
          <Col flex="150px">
            <a
              target="_blank"
              href="https://www.alameda-research.com/"
              rel="noreferrer"
            >
              <img src="/partners/alameda.png" />
            </a>
          </Col>
          <Col flex="150px">
            <a
              target="_blank"
              href="https://solana.foundation/"
              rel="noreferrer"
            >
              <img src="/partners/solana.png" />
            </a>
          </Col>
          <Col flex="150px">
            <a
              target="_blank"
              href="https://twitter.com/StaniKulechov"
              rel="noreferrer"
            >
              <img src="/partners/stani.png" />
            </a>
          </Col>
          <Col flex="150px">
            <a
              target="_blank"
              href="https://twitter.com/AntonioMJuliano"
              rel="noreferrer"
            >
              <img src="/partners/antonio.png" />
            </a>
          </Col>
          <Col flex="150px">
            <a
              target="_blank"
              href="https://twitter.com/balajis"
              rel="noreferrer"
            >
              <img src="/partners/balaji.png" />
            </a>
          </Col>
          <Col flex="150px">
            <a
              target="_blank"
              href="https://twitter.com/hal2001"
              rel="noreferrer"
            >
              <img src="/partners/hart.png" />
            </a>
          </Col>
          <Col flex="150px">
            <a
              target="_blank"
              href="https://twitter.com/0xMaki"
              rel="noreferrer"
            >
              <img src="/partners/maki.png" />
            </a>
          </Col>
          <Col flex="150px">
            <a
              target="_blank"
              href="https://twitter.com/juliankoh"
              rel="noreferrer"
            >
              <img src="/partners/julian.png" />
            </a>
          </Col>
          <Col flex="150px">
            <a
              target="_blank"
              href="https://twitter.com/dcfgod"
              rel="noreferrer"
            >
              <img src="/partners/dcfgod.png" />
            </a>
          </Col>
        </Row>
      </Col>
      <Col span={24} className="m-1" />
    </Row>
  )
}

export default CardBase

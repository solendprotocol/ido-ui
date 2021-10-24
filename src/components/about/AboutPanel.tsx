import React from 'react'

import useDeviceMode from '../../hooks/useDeviceMode'
import { Button } from '../button'
import Typography from '../typography/Typography'

const CardBase: React.FC<{
  setDrawerVisible: (arg: boolean) => void
}> = ({ setDrawerVisible }) => {
  const { isMobile } = useDeviceMode()

  return (
    <div
      style={{
        background: `url(/images/bg/market_hero.dark.svg)`,
      }}
    >
      <Typography level="display" className="welcome-header">
        Welcome to the Solend <Typography level="display" color="brand">IDO</Typography>
      </Typography>
      <img alt="" src="/images/hero.png" className="hero" />
      <Typography color="secondary" className="px-4 sm:px-0">
        <Typography>How it works</Typography>
        <br />
        Earn interest on deposits and borrow assets on the fastest, lowest fee,
        and most scalable lending deposits and borrow assets on the fastest,
        lowest fee, and most scalable lending protocol.
        <br />
        <br />
        <Typography>Oct 24 12:00pm UTC</Typography> Deposit and withdrawal (sale
        period)
        <Typography>Oct 25 12:00pm UTC</Typography> Withdrawal only (grace
        period)
        <Typography>Oct 26 12:00pm UTC</Typography> Withdrawal closed
        <Typography>Oct 27 12:00pm UTC</Typography> Tokens airdropped
      </Typography>
      {isMobile && (
        <Button onClick={() => setDrawerVisible(true)} className="w-full">
          Participate
        </Button>
      )}
    </div>
  )
}

export default CardBase

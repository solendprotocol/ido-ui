import React, { useState } from 'react'

import usePool from '../../hooks/usePool'
import { PoolAccount } from '../../stores/useWalletStore'
import CardOverlay from './CardOverlay'
import PoolContribCard from './PoolContribCard'
import PoolRedeemCard from './PoolRedeemCard'

interface PoolCardProps {
  pool: PoolAccount
  round?: string
}

const PoolCard: React.FC<PoolCardProps> = ({ pool, round }) => {
  const { startIdo, endIdo, startRedeem, endDeposits } = usePool(pool)
  const [isDeposit, setIsDeposit] = useState(true)
  

  return (
    <CardOverlay title={`IDO Round ${round}`} pool={pool}
      isDeposit={isDeposit}
      setIsDeposit={setIsDeposit}
    >
      {endIdo.isAfter() && <PoolContribCard 
        isDeposit={isDeposit}
        setIsDeposit={setIsDeposit}
      pool={pool} />}
      {endIdo.isBefore() && <PoolRedeemCard pool={pool} />}
      {/* Debug stats */}
      <div className="hidden bg-secondary rounded-xl p-2 mt-4 space-y-3 font-mono text-xs">
        <p>
          Start Ido: {startIdo?.fromNow()} ({startIdo?.format()})
        </p>
        <p>
          End Deposits: {endDeposits?.fromNow()} ({endDeposits?.format()})
        </p>
        <p>
          End Withdraws/Ido: {endIdo?.fromNow()} ({endIdo?.format()})
        </p>
        <p>
          Start Redeem: {startRedeem?.fromNow()} ({startRedeem?.format()})
        </p>
      </div>
    </CardOverlay>
  )
}

export default PoolCard

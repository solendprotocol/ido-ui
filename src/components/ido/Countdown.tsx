import { QuestionMarkCircleIcon } from '@heroicons/react/outline'
import { Tooltip } from 'antd'
import BigNumber from 'bignumber.js'
import moment from 'moment'
import React from 'react'

import { useTooltip } from '../tooltip'
import PoolCountdown from './PoolCountdown'

interface CountdownProps {
  endIdo: moment.Moment
  endDeposits: moment.Moment
  poolStatus: string
}

const Countdown: React.FC<CountdownProps> = ({
  endIdo,
  endDeposits,
  poolStatus,
}) => {
  return (
    <div className="flex flex-col space-y-2">
      <div className="rounded-xl p-1 grid grid-cols-2 gap-2">
        <div>
          <div className="text-sm text-secondary flex flex-row items-center justify-center">
            <span className="mr-1">Sale period ends</span>
            <Tooltip title="In the first 12 hours, you may deposit or withdraw your USDC from the vault. During the sale period, the SLND price can fluctuate.">
              <img src="/icons/info.svg" className="inline-block" alt="info" />
            </Tooltip>
          </div>
          <PoolCountdown
            poolStatus={poolStatus}
            date={endDeposits}
            className="justify-center pt-2"
          />
        </div>
        <div>
          <div className="text-sm text-secondary flex flex-row items-center justify-center">
            <span className="mr-1">Grace period ends</span>
            <Tooltip title="After 12 hours, deposits will be restricted and only withdrawals allowed. During the grace period, the SLND price can only go down.">
              <img src="/icons/info.svg" className="inline-block" alt="info" />
            </Tooltip>
          </div>
          <PoolCountdown
            poolStatus={poolStatus}
            date={endIdo}
            className="justify-center pt-2"
          />
        </div>
      </div>
    </div>
  )
}

export default Countdown

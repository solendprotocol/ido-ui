import BigNumber from 'bignumber.js'
import React from 'react'

import NumberText from '../texts/Number'
import Typography from '../typography/Typography'

interface StatsCardProps {
  estimatedPrice: BigNumber
  vaultPrtBalance: number
  vaultUsdcBalance: number
}

const StatsCard: React.FC<StatsCardProps> = ({
  estimatedPrice,
  vaultPrtBalance,
  vaultUsdcBalance,
}) => {
  return (
    <div className="flex flex-col space-y-2 gap-1">
      <div className="bg-secondary p-5 text-center">
        <Typography>USDC Contributed</Typography>
        <div className="flex items-center justify-center pt-2">
          <img
            alt=""
            width="20"
            height="20"
            src="/icons/usdc.svg"
            className="mr-2"
          />
          <NumberText
            className="text-mdx"
            value={vaultUsdcBalance}
            defaultIfNull="N/A"
          />
        </div>
      </div>
      <div className="bg-secondary p-5 text-center">
        <Typography>Estimated Token Price</Typography>
        <div className="flex items-center justify-center pt-2">
          <img
            alt=""
            width="20"
            height="20"
            src="/icons/usdc.svg"
            className="mr-2"
          />
          <NumberText
            className="text-mdx"
            value={estimatedPrice}
            defaultIfNull="N/A"
            displayDecimals={6}
          />
        </div>
      </div>
      <div className="bg-secondary p-5 text-center">
        <Typography>SLND For Sale</Typography>
        <div className="flex items-center justify-center pt-2">
          <img className="h-5 mr-2 w-auto" src="/icons/slnd.png" alt="slnd" />
          <NumberText
            className="text-mdx"
            value={vaultPrtBalance}
            defaultIfNull="N/A"
          />
        </div>
      </div>
    </div>
  )
}

export default StatsCard

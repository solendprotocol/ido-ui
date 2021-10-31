import { Col, Row, Tooltip } from 'antd'
import BigNumber from 'bignumber.js'
import React from 'react'

import {
  formatRoundedUSD,
  formatToken,
  formatUSD,
} from '../../utils/numberFormatter'
import { TokenIcon } from '../icons'
import NumberText from '../texts/Number'
import Typography from '../typography/Typography'
import RowMetric from './RowMetric'

interface StatsCardProps {
  estimatedPrice: BigNumber
  vaultSlndBalance: number
  vaultUsdcBalance: number
  userUsdcDeposits: number
}

const StatsCard: React.FC<StatsCardProps> = ({
  estimatedPrice,
  vaultSlndBalance,
  vaultUsdcBalance,
  userUsdcDeposits,
}) => {
  return (
    <Row>
      <RowMetric
        label="USDC contributed"
        value={formatToken(vaultUsdcBalance, 4, true)}
      />
      <RowMetric
        label="Total SLND for sale"
        value={<>{formatToken(vaultSlndBalance, 4, true)}</>}
      />
      <RowMetric
        label="Implied token price"
        value={
          <>
            {estimatedPrice && !estimatedPrice.isNaN() ? (
              <>${formatToken(estimatedPrice.toString(), 4, true)}</>
            ) : (
              '-'
            )}
          </>
        }
      />
      <RowMetric
        label="Implied fully diluted market cap"
        tooltip="The SLND token supply will be 100,000,000 once fully distributed into circulation. This is the implied token price multiplied by that max total supply."
        value={
          <>
            {estimatedPrice && !estimatedPrice.isNaN() ? (
              <>
                $
                {formatRoundedUSD(
                  estimatedPrice
                    .multipliedBy(new BigNumber(100000000))
                    .toString()
                )}
              </>
            ) : (
              '-'
            )}
          </>
        }
      />
      <Col className="m-1" />
      <RowMetric
        label="Your USDC deposit"
        value={formatToken(userUsdcDeposits, 4, true)}
        className="card"
      />
      <RowMetric
        label="Your SLND allocation"
        value={
          estimatedPrice && !estimatedPrice.isNaN()
            ? formatToken(
                new BigNumber(vaultSlndBalance)
                  .multipliedBy(
                    new BigNumber(userUsdcDeposits).div(vaultUsdcBalance)
                  )
                  .toString()
              )
            : '-'
        }
        tooltip="Based on current total contributions to the vault, this is what you'll receive. This is subject to change as the contribution pool size changes."
        className="card"
      />
    </Row>
  )
}

export default StatsCard

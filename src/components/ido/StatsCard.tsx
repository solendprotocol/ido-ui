import { Col, Row, Tooltip } from 'antd'
import BigNumber from 'bignumber.js'
import React from 'react'
import { formatToken, formatUSD } from '../../utils/numberFormatter'

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
        label="Estimated token price"
        value={estimatedPrice && !estimatedPrice.isNaN() ? formatUSD(estimatedPrice.toString()) : '-'}
      />
      <RowMetric
        label="Total SLND for sale"
        value={<>{formatToken(vaultSlndBalance, 4, true)}/SLND</>}
      />
      <Col className="m-1"/>
      <RowMetric
        label="Your USDC deposit"
        value={formatToken(userUsdcDeposits, 4, true)}
        className="card"
      />
      <RowMetric
        label="Your current SLND allocation"
        value={estimatedPrice && !estimatedPrice.isNaN() ? formatToken(new BigNumber(vaultSlndBalance).div(estimatedPrice).multipliedBy(userUsdcDeposits).toString()): '-'}
        tooltip="Based on current total contributions to the vault, this is what you'll receive. This is subject to change as the contribution pool size changes."
        className="card"
      />
    </Row>
  );
}

export default StatsCard

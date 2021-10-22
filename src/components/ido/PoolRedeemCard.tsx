import { Col, Row } from 'antd'
import BigNumber from 'bignumber.js'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import ReactMomentCountDown from 'react-moment-countdown'

import { IDO_RESULTS } from '../../config/constants'
import useLargestAccounts from '../../hooks/useLargestAccounts'
import usePool from '../../hooks/usePool'
import useVaults from '../../hooks/useVaults'
import { notify } from '../../stores/useNotificationStore'
import useWalletStore, { PoolAccount } from '../../stores/useWalletStore'
import { calculateSupply } from '../../utils/balance'
import { formatToken, formatUSD } from '../../utils/numberFormatter'
import { Button } from '../button'
import NumberText from '../texts/Number'
import Typography from '../typography/Typography'
import PoolCountdown from './PoolCountdown'
import RowMetric from './RowMetric'

interface PoolRedeemCardProps {
  pool: PoolAccount
}

const PoolRedeemCard: React.FC<PoolRedeemCardProps> = ({ pool }) => {
  const actions = useWalletStore((s) => s.actions)
  const connected = useWalletStore((s) => s.connected)
  const mints = useWalletStore((s) => s.mints)
  const largestAccounts = useLargestAccounts(pool)
  const { slndBalance, usdcBalance, fetchVaults } = useVaults(pool)
  const { startRedeem } = usePool(pool)
  const [submitting, setSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)

  const contributeBalance = largestAccounts.redeemable?.balance || 0

  const redeemableSlndAmount = useMemo(() => {
    const redeemableSupply = calculateSupply(mints, pool.redeemableMint)
    return slndBalance && redeemableSupply
      ? (contributeBalance * slndBalance) / redeemableSupply
      : 0
  }, [slndBalance, contributeBalance, mints, pool.redeemableMint])

  const handleRedeem = useCallback(() => {
    setSubmitting(true)
  }, [])

  useEffect(() => {
    if (pool.redeemableMint) {
      actions.fetchMints()
    }
  }, [])

  useEffect(() => {
    setLoading(true)
    if (largestAccounts.redeemable) {
      setLoading(false)
    }
  }, [largestAccounts])

  useEffect(() => {
    if (submitting) {
      const handleSubmit = async () => {
        try {
          await actions.submitRedeem(pool)
          setSubmitting(false)
          fetchVaults()
        } catch (e) {
          notify({
            type: 'error',
            title: 'Redeem error',
            message: e.message,
          })
          setSubmitting(false)
        }
      }
      handleSubmit()
    }
  }, [submitting])

  const idoResult = IDO_RESULTS[pool.publicKey.toBase58()]
  const estimatedPrice = new BigNumber(
    idoResult?.contributed || usdcBalance
  ).dividedBy(idoResult?.allocation || slndBalance)

  const disableSubmit =
    !connected || loading || redeemableSlndAmount <= 0 || startRedeem.isAfter()

  return (
    <Row className="modal relative" justify="center">
      {startRedeem.isAfter() && (
        <Typography className="redeemCountdown">
          You can redeem your token in{' '}
          <ReactMomentCountDown toDate={startRedeem} />
        </Typography>
      )}
      <Col span={24} className="text-center	">
        <Typography level="display">
          {formatToken(redeemableSlndAmount)} SLND
        </Typography>
      </Col>
      <RowMetric
        label="Total USDC raised"
        value={formatToken(idoResult?.contributed || usdcBalance, 4, true)}
      />
      <RowMetric label="Total SLND for sale" value={formatToken(slndBalance)} />
      <RowMetric
        label="Token price"
        value={formatUSD(
          estimatedPrice && !estimatedPrice.isNaN()
            ? estimatedPrice.toString()
            : 0
        )}
        tooltip="Token price is calculated by dividing the total USDC raised by the amount of tokens for sale."
      />
      <Col className="m-1" />
      <RowMetric
        label="Your USDC contribution"
        value={formatUSD(contributeBalance)}
        tooltip="Token price is calculated by dividing the total USDC raised by the amount of tokens for sale."
        className="card"
      />
      <RowMetric
        label="Redeemable SLND"
        value={formatUSD(redeemableSlndAmount)}
        tooltip="Token price is calculated by dividing the total USDC raised by the amount of tokens for sale."
        className="card"
      />
      <Button
        onClick={handleRedeem}
        disabled={disableSubmit}
        isLoading={submitting}
        variant="secondary"
      >
        {submitting ? 'Waiting approval' : 'Redeem SLND'}
      </Button>
      <Typography color="secondary" className="modalFooter">
        {formatToken(usdcBalance)} USDC in wallet
      </Typography>
    </Row>
  )
}

export default PoolRedeemCard

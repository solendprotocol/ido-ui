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
import { calculateBalance, calculateSupply } from '../../utils/balance'
import { formatToken, formatUSD } from '../../utils/numberFormatter'
import { Button } from '../button'
import { TokenIcon } from '../icons'
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
  const {
    slndBalance,
    usdcBalance: vaultUsdcBalance,
    fetchVaults,
  } = useVaults(pool)
  const { startRedeem } = usePool(pool)
  const [submitting, setSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)

  const contributeBalance = largestAccounts.redeemable?.balance || 0
  const userUsdcAmount = largestAccounts.usdc?.balance || 0

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
    idoResult?.contributed || vaultUsdcBalance
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
        <Typography
          level="display"
          style={{
            fontSize: 36,
          }}
        >
          {formatToken(redeemableSlndAmount)} SLND
        </Typography>
      </Col>
      <RowMetric
        label="Total USDC raised"
        value={
          <>
            {formatToken(idoResult?.contributed || vaultUsdcBalance, 4, true)}{' '}
            <TokenIcon
              className="inline-block"
              symbol="USDC"
              icon="usdc.svg"
              size="16"
            />
          </>
        }
      />
      <RowMetric
        label="Total SLND for sale"
        value={
          <>
            {formatToken(idoResult?.allocation || slndBalance)}{' '}
            <TokenIcon
              className="inline-block"
              symbol="SLND"
              icon="slnd.png"
              size="16"
            />
          </>
        }
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
        tooltip="Token price is calculated by dividing the total USDC raised by the amount of tokens for sale."
      />
      <Col className="m-1" />
      {contributeBalance && contributeBalance > 0 && (
        <RowMetric
          label="Your USDC contribution"
          value={formatToken(contributeBalance, 4, true)}
          className="card"
        />
      )}
      <RowMetric
        label="Redeemable SLND"
        value={formatToken(redeemableSlndAmount, 4, true)}
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
        {formatToken(userUsdcAmount)} USDC in wallet
      </Typography>
    </Row>
  )
}

export default PoolRedeemCard

import { InformationCircleIcon, QuestionMarkCircleIcon } from '@heroicons/react/outline'
import BigNumber from 'bignumber.js'
import React, { useCallback, useEffect, useState } from 'react'

// import useIpAddress from '../../hooks/useIpAddress's
import useLargestAccounts from '../../hooks/useLargestAccounts'
import usePool from '../../hooks/usePool'
import useVaults from '../../hooks/useVaults'
import { notify } from '../../stores/useNotificationStore'
import useWalletStore, { PoolAccount } from '../../stores/useWalletStore'
import { Button } from '../button'
import { AmountInput } from '../input/AmountInput'
import { ButtonMenu, ButtonMenuItem } from '../menu'
import Countdown from './Countdown'
import StatsCard from './StatsCard'

interface PoolContribCardProps {
  pool: PoolAccount;
  isDeposit: boolean;
  setIsDeposit: (arg: boolean) => void;
}

const PoolContribCard: React.FC<PoolContribCardProps> = ({ pool, isDeposit, setIsDeposit }) => {
  const actions = useWalletStore((s) => s.actions)
  const connected = useWalletStore((s) => s.connected)
  const largestAccounts = useLargestAccounts(pool)
  const { startIdo, endIdo, endDeposits, poolStatus } = usePool(pool)
  const vaults = useVaults(pool)
  // const { ipAllowed } = useIpAddress()

  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const [inputAmount, setInputAmount] = useState('0')

  const usdcBalance = largestAccounts.usdc?.balance || 0
  const redeemableBalance = largestAccounts.redeemable?.balance || 0
  const totalBalance = isDeposit ? usdcBalance : redeemableBalance

  useEffect(() => {
    setInputAmount('')
  }, [totalBalance])

  const handleSubmitContribution = useCallback(() => {
    setSubmitting(true)
  }, [])

  const handleChangeMode = useCallback(
    (value: number) => {
      setIsDeposit(value === 0)
    },
    [setIsDeposit]
  )

  const handleChangeAmount = useCallback(
    (amount: string) => {
      setInputAmount(amount)
      if (isDeposit && endDeposits?.isBefore() && +amount > redeemableBalance) {
        notify({
          title: 'Deposits ended',
          message: 'Contribution cannot increase',
        })
      }
    },
    [isDeposit, endDeposits, redeemableBalance]
  )

  const handleRefresh = useCallback(async () => {
    console.log('handleRefresh start')

    setRefreshing(true)
    try {
      await actions.fetchWalletTokenAccounts()
    } finally {
      setTimeout(() => setRefreshing(false), 1000)
    }
  }, [actions])

  const getInputError = useCallback(() => {
    const inputError = {
      hasError: false,
      message: '',
    }
    if (submitting) {
      return inputError
    }

    if (new BigNumber(inputAmount).gt(totalBalance)) {
      inputError.hasError = true
      inputError.message = `Insufficient USDC balance`
      return inputError
    }

    return inputError
  }, [submitting, isDeposit, inputAmount, totalBalance])

  useEffect(() => {
    if (!loading) {
      return
    }
    if (isDeposit && largestAccounts.usdc) {
      setLoading(false)
    }
    if (!isDeposit && largestAccounts.redeemable) {
      setLoading(false)
    }
    setTimeout(() => setLoading(false), 2000)
  }, [largestAccounts])

  useEffect(() => {
    if (submitting) {
      const handleSubmit = async () => {
        if (+inputAmount <= 0) {
          notify({
            type: 'warn',
            title: isDeposit
              ? 'Required a deposit amount'
              : 'Required a withdraw amount',
            message: 'Please enter a valid amount',
          })
          setSubmitting(false)
          return
        }
        try {
          if (isDeposit) {
            await actions.submitDepositContribution(pool, +inputAmount)
          } else {
            await actions.submitWithdrawContribution(pool, +inputAmount)
          }
          setSubmitting(false)
          vaults.fetchVaults()
        } catch (e) {
          notify({
            type: 'error',
            title: isDeposit ? 'Deposit error' : 'Withdraw error',
            message: e.message,
          })
          setSubmitting(false)
        }
      }
      handleSubmit()
    }
  }, [submitting, isDeposit])

  const canDeposit =
    startIdo.isBefore() && endIdo.isAfter() && endDeposits.isAfter()
  const canWithdraw = startIdo.isBefore() && endIdo.isAfter()

  useEffect(() => {
    if (!canDeposit && startIdo.isBefore()) {
      handleChangeMode(1)
    }
  }, [canDeposit, startIdo])

  const inputError = getInputError()

  const disableSubmit =
    !connected ||
    loading ||
    submitting ||
    inputError.hasError ||
    (isDeposit ? !canDeposit : !canWithdraw)

  return (
    <>
      <div className="mt-4" />

      <Countdown
        endDeposits={endDeposits}
        endIdo={endIdo}
        poolStatus={poolStatus}
      />
      <div style={{
        margin: '32px 0',
      }}>
        <AmountInput
          title={isDeposit ? 'I want to deposit' : 'Withdraw collateral'}
          placeholder="0"
          maxValue={totalBalance.toString()}
          maxIsLoading={connected && loading}
          maxIsRefreshing={refreshing}
          maxLabel={isDeposit ? `balance:` : `max withdraw:`}
          errorMessage={inputError.message}
          hasError={inputError.hasError}
          tokenSymbol="USDC"
          tokenIcon="usdc.svg"
          value={inputAmount}
          valueRound="ceil"
          decimals={6}
          onRefreshMax={handleRefresh}
          onChange={handleChangeAmount}
          disabled={!connected}
        />
      <Button
        onClick={handleSubmitContribution}
        className="w-full my-4"
        disabled={disableSubmit}
        isLoading={submitting}
      >
        {submitting ? 'Waiting approval' : isDeposit ? `Deposit` : `Withdraw`}
      </Button>
      </div>
      {/* Country Not Allowed 🇺🇸😭 */}
      {endDeposits?.isBefore() && endIdo?.isAfter() && (
        <div className="flex items-center space-x-2 mb-4">
          <InformationCircleIcon className="h-5 w-5 text-secondary" />
          <div className="text-xxs sm:text-xs">
            <p className="mb-1">
              You can only withdraw your contribution during the grace period.
            </p>
            <p>Any withdrawals cannot be reversed.</p>
          </div>
        </div>
      )}
      <StatsCard
        vaultPrtBalance={vaults.prtBalance}
        vaultUsdcBalance={vaults.usdcBalance}
        estimatedPrice={vaults.estimatedPrice}
      />
    </>
  )
}

export default PoolContribCard

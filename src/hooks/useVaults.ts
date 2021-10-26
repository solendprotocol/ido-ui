import BigNumber from 'bignumber.js'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { notify } from '../stores/useNotificationStore'
import useWalletStore, { PoolAccount } from '../stores/useWalletStore'
import { calculateBalance } from '../utils/balance'
import { TokenAccount } from '../utils/tokens'
import useInterval from './useInterval'

export default function useVaults(pool: PoolAccount) {
  const { mints, actions } = useWalletStore((s) => s)
  const [usdcVault, setUsdcVault] = useState<TokenAccount | undefined>()
  const [slndVault, setSlndVault] = useState<TokenAccount | undefined>()

  const fetchVaults = useCallback(async () => {
    const { usdc, watermelon } = await actions.fetchVaults(pool)
    setUsdcVault(usdc)
    setSlndVault(watermelon)
  }, [actions, setUsdcVault, setSlndVault])

  useEffect(() => {
    fetchVaults().catch((e) => {
      notify({
        type: 'warn',
        title: 'Update vaults failed',
        message: e.message,
      })
    })
  }, [])

  useInterval(async () => {
    // refresh vaults regularly (to update price/usdc)
    await fetchVaults()
    // fetch RedeemableMint account to update mint total supply
    await actions.fetchRedeemableMint(pool)
  }, 15_000)

  const usdcBalance = useMemo(
    () => calculateBalance(mints, usdcVault),
    [mints, usdcVault]
  )
  const slndBalance = useMemo(
    () => calculateBalance(mints, slndVault),
    [mints, slndVault]
  )

  const estimatedPrice = useMemo(
    () =>
      usdcBalance && slndBalance
        ? new BigNumber(usdcBalance).dividedBy(slndBalance)
        : undefined,
    [usdcBalance, slndBalance]
  )

  return { usdcBalance, slndBalance, estimatedPrice, fetchVaults }
}

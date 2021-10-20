import classNames from 'classnames'
import React, { ReactNode } from 'react'

import useDeviceMode from '../../hooks/useDeviceMode'
import usePool from '../../hooks/usePool'
import { PoolAccount } from '../../stores/useWalletStore'
import Typography from '../typography/Typography'

interface CardBaseProps {
  pool?: PoolAccount
  isDeposit?: boolean
  setIsDeposit?: (arg: boolean) => void
  title: string
  titleRight?: ReactNode
  overlayContent?: ReactNode
  className?: string
  children: ReactNode
}

const CardBase: React.FC<CardBaseProps> = ({
  pool,
  isDeposit,
  setIsDeposit,
  overlayContent,
  children,
  className,
}) => {
  const { startIdo, endIdo, endDeposits } = usePool(pool)
  const { isMobile } = useDeviceMode()
  let canDeposit
  if (pool) {
    canDeposit =
      startIdo.isBefore() && endIdo.isAfter() && endDeposits.isAfter()
  }

  const header =
    endIdo && endIdo.isBefore() ? (
      <header className="flex flex-row items-center">
        <Typography
          level="headline"
          color="primary"
          className={classNames(
            'flex-1 text-center p-4',
            'border-t-2 border-textDefault'
          )}
        >
          Redeem phase
        </Typography>
      </header>
    ) : (
      <header className="flex flex-row items-center">
        <Typography
          level="headline"
          color="primary"
          className={classNames(
            'flex-1 text-center p-4',
            !isDeposit ? 'bg-default' : 'border-t-2 border-textDefault',
            !canDeposit && 'cursor-not-allowed'
          )}
          style={{
            cursor: 'pointer',
          }}
          onClick={() => setIsDeposit(true)}
        >
          <>
            {!canDeposit && (
              <>
                <img
                  alt=""
                  width="12"
                  height="12"
                  src="/icons/lock.png"
                  style={{
                    display: 'inline-block',
                    marginBottom: 4,
                  }}
                />{' '}
              </>
            )}
            Deposit phase
          </>
        </Typography>
        <Typography
          level="headline"
          color="primary"
          className={classNames(
            'flex-1 text-center p-4',
            !isDeposit ? 'border-t-2 border-textDefault' : 'bg-default'
          )}
          style={{
            cursor: 'pointer',
          }}
          onClick={() => setIsDeposit(false)}
        >
          Withdraw phase
        </Typography>
      </header>
    )

  return (
    <div
      className={classNames(
        'bg-scaffold w-full max-w-card overflow-hidden relative',
        !isMobile && 'shadow-card',
        className
      )}
    >
      {overlayContent}
      <div
        className={classNames({
          'w-full h-full filter blur-sm': !!overlayContent,
        })}
      >
        {!!overlayContent && (
          <div className="absolute z-10 bg-scaffold top-0 bottom-0 left-0 right-0" />
        )}
        {pool && header}
        <div className="p-4 sm:p-6 break-words">{children}</div>
      </div>
    </div>
  )
}

export default CardBase

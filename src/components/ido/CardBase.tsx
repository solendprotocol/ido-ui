import classNames from 'classnames'
import React, { ReactNode } from 'react'

import Typography from '../typography/Typography'

interface CardBaseProps {
  endIdo: boolean
  title: string
  titleRight?: ReactNode
  overlayContent?: ReactNode
  className?: string
  children: ReactNode
}

const CardBase: React.FC<CardBaseProps> = ({
  endIdo,
  overlayContent,
  children,
  className,
}) => {
  return (
    <div
      className={classNames(
        'bg-white w-full max-w-card rounded-3xl shadow-card overflow-hidden relative',
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
          <div className="absolute rounded-3xl z-10 bg-overlay top-0 bottom-0 left-0 right-0" />
        )}
        <header className="flex flex-row items-center">
          <Typography
            level="headline"
            color="primary"
            className={classNames(
              'flex-1 text-center p-4',
              endIdo
                ? 'bg-default cursor-not-allowed'
                : 'border-t-2 border-textDefault'
            )}
          >
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
              Deposit phase
            </>
          </Typography>
          <Typography
            level="headline"
            color="primary"
            className={classNames(
              'flex-1 text-center p-4',
              endIdo
                ? 'border-t-2 border-textDefault'
                : 'bg-default cursor-not-allowed'
            )}
          >
            Withdraw phase
          </Typography>
        </header>
        <div className="p-4 sm:p-6 break-words">{children}</div>
      </div>
    </div>
  )
}

export default CardBase

import { RefreshIcon } from '@heroicons/react/outline'
import BigNumber from 'bignumber.js'
import classNames from 'classnames'
import React, { useCallback } from 'react'
import NumberFormat, { NumberFormatValues } from 'react-number-format'

import SortDown from '../../../public/icons/sort-down.svg'
import { TokenIcon } from '../icons'
import PercentButton from '../percent-button'
import { Spinner } from '../spinner'
import Typography from '../typography/Typography'

const toSafeNum = (
  value: string,
  decimals: number,
  round: 'floor' | 'ceil'
): string | undefined => {
  const safeNum = new BigNumber(value)
  if (safeNum.isNaN()) {
    return
  }
  switch (round) {
    case 'ceil':
      return safeNum.decimalPlaces(decimals, BigNumber.ROUND_CEIL).toString()
    case 'floor':
      return safeNum.decimalPlaces(decimals, BigNumber.ROUND_FLOOR).toString()
    default:
      return
  }
}

type AmountInputProps = {
  className?: string
  title: string
  errorMessage?: string
  placeholder: string
  value: string
  valueRound: 'floor' | 'ceil'
  maxLabel?: string
  maxValue?: string
  maxPercentage?: number
  maxIsLoading?: boolean
  maxIsRefreshing?: boolean
  tokenIcon: string
  tokenSymbol: string
  tokenNameDetail?: string
  decimals: number
  disabled?: boolean
  readOnly?: boolean
  hasError?: boolean
  onChange?: (value: string) => void
  onRefreshMax?: () => void
  onSelectToken?: () => void
}

export const AmountInput: React.FC<AmountInputProps> = ({
  className,
  title,
  maxLabel,
  maxValue,
  maxPercentage = 100,
  maxIsLoading,
  maxIsRefreshing,
  placeholder,
  tokenIcon,
  tokenSymbol,
  tokenNameDetail = null,
  value,
  valueRound,
  decimals,
  disabled = false,
  readOnly = false,
  hasError = false,
  errorMessage,
  onChange,
  onRefreshMax,
  onSelectToken,
}) => {
  const handleChange = useCallback(
    ({ value }: NumberFormatValues) => {
      if (!onChange) {
        return
      }
      onChange(value)
    },
    [onChange]
  )

  const handleCheckValidInput = useCallback(
    ({ value }: NumberFormatValues) => {
      return !!value.match(`^\\d*\\.?\\d{0,${decimals}}$`)?.length
    },
    [onChange, decimals]
  )

  const handleSelectMax = useCallback(() => {
    if (!onChange || disabled || readOnly || !maxValue) {
      return
    }
    const safeNum = toSafeNum(maxValue, decimals, valueRound)
    if (safeNum) {
      onChange(safeNum)
    }
  }, [onChange, disabled, readOnly, maxValue])

  const handleSelectPercent = useCallback(
    (value) => {
      if (!onChange || disabled || readOnly) {
        return
      }
      if (value) {
        const safeNum = toSafeNum(value, decimals, valueRound)
        if (safeNum) {
          onChange(safeNum)
        }
      }
    },
    [onChange, disabled, readOnly]
  )

  return (
    <div className="mb-1">
      <div className="flex flex-row items-center justify-between mb-1">
        <Typography level="caption" color="secondary">
          {title}
        </Typography>
        {!!maxValue && (
          <PercentButton
            disabled={disabled && maxIsLoading}
            current={value}
            max={maxValue}
            maxPercentage={maxPercentage}
            onChange={handleSelectPercent}
          />
        )}
      </div>
      <div
        className={classNames('flex flex-row items-center rounded-lg border', {
          'bg-disabled': disabled,
          'bg-input': !disabled,
          'bg-tertiary': readOnly,
          'border-transparent': !hasError,
          'border-error': hasError,
          className,
        })}
      >
        <NumberFormat
          thousandSeparator
          className={classNames(
            'flex-1 p-4 appearance-none w-full outline-none focus:outline-none text-black bg-transparent',
            {
              'text-disabled': disabled && !readOnly,
            }
          )}
          value={value}
          isAllowed={handleCheckValidInput}
          isNumericString
          placeholder={placeholder}
          onValueChange={handleChange}
          disabled={disabled}
          readOnly={readOnly}
          autoComplete="off"
          inputMode="numeric"
        />
        <button
          className={classNames(
            'flex flex-row items-center justify-center space-x-1 p-2 pr-4 outline-none m-w-24 ease-out transition-colors duration-100 focus:outline-none rounded-lg',
            {
              'hover:bg-secondary': !disabled && onSelectToken,
              'cursor-default': disabled || !onSelectToken,
            }
          )}
          onClick={onSelectToken}
          disabled={disabled}
        >
          <TokenIcon symbol={tokenSymbol} icon={tokenIcon} size="24" />
          {!!onSelectToken && (
            <SortDown
              className={classNames('w-2 ml-2 relative fill-current', {
                visible: onSelectToken,
                'text-secondary': disabled,
                'text-black': !disabled,
              })}
            />
          )}
        </button>
      </div>
      <div className="flex flex-row py-2">
        {hasError && <span className="text-xs text-error">{errorMessage}</span>}
        <span className="flex-1" />
        <button
          className="text-xs text-secondary outline-none focus:outline-none"
          onClick={handleSelectMax}
        >
          <Typography level="caption" color="secondary">
            {maxLabel} {maxIsLoading ? '' : maxValue}
          </Typography>
        </button>
        {maxIsLoading && <Spinner className="mx-1" size="sm" />}
        {onRefreshMax && (
          <button disabled={maxIsRefreshing} onClick={onRefreshMax}>
            <RefreshIcon
              className={classNames('w-3 h-3 ml-1', {
                'animate-spin': maxIsRefreshing,
              })}
            />
          </button>
        )}
      </div>
    </div>
  )
}

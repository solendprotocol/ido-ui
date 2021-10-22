import classNames from 'classnames'
import React, { cloneElement, ElementType, isValidElement } from 'react'

import { Spinner } from '../spinner'
import Typography from '../typography/Typography'
import { ButtonProps, sizes, variants } from './types'

const Button = <E extends ElementType = 'button'>(
  props: ButtonProps<E>
): JSX.Element => {
  const {
    startIcon,
    endIcon,
    className,
    variant = variants.PRIMARY,
    size = sizes.MD,
    isLoading = false,
    disabled = false,
    children,
    block = false,
    ...rest
  } = props
  const isDisabled = isLoading || disabled

  return (
    <button
      disabled={isDisabled}
      className={classNames(
        'font-bold px-4 flex flex-row items-center justify-center outline-none ring-opacity-75 text-black focus:outline-none custom-button-active-effect',
        {
          'w-full': block,
          'py-2': size !== sizes.XS,
          'py-1': size === sizes.XS,
          'h-7': size === sizes.XS,
          'h-9': size === sizes.SM,
          'h-16': size === sizes.MD,
          'text-base': size === sizes.XS,
          'text-sm': size === sizes.SM,
          'text-lg': size === sizes.MD,
          'rounded-xl': size === sizes.MD,
          rounded: size === sizes.XS,
          'rounded-lg': size === sizes.SM,
          'bg-black hover:bg-blackHover':
            variant === variants.PRIMARY,
          'bg-brandSecondary hover:bg-brandSecondaryHover':
            variant === variants.SECONDARY,
          'bg-failure hover:bg-failureHover': variant === variants.DANGER,
          'bg-disabled hover:bg-disabled active:shadow-none cursor-not-allowed remove-active-effect':
            isDisabled,
          'text-disabled': isDisabled,
        },
        className,
        'mainBtn'
      )}
      {...rest}
    >
      <>
        {isLoading && <Spinner className="mr-2" />}
        {isValidElement(startIcon) && cloneElement(startIcon)}
        <Typography level="headline" className="m-0">{children}</Typography>
        {isValidElement(endIcon) && cloneElement(endIcon)}
      </>
    </button>
  )
}

export default Button

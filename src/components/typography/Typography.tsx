import classNames from 'classnames'
import React, { ReactElement } from 'react'

type TypographyPropsType = {
  className?: string
  level?:
    | 'display'
    | 'title'
    | 'titleLabel'
    | 'headline'
    | 'body'
    | 'bodyMono'
    | 'label'
    | 'caption'
    | 'captionMono'
    | 'disclosure'
  color?:
    | 'primary'
    | 'secondary'
    | 'line'
    | 'neutralAlt'
    | 'neutral'
    | 'overlay'
    | 'secondary'
    | 'brand'
  children?: React.ReactNode
}

Typography.defaultProps = {
  className: '',
  level: 'body',
  color: 'primary',
  children: null,
}

function Typography({
  level = 'body',
  color = 'primary',
  className = '',
  children,
}: TypographyPropsType): ReactElement {
  const componentMap = {
    display: 'h1',
    title: 'h2',
    headline: 'h3',
    titleLabel: 'span',
    body: 'span',
    bodyMono: 'code',
    label: 'label',
    caption: 'span',
    captionMono: 'span',
    disclosure: 'span',
  }

  const HtmlTag = componentMap[level]

  return React.createElement(
    HtmlTag,
    {
      className: classNames(color, level, className),
    },
    children
  )
}

export default Typography

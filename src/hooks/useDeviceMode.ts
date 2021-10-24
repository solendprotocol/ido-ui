import { Breakpoint, responsiveMap } from 'antd/lib/_util/responsiveObserve'
import { useMediaQuery } from 'react-responsive'

// Borrow breakpoints from Antd so we are consistent

/* eslint-disable @typescript-eslint/no-explicit-any */
export type AntdGridSpaceMapType = {
  xs?: any
  sm?: any
  md?: any
  lg?: any
  xl?: any
  xxl?: any
}
/* eslint-enable @typescript-eslint/no-explicit-any */

type ViewModeContextType = {
  breakpoints: Array<{
    key: Breakpoint
    mediaQueryMatch: boolean
  }>
  xxl: boolean
  xl: boolean
  lg: boolean
  md: boolean
  sm: boolean
  xs: boolean
  isMobile: boolean
  isPortrait: boolean
  isRetina: boolean
  useMediaQuery: ({ query }: { query: string }) => boolean
}

export default function useViewMode(): ViewModeContextType {
  const breakpoints: Array<{ key: Breakpoint; mediaQueryMatch: boolean }> = [
    {
      // extra large screen
      key: 'xxl',
      mediaQueryMatch: useMediaQuery({ query: responsiveMap.xxl }),
    },
    {
      // large screens
      key: 'xl',
      mediaQueryMatch: useMediaQuery({ query: responsiveMap.xl }),
    },
    {
      // desktops
      key: 'lg',
      mediaQueryMatch: useMediaQuery({ query: responsiveMap.lg }),
    },
    {
      // small screens
      key: 'md',
      mediaQueryMatch: useMediaQuery({ query: responsiveMap.md }),
    },
    {
      // tablets
      key: 'sm',
      mediaQueryMatch: useMediaQuery({ query: responsiveMap.sm }),
    },
    {
      // mobile
      key: 'xs',
      mediaQueryMatch: useMediaQuery({ query: responsiveMap.xs }),
    },
  ]

  console.log(useMediaQuery({ query: responsiveMap.xl }), responsiveMap.xl)

  /* eslint-disable */
  const fromPairs = (arr: any) =>
    arr.reduce((acc: any, val: any) => ((acc[val[0]] = val[1]), acc), {})
  /* eslint-enable */

  const breakpointMap = fromPairs(
    breakpoints.map((bp) => [bp.key, bp.mediaQueryMatch])
  ) as { [key in Breakpoint]: boolean }

  // Other queries
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
  const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })
  const isMobile = useMediaQuery({ query: '(max-width: 640px)' })

  return {
    breakpoints,
    ...breakpointMap,
    isPortrait,
    isRetina,
    isMobile,
    useMediaQuery,
  }
}

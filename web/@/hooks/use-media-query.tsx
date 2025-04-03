import * as React from 'react'

export function useMediaQuery(query: string) {
  const [value, setValue] = React.useState(false)

  React.useEffect(() => {
    function onChange(event: MediaQueryListEvent) {
      setValue(event.matches)
    }

    const result = matchMedia(query)
    result.addEventListener('change', onChange)
    setValue(result.matches)

    return () => result.removeEventListener('change', onChange)
  }, [query])

  return value
}

export function useIsXS() {
  return useMediaQuery('(max-width: 639px)')
}

export function useIsSM() {
  return useMediaQuery('(min-width: 640px)')
}

export function useIsMD() {
  return useMediaQuery('(min-width: 768px)')
}

export function useIsLG() {
  return useMediaQuery('(min-width: 1024px)')
}

export function useIsXL() {
  return useMediaQuery('(min-width: 1280px)')
}

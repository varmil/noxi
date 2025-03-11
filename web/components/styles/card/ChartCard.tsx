import { PropsWithChildren } from 'react'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

/**
 * No border for a Chart
 */
export function ChartCard({
  children,
  className
}: PropsWithChildren<{ className?: string }>) {
  return (
    <Card className={`border-0 bg-inherit shadow-none ${className}`}>
      {children}
    </Card>
  )
}

/**
 * Add px-1.5
 * グラフのAxisラベルと極力揃えたい
 */
export function ChartCardHeader({
  children,
  className
}: PropsWithChildren<{ className?: string }>) {
  return (
    <CardHeader className={`pt-0 px-1.5 ${className ?? ''}`}>
      {children}
    </CardHeader>
  )
}

export function ChartCardTitle({
  children,
  className
}: PropsWithChildren<{ className?: string }>) {
  return (
    <CardTitle
      className={`text-sm md:text-base md:leading-none font-semibold  ${
        className ?? ''
      }`}
    >
      {children}
    </CardTitle>
  )
}

/**
 * Add px-0
 * iPhone SE (375px) でも見栄え良くなるギリギリまで描画したい
 */
export function ChartCardContent({
  children,
  className
}: PropsWithChildren<{ className?: string }>) {
  return (
    <CardContent className={`pb-0 px-0 ${className}`}>{children}</CardContent>
  )
}

/**
 * 現状わりと適当
 */
export function ChartCardFooter({
  children,
  className
}: PropsWithChildren<{ className?: string }>) {
  return (
    <CardFooter className={`pt-2.5 pb-0 px-3 ${className}`}>
      {children}
    </CardFooter>
  )
}

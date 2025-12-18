export type DaysOption = 7 | 28 | 90

export interface ChartFilterParams {
  days: DaysOption
  group?: string
}

export const DEFAULT_DAYS: DaysOption = 28

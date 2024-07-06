/**
 * 88 240 880
 */
export type Thumbnails = Partial<
  Record<
    'default' | 'medium' | 'high',
    { url: string; width?: number; height?: number }
  >
>

/**
 * 120 320 480 640 1280
 */
export type Thumbnails = Partial<
  Record<
    'default' | 'medium' | 'high' | 'standard' | 'maxres',
    { url?: string | null; width?: number | null; height?: number | null }
  >
>

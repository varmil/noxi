export type Thumbnails = Partial<
  Record<
    'default' | 'medium' | 'high' | 'standard' | 'maxres',
    { url: string; width?: number; height?: number }
  >
>

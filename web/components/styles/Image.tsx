import { DetailedHTMLProps, ImgHTMLAttributes, PropsWithoutRef } from 'react'

type Props = Omit<
  DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>,
  'src' | 'srcSet'
> & {
  src: string | { '1x'?: string; '2x'?: string }
  alt: string
  width: number
  height: number
}

function srcToProps(args: Props['src']) {
  if (typeof args === 'string') return { src: args }
  return { srcSet: `${args['1x']} 1x, ${args['2x']} 2x` }
}

export default function Image({ src, alt, ...rest }: PropsWithoutRef<Props>) {
  return (
    <img
      alt={alt}
      loading="lazy"
      decoding="async"
      {...srcToProps(src)}
      {...rest}
    />
  )
}

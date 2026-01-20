import { SVGProps } from 'react'

export default function SuperChatIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M21.5 4h-19A1.5 1.5 0 001 5.5v13A1.5 1.5 0 002.5 20h19a1.5 1.5 0 001.5-1.5v-13A1.5 1.5 0 0021.5 4ZM3 18V6h18v12H3ZM8.4 7.2a1 1 0 00-.2 1.4l2.55 3.4H9.5a.5.5 0 000 1H11v1H9.5a.5.5 0 000 1H11v1a1 1 0 002 0v-1h1.5a.5.5 0 000-1H13v-1h1.5a.5.5 0 000-1h-1.25l2.55-3.4a1 1 0 10-1.6-1.2L12 10.333 9.8 7.4a1 1 0 00-1.4-.2Z" />
    </svg>
  )
}

import { SVGProps } from 'react'

export default function CommentIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      preserveAspectRatio="xMidYMid meet"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      focusable="false"
    >
      <g width="24" height="24" viewBox="0 0 24 24">
        <path d="M8 7H16V9H8V7ZM8 13H13V11H8V13ZM5 3V16H15H15.41L15.7 16.29L19 19.59V3H5ZM4 2H20V22L15 17H4V2Z"></path>
      </g>
    </svg>
  )
}

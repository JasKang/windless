import type { SVGProps } from 'react'

export default function LoadingIcon(props: SVGProps<SVGSVGElement>) {
  const { className, ...others } = props
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      className={`animate-spin ${className}`}
      {...others}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M21 12a9 9 0 1 1-6.219-8.56"
      ></path>
    </svg>
  )
}

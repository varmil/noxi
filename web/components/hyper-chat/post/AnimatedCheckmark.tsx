export function AnimatedCheckmark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 52 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="26"
        cy="26"
        r="24"
        stroke="currentColor"
        strokeWidth="3"
        className="animate-[circle_0.4s_ease-out_forwards] text-green-600 dark:text-green-400"
        style={{
          strokeDasharray: 151,
          strokeDashoffset: 151
        }}
      />
      <path
        d="M14 27l8 8 16-16"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="animate-[check_0.3s_0.4s_ease-out_forwards] text-green-600 dark:text-green-400"
        style={{
          strokeDasharray: 36,
          strokeDashoffset: 36
        }}
      />
      <style>{`
        @keyframes circle {
          to { stroke-dashoffset: 0; }
        }
        @keyframes check {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </svg>
  )
}

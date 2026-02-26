'use client'

import { useEffect, useState } from 'react'
import { Tickets } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AnimatedTicketIconProps {
  className?: string
  size?: string
}

export function AnimatedTicketIcon({
  className,
  size = 'size-16'
}: AnimatedTicketIconProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className={cn(
        'relative inline-flex items-center justify-center',
        className
      )}
    >
      {/* Glow effect background */}
      <div
        className={cn(
          'absolute inset-0 rounded-full bg-linear-to-r from-pink-500 to-rose-500 opacity-0 blur-xl transition-all duration-700',
          isVisible && 'animate-pulse opacity-60'
        )}
      />

      {/* Sparkle elements */}
      <div
        className={cn(
          'absolute -right-1 -top-1 h-2 w-2 rounded-full bg-pink-300 opacity-0 transition-all duration-500',
          isVisible && 'animate-ping opacity-75'
        )}
      />
      <div
        className={cn(
          'absolute -left-1 -bottom-1 h-1.5 w-1.5 rounded-full bg-rose-300 opacity-0 transition-all delay-150 duration-500',
          isVisible && 'animate-ping opacity-75'
        )}
      />

      {/* Main icon container with bounce animation */}
      <div
        className={cn(
          'relative flex items-center justify-center rounded-2xl bg-linear-to-br from-pink-500 via-pink-600 to-rose-500 p-3 shadow-lg shadow-pink-500/50 transition-all duration-700',
          isVisible
            ? 'scale-100 rotate-0 opacity-100'
            : 'scale-0 -rotate-12 opacity-0'
        )}
        style={{
          animation: isVisible
            ? 'bounceIn 0.7s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
            : undefined
        }}
      >
        {/* Shine overlay effect */}
        <div
          className={cn(
            'absolute inset-0 rounded-2xl bg-linear-to-tr from-transparent via-white/40 to-transparent opacity-0 transition-opacity duration-1000',
            isVisible && 'opacity-100'
          )}
          style={{
            animation: isVisible ? 'shine 1.5s ease-in-out 0.3s' : undefined
          }}
        />

        {/* Ticket icon */}
        <Tickets
          className={cn(size, 'relative z-10 text-white drop-shadow-lg')}
          strokeWidth={2.5}
        />
      </div>

      {/* CSS animations using global styles */}
      <style>{`
        @keyframes bounceIn {
          0% {
            transform: scale(0) rotate(-12deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.1) rotate(3deg);
          }
          70% {
            transform: scale(0.95) rotate(-1deg);
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }

        @keyframes shine {
          0% {
            transform: translateX(-100%) translateY(-100%) rotate(30deg);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateX(100%) translateY(100%) rotate(30deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}

'use client'

import { Smartphone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useGlobalRotate180 } from '../../../_hooks/theaterHooks'

export default function Rotate180Button({ className }: { className?: string }) {
  const { isRotate180, setRotate180 } = useGlobalRotate180()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setRotate180(!isRotate180)}
      className="sm:hidden"
    >
      <Smartphone className={`rotate-45 ${className}`} />
    </Button>
  )
}

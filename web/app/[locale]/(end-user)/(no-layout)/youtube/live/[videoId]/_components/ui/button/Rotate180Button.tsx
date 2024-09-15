'use client'

import { RotateCwSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useGlobalRotate180 } from '../../../_hooks/theaterHooks'

export default function Rotate180Button({ className }: { className?: string }) {
  const { isRotate180, setRotate180 } = useGlobalRotate180()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setRotate180(!isRotate180)}
    >
      <RotateCwSquare className={className} />
    </Button>
  )
}

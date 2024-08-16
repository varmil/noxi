import { PropsWithoutRef } from 'react'
import { List } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CardFooter } from '@/components/ui/card'

export default function StreamListFooter({}: PropsWithoutRef<{}>) {
  return (
    <CardFooter className="p-4 sm:p-6 pt-0">
      <Button variant="outline" className="w-full">
        <List className="mr-2 h-4 w-4" /> Go to full list
      </Button>
    </CardFooter>
  )
}

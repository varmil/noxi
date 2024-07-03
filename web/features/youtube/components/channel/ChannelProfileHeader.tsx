import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { PropsWithoutRef } from 'react'

type Props = {
  name: string
  src: string
}

export function ChannelProfileHeader({ name, src }: PropsWithoutRef<Props>) {
  return (
    <div className="py-6 px-0">
      <div className="flex items-center max-w-5xl">
        <div className="flex items-center gap-4">
          <Avatar className="w-24 h-24 sm:w-32 sm:h-32">
            <AvatarImage src={src} />
            <AvatarFallback>{name}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-2">
            <h1 className="text-xl font-bold">{name}</h1>
            <div className="max-w-lg">
              おっとりしているが、なんでも筋力でどうにかする物騒な面を持つ
              ゆるふわ脳筋女騎士。 是非！白銀聖騎士団の団員さんになってね✨
            </div>
            <div className="text-sm text-secondary-foreground">
              70.5K Subscribers
            </div>
          </div>
        </div>
        {/* <Button variant="outline" className="ml-auto">
          Subscribe
        </Button> */}
      </div>
    </div>
  )
}

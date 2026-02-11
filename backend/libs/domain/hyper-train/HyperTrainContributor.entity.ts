import { Transform } from 'class-transformer'
import { Point } from '@domain/hyper-train/Point.vo'
import { UserId } from '@domain/user'

export class HyperTrainContributor {
  @Transform(({ value }: { value: UserId }) => value.get())
  public readonly userId: UserId

  @Transform(({ value }: { value: Point }) => value.get())
  public readonly point: Point

  public readonly name: string | null

  public readonly image: string | null

  constructor(args: {
    userId: UserId
    point: Point
    name: string | null
    image: string | null
  }) {
    this.userId = args.userId
    this.point = args.point
    this.name = args.name
    this.image = args.image
  }
}

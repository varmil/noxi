import { Transform } from 'class-transformer'
import { IsArray, IsString } from 'class-validator'
import { VideoId, VideoIds } from '@domain/youtube'

export class GetSupersBundleRanks {
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }: { value: string }) =>
    value ? value.split(',') : undefined
  )
  videoIds: string[]

  toVideoIds = () => new VideoIds(this.videoIds.map(id => new VideoId(id)))
}

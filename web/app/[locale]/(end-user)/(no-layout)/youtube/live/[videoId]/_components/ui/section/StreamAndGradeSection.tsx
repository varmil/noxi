import GradeDisplay from '../grade/GradeDisplay'
import EmbedStream from '../stream/EmbedStream'

/**
 * Grade は LG 以上で表示
 */
export default function StreamAndGradeSection({
  videoId,
  url
}: {
  videoId: string
  url: string
}) {
  return (
    <section className="flex flex-col gap-4 lg:flex-row lg:items-stretch">
      <div className="flex-1 w-full flex items-center bg-black rounded-xl">
        <EmbedStream videoId={videoId} img={url} />
      </div>

      <div className="hidden lg:flex lg:basis-[350px] xl:basis-[400px]">
        <GradeDisplay className="w-full" />
      </div>
    </section>
  )
}

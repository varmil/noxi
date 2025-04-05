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
    <section className="flex lg:flex-row lg:items-stretch">
      <div className="flex-1 w-full flex items-center bg-black rounded-xl">
        <EmbedStream videoId={videoId} img={url} />
      </div>

      <div className="hidden lg:flex">
        {/* 親にgap-4をつけると非表示の場合に無駄なgapが残ってしまうので子ども側でmarginをつける */}
        <GradeDisplay videoId={videoId} className="w-full lg:ml-4" />
      </div>
    </section>
  )
}

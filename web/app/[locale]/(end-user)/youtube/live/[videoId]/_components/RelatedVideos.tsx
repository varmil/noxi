import { ScrollArea } from '@/components/ui/scroll-area'

export default function RelatedVideos() {
  const relatedVideos = [
    {
      id: 1,
      title: 'Related Video 1',
      channel: 'Channel A',
      views: '1M views',
      thumbnail: '/placeholder.svg?height=94&width=168'
    },
    {
      id: 2,
      title: 'Related Video 2',
      channel: 'Channel B',
      views: '500K views',
      thumbnail: '/placeholder.svg?height=94&width=168'
    },
    {
      id: 3,
      title: 'Related Video 3',
      channel: 'Channel C',
      views: '750K views',
      thumbnail: '/placeholder.svg?height=94&width=168'
    },
    {
      id: 4,
      title: 'Related Video 4',
      channel: 'Channel D',
      views: '2M views',
      thumbnail: '/placeholder.svg?height=94&width=168'
    },
    {
      id: 5,
      title: 'Related Video 5',
      channel: 'Channel E',
      views: '1.5M views',
      thumbnail: '/placeholder.svg?height=94&width=168'
    }
  ]

  return (
    <div className="bg-secondary rounded-lg p-4 space-y-4">
      <h2 className="text-xl font-semibold">Related Videos</h2>
      <ScrollArea className="h-[400px]">
        {relatedVideos.map(video => (
          <div key={video.id} className="flex space-x-2 mb-4">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-40 h-24 object-cover rounded"
            />
            <div>
              <h3 className="font-semibold">{video.title}</h3>
              <p className="text-sm text-gray-500">{video.channel}</p>
              <p className="text-sm text-gray-500">{video.views}</p>
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  )
}

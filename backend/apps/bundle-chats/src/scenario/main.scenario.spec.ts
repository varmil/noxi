import { Test, TestingModule } from '@nestjs/testing'
import { MainModule } from 'apps/bundle-chats/src/main.module'
import { MainScenario } from 'apps/bundle-chats/src/scenario/main.scenario'
import { ChatBundleQueuesService } from '@app/chat-bundle-queues/chat-bundle-queues.service'
import { ChatCountsService } from '@app/stream-stats/chat-counts.service'
import { ChatBundleQueue } from '@domain/chat-bundle-queue/ChatBundleQueue.entity'
import { ChatBundleQueues } from '@domain/chat-bundle-queue/ChatBundleQueues.collection'
import { QueueStatus } from '@domain/queue'
import { ChatCountsFixture } from '@domain/stream-stats'
import { VideoId } from '@domain/youtube'

describe('Bundle Chats > MainScenario', () => {
  let scenario: MainScenario

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MainModule]
    }).compile()
    module.useLogger(false)
    scenario = module.get<MainScenario>(MainScenario)
  })

  it('should be defined', () => {
    expect(scenario).toBeDefined()
  })

  describe('execute()', () => {
    it('should return void 0', async () => {
      jest
        .spyOn(ChatBundleQueuesService.prototype, 'findAll')
        .mockResolvedValueOnce(new ChatBundleQueues([queue]))

      jest
        .spyOn(ChatCountsService.prototype, 'findAllChatCounts')
        .mockResolvedValueOnce(ChatCountsFixture)

      const result = await scenario.execute()
      expect(result).toEqual(void 0)
    })
  })
})

const queue = new ChatBundleQueue({
  status: new QueueStatus('unprocessed'),
  videoId: new VideoId('ky_EP0NHH0A'),
  createdAt: new Date()
})

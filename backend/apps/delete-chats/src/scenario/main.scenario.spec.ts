import { Test, TestingModule } from '@nestjs/testing'
import { MainModule } from 'apps/delete-chats/src/main.module'
import { MainScenario } from 'apps/delete-chats/src/scenario/main.scenario'
import { ChatDeletingQueuesService } from '@app/chat-deleting-queues/chat-deleting-queues.service'
import { ChatCountsService } from '@app/stream-stats/chat-counts.service'
import { ChatDeletingQueue } from '@domain/chat-deleting-queue/ChatDeletingQueue.entity'
import { ChatDeletingQueues } from '@domain/chat-deleting-queue/ChatDeletingQueues.collection'
import { QueueStatus } from '@domain/queue'
import { VideoId } from '@domain/youtube'

describe('Delete Chats > MainScenario', () => {
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
        .spyOn(ChatDeletingQueuesService.prototype, 'findAll')
        .mockResolvedValueOnce(new ChatDeletingQueues([queue]))

      jest
        .spyOn(ChatCountsService.prototype, 'delete')
        .mockResolvedValueOnce(void 0)

      const result = await scenario.execute()
      expect(result).toEqual(void 0)
    })
  })
})

const queue = new ChatDeletingQueue({
  status: new QueueStatus('unprocessed'),
  videoId: new VideoId('ky_EP0NHH0A'),
  createdAt: new Date()
})

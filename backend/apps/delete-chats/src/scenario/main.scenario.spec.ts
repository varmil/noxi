import { Test, TestingModule } from '@nestjs/testing'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ChatDeletingQueuesService } from '@app/chat-deleting-queues/chat-deleting-queues.service'
import { PromiseService } from '@app/lib/promise-service'
import { NextContinuationsService } from '@app/next-continuation/next-continuations.service'
import { ChatDeletingQueue } from '@domain/chat-deleting-queue/ChatDeletingQueue.entity'
import { ChatDeletingQueues } from '@domain/chat-deleting-queue/ChatDeletingQueues.collection'
import { QueueStatus } from '@domain/queue'
import { VideoId } from '@domain/youtube'
import { MainScenario } from './main.scenario'

describe('Delete Chats > MainScenario', () => {
  let scenario: MainScenario
  let mockChatDeletingQueuesService: {
    findAll: ReturnType<typeof vi.fn>
    save: ReturnType<typeof vi.fn>
    delete: ReturnType<typeof vi.fn>
  }
  let mockNextContinuationsService: {
    delete: ReturnType<typeof vi.fn>
  }

  beforeEach(async () => {
    vi.clearAllMocks()

    mockChatDeletingQueuesService = {
      findAll: vi.fn(),
      save: vi.fn(),
      delete: vi.fn()
    }
    mockNextContinuationsService = {
      delete: vi.fn()
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MainScenario,
        {
          provide: PromiseService,
          useValue: {
            allSettled: vi.fn().mockImplementation((promises: Promise<void>[]) =>
              Promise.allSettled(promises)
            )
          }
        },
        {
          provide: ChatDeletingQueuesService,
          useValue: mockChatDeletingQueuesService
        },
        {
          provide: NextContinuationsService,
          useValue: mockNextContinuationsService
        }
      ]
    }).compile()
    module.useLogger(false)
    scenario = module.get<MainScenario>(MainScenario)
  })

  it('should be defined', () => {
    expect(scenario).toBeDefined()
  })

  describe('execute()', () => {
    it('should return void 0', async () => {
      mockChatDeletingQueuesService.findAll.mockResolvedValue(
        new ChatDeletingQueues([queue])
      )
      mockChatDeletingQueuesService.save.mockResolvedValue(void 0)
      mockChatDeletingQueuesService.delete.mockResolvedValue(void 0)
      mockNextContinuationsService.delete.mockResolvedValue(void 0)

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

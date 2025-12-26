/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Test, TestingModule } from '@nestjs/testing'
import { Gender } from '@domain/lib'
import { ChannelId } from '@domain/youtube'
import { ChannelRegistrationsService } from './channel-registrations.service'

describe('ChannelRegistrationsService', () => {
  let service: ChannelRegistrationsService

  const mockRepository = {
    findAll: jest.fn(),
    findById: jest.fn(),
    save: jest.fn(),
    updateMany: jest.fn()
  }

  beforeEach(async () => {
    jest.clearAllMocks()

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChannelRegistrationsService,
        {
          provide: 'ChannelRegistrationRepository',
          useValue: mockRepository
        }
      ]
    }).compile()

    service = module.get<ChannelRegistrationsService>(
      ChannelRegistrationsService
    )
  })

  describe('updateGender', () => {
    it('should call repository.updateMany with correct parameters for male', async () => {
      const channelId = new ChannelId('UC1234567890')
      const gender = Gender.Male

      await service.updateGender({ channelId, gender })

      expect(mockRepository.updateMany).toHaveBeenCalledTimes(1)
      expect(mockRepository.updateMany).toHaveBeenCalledWith({
        where: {
          channelIds: expect.objectContaining({
            map: expect.any(Function)
          })
        },
        data: { gender }
      })
    })

    it('should call repository.updateMany with correct parameters for female', async () => {
      const channelId = new ChannelId('UC0987654321')
      const gender = Gender.Female

      await service.updateGender({ channelId, gender })

      expect(mockRepository.updateMany).toHaveBeenCalledTimes(1)
      expect(mockRepository.updateMany).toHaveBeenCalledWith({
        where: {
          channelIds: expect.objectContaining({
            map: expect.any(Function)
          })
        },
        data: { gender }
      })
    })
  })
})

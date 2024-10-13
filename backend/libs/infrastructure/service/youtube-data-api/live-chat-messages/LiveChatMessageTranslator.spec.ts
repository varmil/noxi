import { type youtube_v3 } from '@googleapis/youtube'
import { LiveChatMessageTranslator } from './LiveChatMessageTranslator'

const ValidSuperChat: youtube_v3.Schema$LiveChatMessage = {
  id: '123',
  snippet: {
    type: 'superChatEvent',
    publishedAt: new Date().toISOString(),
    superChatDetails: {
      amountMicros: '10000000',
      currency: 'USD',
      amountDisplayString: '$10.00',
      tier: 1,
      userComment: 'Hello, world!'
    }
  },
  authorDetails: {
    channelId: 'UC123',
    channelUrl: 'https://www.youtube.com/c/JohnDoe',
    isVerified: true,
    isChatOwner: true,
    isChatSponsor: true,
    isChatModerator: false,
    displayName: 'John Doe',
    profileImageUrl: 'https://example.com/profile-picture.jpg'
  }
}

describe('LiveChatMessageTranslator', () => {
  it('should translate a live chat message', () => {
    const result = new LiveChatMessageTranslator(ValidSuperChat).translate()
    expect(result?.snippet.type.get()).toBe('superChatEvent')
    expect(result?.snippet.superChatDetails).toBeDefined()
    expect(result?.authorDetails.displayName.get()).toBe('John Doe')
  })

  it('should return undefined if parse fails', () => {
    const item: youtube_v3.Schema$LiveChatMessage = {
      id: '123',
      snippet: {
        type: ' invalidType'
      },
      authorDetails: {
        displayName: 'John Doe',
        profileImageUrl: 'https://example.com/profile-picture.jpg'
      }
    }

    const result = new LiveChatMessageTranslator(item).translate()
    expect(result).toBeUndefined()
  })
})

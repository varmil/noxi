import { CountryCode, LanguageTag } from '@domain/country'
import { GroupChannel } from '@domain/group/channel/group-channel'
import { Gender } from '@domain/lib'
import { ChannelId } from '@domain/youtube'

const DefaultProps = {
  country: new CountryCode('US'),
  defaultLangage: new LanguageTag('en'),
  gender: Gender.Female
}

export const USList: GroupChannel[] = [
  {
    id: new ChannelId('UCcHHkJ98eSfa5aj0mdTwwLQ'),
    title: 'Maid Mint Ch. ミント・ファントーム',
    ...DefaultProps
  },
  {
    id: new ChannelId('UC3N8ceQAY0F_kJG0aJNttLg'),
    title: 'Kirsche',
    ...DefaultProps
  },
  {
    id: new ChannelId('UC6T7TJZbW6nO-qsc5coo8Pg'),
    title: 'dooby3D',
    ...DefaultProps
  }
]

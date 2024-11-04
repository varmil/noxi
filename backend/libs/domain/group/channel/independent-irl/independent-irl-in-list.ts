import { CountryCode, LanguageTag } from '@domain/country'
import { GroupChannel } from '@domain/group/channel/group-channel'
import { ChannelId } from '@domain/youtube'

const DefaultProps = {
  group: 'independent-irl',
  country: new CountryCode('IN'),
  defaultLangage: new LanguageTag('hi')
}

export const INList: GroupChannel[] = [
  {
    id: new ChannelId('UCqQfK7YxUCmIWu4hl_Qv74g'),
    title: 'Xyaa',
    ...DefaultProps,
    defaultLangage: new LanguageTag('en')
  },
  {
    id: new ChannelId('UCySJrnD7XS16fF4qLFSaNuw'),
    title: 'HydraFlick',
    ...DefaultProps,
    defaultLangage: new LanguageTag('en')
  },
  {
    id: new ChannelId('UCwM-qR8sRwuHAoIwlPtpb5w'),
    title: 'VivOne',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCqNH56x9g4QYVpzmWTzqVYg'),
    title: 'Dynamo Gaming',
    ...DefaultProps
  },
  {
    id: new ChannelId('UC0IWRLai-BAwci_e9MylNGw'),
    title: 'CarryisLive',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCFwKgzKe-EdTz83r6wzhmOw'),
    title: 'Live Insaan',
    ...DefaultProps
  },
  {
    id: new ChannelId('UC7Q7pl0z0MrdayvmAnchlJQ'),
    title: 'MortaL',
    ...DefaultProps
  },
  {
    id: new ChannelId('UChXi_PlJkRMPYFQBOJ3MpxA'),
    title: 'Gyan Gaming',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCppHT7SZKKvar4Oc9J4oljQ'),
    title: 'Zee Tv',
    ...DefaultProps
  },
  {
    id: new ChannelId('UCwA3yPBSbZpwse6Q0aA2LPg'),
    title: 'PAYAL GAMING',
    ...DefaultProps
  }
]

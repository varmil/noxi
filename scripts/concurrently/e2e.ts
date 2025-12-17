import path from 'path'

const rootDir = process.cwd()

const AppNames = [
  'closed-api-server',
  'delete-chats',
  'bundle-chat-events',
  'groups/update-channels',
  'pubsubhubbub',
  'summarize-channels',
  'update-chats',
  'update-exchange-rates',
  'update-streams'
]

export const e2e = AppNames.map(name => {
  return {
    command: `npm run test:e2e -- --watch`,
    name: `${name}`,
    cwd: path.resolve(rootDir, 'backend')
  }
})

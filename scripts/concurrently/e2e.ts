import path from 'path'

const rootDir = process.cwd()

const AppNames = [
  'closed-api-server',
  'bundle-chats',
  'groups/update-channels',
  'pubsubhubbub',
  'update-chats',
  'update-streams'
]

export const e2e = AppNames.map(name => {
  return {
    command: `npm run test:e2e -- --watchAll --config ./apps/${name}/test/jest-e2e.json`,
    name: `${name}`,
    cwd: path.resolve(rootDir, 'backend')
  }
})

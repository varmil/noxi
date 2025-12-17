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
    command: `npx vitest --config vitest.e2e.config.ts --watch apps/${name}/test/app.e2e-spec.ts`,
    name: `${name}`,
    cwd: path.resolve(rootDir, 'backend')
  }
})

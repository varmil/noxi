import path from 'path'
import concurrently from 'concurrently'
import { e2e } from './e2e'

const rootDir = process.cwd()

concurrently(
  [
    {
      command: `npm run dev`,
      name: 'be  ',
      cwd: path.resolve(rootDir, 'backend')
    },

    {
      command: `npm run test:watch`,
      name: 'be:u',
      cwd: path.resolve(rootDir, 'backend')
    },

    ...e2e,

    {
      command: `npm run dev`,
      name: 'we  ',
      cwd: path.resolve(rootDir, 'web')
    },
    {
      command: 'npm run type-check -- --watch',
      name: 'we:t',
      cwd: path.resolve(rootDir, 'web')
    }
  ],
  {
    prefix: '{name}',
    killOthers: ['failure'],
    prefixColors: [
      'bold.bgMagenta',
      'bold.bgCyan',
      'bold.bgGreenBright',
      'bold.bgBlueBright',
      'bold.bgWhite'
    ]
  }
)

#!/usr/bin/env zx
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-undef */
import 'zx/globals'
import { z } from 'zod'
import { $, argv } from 'zx'
import list from './list.mjs'

// $.verbose = true

const schema0 = z.union([
  z.literal('groups/update-channels'),
  z.literal('pubsubhubbub'),
  z.literal('update-chats'),
  z.literal('update-streams')
])

const schema1 = z.union([
  z.literal('dev'),
  z.literal('build'),
  z.literal('prod')
])

const appName = schema0.parse(argv._[0])
const cmd = schema1.parse(argv._[1])

// workaround:eval回避
// 本来listコマンド内に全部記載したいが、zxの制約上
// エスケープされてしまうので、ここでコマンドを記載する
// switch (cmd) {
//   case 'dev':
//     await $`nest start --watch ${appName}`
//     break
//   case 'build':
//     await $`nest build --webpack ${appName}`
//     break
//   case 'prod':
//     await $`node dist/apps/${appName}/main`
//     break
//   default:
//     throw new Error(`Invalid command: ${cmd} ${appName}`)
// }

{
  const exec = list[`${appName}:${cmd}`]
  console.log('exec:', exec)
  const p = $`eval ${exec}`
  p.stdout.pipe(process.stdout)
  await p
}

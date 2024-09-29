#!/usr/bin/env zx

/* eslint-disable no-undef */

import 'zx/globals'
import { z } from 'zod'
import { $, argv } from 'zx'

// $.verbose = true

const schema0 = z.union([
  z.literal('bundle-chats'),
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
{
  let command
  switch (cmd) {
    case 'dev':
      command = $`nest start --watch ${appName}`
      break
    case 'build':
      command = $`nest build --webpack ${appName}`
      break
    case 'prod':
      command = $`node dist/apps/${appName}/main`
      break
  }
  console.log('$ ', command)
  command.stdout.pipe(process.stdout)
  await command
}

// {
//   const exec = list[`${appName}:${cmd}`]
//   console.log('$ ', exec)
//   const p = $`eval ${exec}`
//   p.stdout.pipe(process.stdout)
//   await p
// }

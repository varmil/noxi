#!/usr/bin/env zx

/* eslint-disable no-undef */

import 'zx/globals'
import { z } from 'zod'
import { $, argv } from 'zx'

// $.verbose = true

const schema0 = z.union([
  z.literal('bundle-chats'),
  z.literal('bundle-chat-events'),
  z.literal('groups/update-channels'),
  z.literal('pubsubhubbub'),
  z.literal('summarize-channels'),
  z.literal('update-chats'),
  z.literal('update-exchange-rates'),
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
  command.stdout.pipe(process.stdout)
  await command
}

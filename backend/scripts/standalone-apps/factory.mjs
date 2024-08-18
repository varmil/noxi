#!/usr/bin/env zx
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable no-undef */
import 'zx/globals'
import { z } from 'zod'
import { $, argv } from 'zx'
import x from './list.mjs'

$.verbose = true

console.log(x)

const schema0 = z.union([
  z.literal('pubsubhubbub'),
  z.literal('update-streams'),
  z.literal('hololive/update-channels')
])

const schema1 = z.union([
  z.literal('dev'),
  z.literal('build'),
  z.literal('prod')
])

const appName = schema0.parse(argv._[0])
const cmd = schema1.parse(argv._[1])

console.log('argv:', appName, cmd)

console.log('exec:', x[`${appName}:${cmd}`])

// await $`npm run ${appName}:${cmd}`

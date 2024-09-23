#!/usr/bin/env zx
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable no-undef */
import 'zx/globals'
import { z } from 'zod'
import { $, argv } from 'zx'
import list from './list.mjs'

$.verbose = true

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

const exec = list[`${appName}:${cmd}`]
console.log('exec:', exec)
await $`eval ${exec}`

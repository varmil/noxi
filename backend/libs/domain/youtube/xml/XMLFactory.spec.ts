import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { XMLFactory } from '@domain/youtube/xml/XMLFactory'

describe('XMLFactory', () => {
  let deleted0XML: string
  let deleted1XML: string
  let haachama0XML: string
  let marine0XML: string
  let updated0XML: string
  let updated1XML: string

  beforeAll(async () => {
    deleted0XML = await readFile(
      path.resolve(__dirname, './test-data/deleted.0.xml'),
      'utf-8'
    )
    deleted1XML = await readFile(
      path.resolve(__dirname, './test-data/deleted.1.xml'),
      'utf-8'
    )
    haachama0XML = await readFile(
      path.resolve(__dirname, './test-data/haachama.0.xml'),
      'utf-8'
    )
    marine0XML = await readFile(
      path.resolve(__dirname, './test-data/marine.0.xml'),
      'utf-8'
    )
    updated0XML = await readFile(
      path.resolve(__dirname, './test-data/updated.0.xml'),
      'utf-8'
    )
    updated1XML = await readFile(
      path.resolve(__dirname, './test-data/updated.1.xml'),
      'utf-8'
    )
  })

  describe('convertToUpdatedEntry()', () => {
    describe('return entry when', () => {
      it('is valid updated', () => {
        expect(XMLFactory.convertToUpdatedEntry(marine0XML)).not.toEqual(
          undefined
        )
      })
      it('is valid updated', () => {
        expect(XMLFactory.convertToUpdatedEntry(updated0XML)).not.toEqual(
          undefined
        )
      })
    })

    describe('return undefined when', () => {
      it('is empty', () => {
        expect(XMLFactory.convertToUpdatedEntry('')).toEqual(undefined)
      })
      it('is deleted', () => {
        expect(XMLFactory.convertToUpdatedEntry(deleted0XML)).toEqual(undefined)
      })
      it('is invalid updated', () => {
        expect(XMLFactory.convertToUpdatedEntry(updated1XML)).toEqual(undefined)
      })
    })
  })

  describe('convertToDeletedEntry()', () => {
    describe('return entry when', () => {
      it('is valid deleted', () => {
        expect(XMLFactory.convertToDeletedEntry(haachama0XML)).not.toEqual(
          undefined
        )
      })
      it('is valid deleted', () => {
        expect(XMLFactory.convertToDeletedEntry(deleted0XML)).not.toEqual(
          undefined
        )
      })
    })

    describe('return undefined when', () => {
      it('is empty', () => {
        expect(XMLFactory.convertToDeletedEntry('')).toEqual(undefined)
      })
      it('is updated', () => {
        expect(XMLFactory.convertToDeletedEntry(updated0XML)).toEqual(undefined)
      })
      it('is invalid deleted', () => {
        expect(XMLFactory.convertToDeletedEntry(deleted1XML)).toEqual(undefined)
      })
    })
  })
})

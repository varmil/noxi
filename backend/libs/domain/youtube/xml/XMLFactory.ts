import { XMLParser } from 'fast-xml-parser'
import { z } from 'zod'
import {
  deletedEntryXMLSchema,
  DeletedEntryXMLSchema
} from '@domain/youtube/xml/schema/DeletedEntryXMLSchema'
import {
  UpdatedEntryXMLSchema,
  updatedEntryXMLSchema
} from '@domain/youtube/xml/schema/UpdatedEntryXMLSchema'

export class XMLFactory {
  private constructor() {
    throw new TypeError('use factory() method')
  }

  /**
   * @return UpdatedEntryXMLSchema If parsing is successful
   * @return undefined If parsing is failed
   */
  static convertToUpdatedEntry = (
    xml: Parameters<XMLParser['parse']>[0]
  ): UpdatedEntryXMLSchema | undefined => {
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: ''
    })

    try {
      return updatedEntryXMLSchema.parse(parser.parse(xml))
    } catch (err) {
      if (err instanceof z.ZodError) {
        console.log(
          'convertToUpdatedEntry parse-error:input',
          xml,
          'issues',
          err.issues
        )
        return undefined
      } else {
        throw err
      }
    }
  }

  /**
   * @return DeletedEntryXMLSchema If parsing is successful
   * @return undefined If parsing is failed
   */
  static convertToDeletedEntry = (
    xml: Parameters<XMLParser['parse']>[0]
  ): DeletedEntryXMLSchema | undefined => {
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: ''
    })

    try {
      return deletedEntryXMLSchema.parse(parser.parse(xml))
    } catch (err) {
      if (err instanceof z.ZodError) {
        console.log(
          'convertToDeletedEntry parse-error:input',
          xml,
          'issues',
          err.issues
        )
        return undefined
      } else {
        throw err
      }
    }
  }
}

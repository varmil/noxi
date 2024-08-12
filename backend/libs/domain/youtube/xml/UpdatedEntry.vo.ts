import { UpdatedEntryXMLSchema } from '@domain/youtube/xml/schema/UpdatedEntryXMLSchema'

export class UpdatedEntry {
  constructor(private readonly data: UpdatedEntryXMLSchema) {
    this.data = data
  }
}

import { XMLParser } from 'fast-xml-parser'

export class XML {
  private readonly object: unknown

  constructor(data: Parameters<XMLParser['parse']>[0]) {
    const parser = new XMLParser()
    this.object = parser.parse(data)

    // use zod for type validation

    console.log(this.object)
  }
}

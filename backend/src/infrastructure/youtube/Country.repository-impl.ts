import { Injectable } from '@nestjs/common'
import admin from 'firebase-admin'
import { CountryCode } from '@domain/country'
import { Countries, CountryRepository } from '@domain/youtube'

@Injectable()
export class CountryRepositoryImpl implements CountryRepository {
  private readonly ROOT_COLLECTION_NAME = 'youtube'

  async findAll() {
    const snapshot = await admin
      .firestore()
      .collection(this.ROOT_COLLECTION_NAME)
      .listDocuments()

    return new Countries(snapshot.map(e => new CountryCode(e.id)))
  }
}

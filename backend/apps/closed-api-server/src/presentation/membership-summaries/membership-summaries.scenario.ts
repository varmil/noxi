import { Injectable } from '@nestjs/common'
import { MembershipSummariesService } from '@app/membership-summaries/membership-summaries.service'

@Injectable()
export class MembershipSummariesScenario {
  constructor(
    private readonly membershipSummariesService: MembershipSummariesService
  ) {}

  /**
   * Retuen latest summaries
   * １円以上のみSELECTするので /channels/ranking ページ専用
   **/
  getMembershipSummaries: MembershipSummariesService['findAll'] = args => {
    return this.membershipSummariesService.findAll(args)
  }

  /**
   * Retuen latest summaries "COUNT"
   * １円以上のみCOUNTするので /channels/ranking ページ専用
   **/
  countMembershipSummaries: MembershipSummariesService['count'] = args => {
    return this.membershipSummariesService.count(args)
  }
}

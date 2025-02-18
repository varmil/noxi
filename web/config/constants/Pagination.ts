export class ChannelsRankingPagination {
  /** 1ページあたりの件数 */
  static readonly PAGE_SIZE = 20
  /** COMPACT: 1ページあたりの件数 */
  static readonly COMPACT_PAGE_SIZE = 7
  /** itemCountから合計ページ数を取得する */
  static getTotalPages = (itemCount: number) =>
    Math.ceil(itemCount / this.PAGE_SIZE)
  /** 順位から掲載ページ番号を取得する */
  static getPageFromRank = (rank?: number) => {
    if (!rank) return undefined
    return Math.ceil(rank / this.PAGE_SIZE)
  }
}

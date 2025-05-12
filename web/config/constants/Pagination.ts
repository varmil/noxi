abstract class PaginationBase {
  abstract readonly PAGE_SIZE: number
  abstract readonly COMPACT_PAGE_SIZE: number

  getTotalPages = (itemCount: number): number =>
    Math.ceil(itemCount / this.PAGE_SIZE)

  getRankFromPage = (page: number, index: number): number =>
    index + 1 + (page - 1) * this.PAGE_SIZE

  getPageFromRank = (rank?: number): number | undefined =>
    rank ? Math.ceil(rank / this.PAGE_SIZE) : undefined

  getLimit = (compact?: boolean): number =>
    compact ? this.COMPACT_PAGE_SIZE : this.PAGE_SIZE

  getOffset = (page?: string): number =>
    Math.max((Number(page) || 1) - 1, 0) * this.PAGE_SIZE
}

class MostCheeredSingleton extends PaginationBase {
  readonly PAGE_SIZE = 20
  readonly COMPACT_PAGE_SIZE = 7
}

class TopFansSingleton extends PaginationBase {
  readonly PAGE_SIZE = 20
  readonly COMPACT_PAGE_SIZE = 7
}

class ChannelsRankingSingleton extends PaginationBase {
  readonly PAGE_SIZE = 20
  readonly COMPACT_PAGE_SIZE = 7
}

class StreamRankingSingleton extends PaginationBase {
  readonly PAGE_SIZE = 20
  readonly COMPACT_PAGE_SIZE = 5
}

class ChannelGallerySingleton extends PaginationBase {
  readonly PAGE_SIZE = 24
  readonly COMPACT_PAGE_SIZE = 6
}

class StreamGallerySingleton extends PaginationBase {
  readonly PAGE_SIZE = 12
  readonly COMPACT_PAGE_SIZE = 4
}

export const MostCheeredPagination = new MostCheeredSingleton()
export const TopFansPagination = new TopFansSingleton()
export const ChannelsRankingPagination = new ChannelsRankingSingleton()
export const StreamRankingPagination = new StreamRankingSingleton()
export const ChannelGalleryPagination = new ChannelGallerySingleton()
export const StreamGalleryPagination = new StreamGallerySingleton()

class MostCheeredSingleton {
  readonly PAGE_SIZE = 20
  readonly COMPACT_PAGE_SIZE = 7

  getTotalPages = (itemCount: number) => Math.ceil(itemCount / this.PAGE_SIZE)

  /** ページ番号+ページ内インデックス番号から順位を取得する */
  getRankFromPage = (page: number, index: number) => {
    return index + 1 + (page - 1) * this.PAGE_SIZE
  }

  /** 順位からページ番号を取得する */
  getPageFromRank = (rank?: number) => {
    if (!rank) return undefined
    return Math.ceil(rank / this.PAGE_SIZE)
  }

  getLimit = (compact?: boolean) =>
    compact ? this.COMPACT_PAGE_SIZE : this.PAGE_SIZE

  getOffset = (page?: string) =>
    Math.max((Number(page) || 1) - 1, 0) * this.PAGE_SIZE
}

class ChannelsRankingSingleton {
  readonly PAGE_SIZE = 20
  readonly COMPACT_PAGE_SIZE = 7

  getTotalPages = (itemCount: number) => Math.ceil(itemCount / this.PAGE_SIZE)

  /** ページ番号+ページ内インデックス番号から順位を取得する */
  getRankFromPage = (page: number, index: number) => {
    return index + 1 + (page - 1) * this.PAGE_SIZE
  }

  /** 順位からページ番号を取得する */
  getPageFromRank = (rank?: number) => {
    if (!rank) return undefined
    return Math.ceil(rank / this.PAGE_SIZE)
  }

  getLimit = (compact?: boolean) =>
    compact ? this.COMPACT_PAGE_SIZE : this.PAGE_SIZE

  getOffset = (page?: string) =>
    Math.max((Number(page) || 1) - 1, 0) * this.PAGE_SIZE
}

class StreamRankingSingleton {
  readonly PAGE_SIZE = 20
  readonly COMPACT_PAGE_SIZE = 5

  getTotalPages = (itemCount: number) => Math.ceil(itemCount / this.PAGE_SIZE)

  getRankFromPage = (page: number, index: number) => {
    return index + 1 + (page - 1) * this.PAGE_SIZE
  }

  /** 順位からページ番号を取得する */
  getPageFromRank = (rank?: number) => {
    if (!rank) return undefined
    return Math.ceil(rank / this.PAGE_SIZE)
  }

  getLimit = (compact?: boolean) =>
    compact ? this.COMPACT_PAGE_SIZE : this.PAGE_SIZE

  getOffset = (page?: string) =>
    Math.max((Number(page) || 1) - 1, 0) * this.PAGE_SIZE
}

class ChannelGallerySingleton {
  readonly PAGE_SIZE = 24 // 1,2,3の公倍数
  readonly COMPACT_PAGE_SIZE = 6

  getTotalPages = (itemCount: number) => Math.ceil(itemCount / this.PAGE_SIZE)

  getLimit = (compact?: boolean) =>
    compact ? this.COMPACT_PAGE_SIZE : this.PAGE_SIZE

  getOffset = (page?: string) =>
    Math.max((Number(page) || 1) - 1, 0) * this.PAGE_SIZE
}

class StreamGallerySingleton {
  readonly PAGE_SIZE = 12
  readonly COMPACT_PAGE_SIZE = 4

  getTotalPages = (itemCount: number) => Math.ceil(itemCount / this.PAGE_SIZE)

  getLimit = (compact?: boolean) =>
    compact ? this.COMPACT_PAGE_SIZE : this.PAGE_SIZE

  getOffset = (page?: string) =>
    Math.max((Number(page) || 1) - 1, 0) * this.PAGE_SIZE
}

export const MostCheeredPagination = new MostCheeredSingleton()
export const ChannelsRankingPagination = new ChannelsRankingSingleton()
export const StreamRankingPagination = new StreamRankingSingleton()
export const ChannelGalleryPagination = new ChannelGallerySingleton()
export const StreamGalleryPagination = new StreamGallerySingleton()

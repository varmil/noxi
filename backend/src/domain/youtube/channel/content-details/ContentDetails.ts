class RelatedPlaylists {
  public readonly uploads: string

  constructor(args: { uploads: string }) {
    this.uploads = args.uploads
  }
}

export class ContentDetails {
  private readonly relatedPlaylists: RelatedPlaylists

  constructor(args: { relatedPlaylists: RelatedPlaylists }) {
    this.relatedPlaylists = args.relatedPlaylists
  }

  /**
   * 自身がアップロードしたコンテンツを指す特殊なプレイリストID
   */
  get uploadsPlaylistId() {
    return this.relatedPlaylists.uploads
  }
}

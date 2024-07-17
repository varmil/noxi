export interface PaginationResponse<T> {
  items: T
  nextPageToken?: string
  prevPageToken?: string
}

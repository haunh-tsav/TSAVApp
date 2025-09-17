export type ItemStatusType = 'active' | 'archived' | 'closed' | 'deleted' | 'draft'
export type SortedDirection = 'asc' | 'desc'

// Filter type
export type FilterType = {
  field?: string // ex: 'id'
  items: number[] // ex: [111, 222, 333] or [-1] to get all items
  status?: ItemStatusType[] // status: ['active', 'archived', ...]
}

// Paginator type
export type PaginatorType = { page?: number; pageSize?: number }

// Search type
export type SearchType = {
  field?: string // ex: 'id'
  term?: string // ex: '123' or '' to get all items
}

// Sorting type
export type SortingType = {
  column?: string // ex: 'id'
  direction?: string // direction: asc|desc sắp xếp trước sau
}

// Base response data type
export type ResponseDataType<T> = {
  data?: T // Payload (dữ liệu trả về) of response (ex: array of items, object item, etc.)
  errorCode?: string // Error code if any (ex: "INVALID_TOKEN") ~ Mã nhận diện lỗi nếu có
  length?: number // Length of items/page (ex: 20 items)
  message: string // Message from server (ex: "Fetch data successfully")
  page?: number // Current page number (ex: 1 page)
  pageSize?: number // Items per page (ex: 5 pages)
  success: boolean // Status of response (ex: true | false)
  total?: number // Total items in all pages (ex: 100 items)
}

// Base request body data type
export type RequestDataType = {
  filter: FilterType
  paginator: PaginatorType
  search: SearchType
  sorting: SortingType
}

export type RequiredDataType = {
  id?: number
}

export type APIService<T extends RequiredDataType> = {
  createItem: (newItem: T, accessToken: string) => Promise<ResponseDataType<T>>
  getItemByPk: (id: number, accessToken: string) => Promise<ResponseDataType<T>>
  getItemBy?: (
    query: { field: string; id: number },
    accessToken: string,
  ) => Promise<ResponseDataType<T>>
  getItems: (parameters: RequestDataType, accessToken: string) => Promise<ResponseDataType<T>>
  updateItemByPk: (id: number, itemToUpdate: T, accessToken: string) => Promise<ResponseDataType<T>>
  updateItemBy?: (
    query: { field: string; id: number },
    itemToUpdate: T,
    accessToken: string,
  ) => Promise<ResponseDataType<T>>
  updateItemsBy?: (
    query: { field: string; id: number },
    itemsToUpdate: T[],
    accessToken: string,
  ) => Promise<ResponseDataType<T>>
  deleteItemByPk: (id: number, accessToken: string) => Promise<ResponseDataType<T>>
  deleteItemBy?: (
    query: { field: string; id: number },
    accessToken: string,
  ) => Promise<ResponseDataType<T>>
}

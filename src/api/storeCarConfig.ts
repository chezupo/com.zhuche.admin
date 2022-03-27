import {deleteRequest, get, patch, post} from "@/util/httpClient";

export type GetStoreCarConfigsQueryType = {
  page: number
  size: number
  name?: string
}
export type CreateStoreCarConfigQueryType = {
  name: string
}
export type UpdateStoreCarConfigQueryType = {
  name: string
}

const getStoreCarConfigs = async (data: GetStoreCarConfigsQueryType): Promise<PageType<StoreCarConfigItemType>> => {
  return await get<PageType<StoreCarConfigItemType>>(`/storeCarConfigs`, data)

}

const createStoreCarConfig = async (data: CreateStoreCarConfigQueryType): Promise<StoreCarConfigItemType> => {
  return await post<StoreCarConfigItemType>('/storeCarConfigs', data)
}

const updateStoreCarConfig = async (id: number, query: UpdateStoreCarConfigQueryType): Promise<StoreCarConfigItemType> => {
  return await patch<StoreCarConfigItemType>(`/storeCarConfigs/${id}`, query)

}

const destoryStoreCarConfig = async (id: number): Promise<void> => {
  return await deleteRequest<void>(`/storeCarConfigs/${id}`)

}


export {
  getStoreCarConfigs,
  createStoreCarConfig,
  updateStoreCarConfig,
  destoryStoreCarConfig
}

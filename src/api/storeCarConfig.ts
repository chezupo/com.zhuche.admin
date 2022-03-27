import {get, post} from "@/util/httpClient";

export type GetStoreCarConfigsQueryType = {
  page: number
  size: number
  name?: string
}
export type CreateStoreCarConfigQueryType = {
  name: string
}

const getStoreCarConfigs = async (data: GetStoreCarConfigsQueryType): Promise<PageType<StoreCarConfigItemType>> => {
  return await get<PageType<StoreCarConfigItemType>>(`/storeCarConfigs`, data)

}

const createStoreCarConfig = async (data: CreateStoreCarConfigQueryType): Promise<StoreCarConfigItemType> => {
  return await post<StoreCarConfigItemType>('/storeCarConfigs', data)
}

export {getStoreCarConfigs, createStoreCarConfig}

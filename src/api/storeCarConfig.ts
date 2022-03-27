import {get} from "@/util/httpClient";

export type GetStoreCarConfigsQueryType = {
  page: number
  size: number
  name?: string
}

const getStoreCarConfigs = async (data: GetStoreCarConfigsQueryType): Promise<PageType<StoreCarConfigItemType>> => {
  return await get<PageType<StoreCarConfigItemType>>(`/storeCarConfigs`, data)

}

export {getStoreCarConfigs}

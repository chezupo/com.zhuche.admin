import * as requestClient from '@/util/httpClient'
import { QueryValueType } from '@/util/helper'
import {get} from "@/util/httpClient";

type GuidType = {
  id: number
  title: string
  imgKey: string
}
export type CreateStoreType = {
  username: string
  password: string
  banners: string[]
  areaCode: string
  address: string
  lng: number
  lat: number
  starAt: string
  endAt: string
  name: string
  mark: string
  servicePhone: string
  isStation: boolean
  isAirport: boolean
  isSelfService: boolean
  pickupGuids: GuidType[]
  returnGuids: GuidType[]
}
export type UpdateItemGuidType = Omit<GuidType, 'id'> & {id: number | null}
export type UpdateStoreType = Omit<
  CreateStoreType,
  'username' | 'password' | 'id' | 'pickupGuids' | 'returnGuids'
  > & {
  pickupGuids: UpdateItemGuidType[]
  returnGuids: UpdateItemGuidType[]
}

const createStore = async (data: CreateStoreType) => await requestClient.post<StoreItemType>('/stores', data)

const getStores = async (query: Record<string, QueryValueType>) => {
  return await requestClient.get<PageType<StoreItemType>>("/stores", query)
}

const destroy = async (id: number) => await requestClient.deleteRequest(`/stores/${id}`)

const update = async (id: number, data:UpdateStoreType) => {
  return await requestClient.patch<StoreItemType>(`/stores/${id}`, data)
}

const getStoreBrandsByStoreId = async (storeId: number):Promise<BrandItemType[]>  => {
  return await requestClient.get<BrandItemType[]>(`/stores/${storeId}/brands`)
}
const getMyStore = async () => await get<StoreItemType>(`/stores/myStore`)

export {
  destroy,
  update,
  getStores,
  createStore,
  getStoreBrandsByStoreId,
  getMyStore
}

import { PageType, StoreItemType } from '@/typings'
import * as requestClient from '@/util/httpClient'
import { QueryValueType } from '@/util/helper'

type GuidType = {
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
export type UpdateStoreType = Omit<CreateStoreType, 'pickupGuids' | 'returnGuids' | 'username' | 'password'>

export const createStore = async (data: CreateStoreType) => await requestClient.post<StoreItemType>('/stores', data)

export const getStores = async (query: Record<string, QueryValueType>) => {
  return await requestClient.get<PageType<StoreItemType>>("/stores", query)
}

export const destroy = async (id: number) => await requestClient.deleteRequest(`/stores/${id}`)

export const update = async (id: number, data:UpdateStoreType) => {
  return await requestClient.patch<StoreItemType>(`/stores/${id}`, data)
}



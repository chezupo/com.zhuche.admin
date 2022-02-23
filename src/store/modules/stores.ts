export type StoreBannerType = {
  id: number
  imgKey: string
  imgPrefix: string
}
export type StoreItemType = {
  id:  number
  name: string
  mark: string
  starAt: string
  endAt: string
  address: string
  servicePhone: string
  tags: string
  lat: number
  lng: number
  isEnable: boolean
  isStation: boolean
  isAirport: boolean
  isSelfService: boolean
  banners: StoreBannerType[]
}

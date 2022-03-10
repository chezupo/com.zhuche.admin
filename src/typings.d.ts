declare type AddressType = {
  province: string
  name: string
  city: string
  area: string
  provinceCode: string
  cityCode: string
  areaCode: string
  address: string
  lng: number
  lat: number
}

declare type ProvinceType = {
  code: string
  name: string
}

declare type CityType = ProvinceType
declare type AreaType = CityType
declare type DivisionType = {
  province: ProvinceType[]
  cities: CityType[]
  areas: AreaType[]
}

declare enum RoleType {
  ROLE_ADMIN = 'ROLE_ADMIN',
}
declare type UserType = {
  id: number
  username: string
  roles: RoleType[]
}
declare type StoreBanner = {
  id: number
  imgKey: string
  prefixUrl: string
}
declare type StoreGuideType = {
  id: number
  prefixUrl: string
  title: string
  imgKey: string
  store: Pick<StoreItemType, 'id' | 'name'>
}
declare type StoreItemType = {
  createdAt: string;
  updatedAt: string;
    id: number;
    name: string;
    mark: string;
    starAt: string;
    endAt: string;
    address: string;
    area: {
      code: string;
      name: string
    }
    city: {
      code: string;
      name: string
    }
    province: {
      code: string;
      name: string
    }
    servicePhone: string;
    lat: number;
    lng: number;
    isEnable: boolean
    isStation: boolean
    isAirport: boolean
    isSelfService: boolean;
    admin: UserType
    banners: StoreBanner[],
    pickupGuides: StoreGuideType[]
    returnGuides: StoreGuideType[]
}

declare type PageType<T> = {
  list: T[]
  total: number
  currentPage: number
  size: number
}

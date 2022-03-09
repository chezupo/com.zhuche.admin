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
    banners: [
    {
      id: number
      imgKey: string
      prefixUrl: string
    }
  ],
    pickupGuides: [
    {
      id: number
      imgKey: string
      title: string
    }
  ],
    returnGuides: [
    {
      id: number
      imgKey: string
      title: string
    }
  ]
}

declare type PageType<T> = {
  list: T[]
  total: number
  currentPage: number
  size: number
}

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

declare type RoleType = 'ROLE_ADMIN' |
  'ROLE_USER' | // 用户
  'ROLE_BUSINESS' | // 门店
  'ROLE_CUSTOMER' | // 客户服
  'ROLE_AGENT' | // 推广员
  'ROLE_PROMOTER' // 业务员

declare type AlipayAccountType = {
  id: number
  createdAt: string
  avatar: string
  city: string
  nickName?: string
  phone?: string
  province: string
  gender?: 'f' | 'm'
  countryCode: string
}
declare type UserType = {
  id: number
  username: string
  roles: RoleType[]
  alipayAccount?: AlipayAccountType
  userCoupons: UserCouponItemType[]
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

declare type BrandSeriesItemType = {
  id: number
  name: string
}
declare type BrandItemType = {
  id: number
  name: string
  imgKey: string
  store: StoreItemType
  seriesList: BrandSeriesItemType[]
}

declare type StoreCarConfigItemType = {
  id: number
  name: string
  store: StoreItemType
}
declare type LogTypeType = 'CREATED' | 'UPDATED' | 'DELETED'

declare type LogItemType = {
  createdAt: string
  id: number
  title: string
  type: LogTypeType
  params: string
  description: string
  requestPath: string
  className: string
  user: UserType
}
declare type CarEngineType  = 'SUPERCHARGED' | 'NATURALLY_ASPIRATED' // 自然吸汽
declare type CarShiftType = 'AUTO' | 'MANUAL'

declare type CarPowerType =
  'GAS' // 汽油
  | 'ELECTRIC_GAS' // 油电
  | 'ELECTRIC'// 纯电


declare type CarItemType = {
  id: number
  powerType: CarPowerType // 动力类型
  isSelfHelp: boolean // 是否自助
  displacement: number // 排量
  shift:CarShiftType // 档类型
  gasVolume: number // 油量
  seats: number // 座位数
  engineType:CarEngineType // 发动机类型
  name: string
  cover: string // 封面
  type: string // 车型
  tags: string[] // 标签
  licenseType: string // 牌照
  brandSeries: BrandSeriesItemType
  rand: BrandItemType // 品牌
  number: string // 车牌号
  isOnline: boolean // 是否上架
  rent: number
  configs: StoreCarConfigItemType[]
  deposit: number
  createdAt: string
  updatedAt: string
  store: StoreItemType
  carCategory: CarCategoryItemType
  handlingFee: number
  insuranceFee: number
}

declare type CarCategoryItemType = {
  id: number
  name: string
  store: StoreItemType
}

declare interface AgreementItemType {
  id: number
  title: string
  content: string
}

declare type HolidayItemType = {
  id: number
  day: number
  mark: string
}

declare type CouponItemType = {
  id: number
  title: string
  content: string
  isAutoDispatchingToNewUser: boolean
  amount: number
  meetAmount: number
  expired: number
  isWithHoliday: boolean
  isWithRent: boolean
  isWithServiceAmount: boolean
}

declare type UserCouponItemType = {
  id: number
  user: UserType
  coupon: CouponItemType
  reason: string
  isValid: boolean
  expired: number
  createdAt: string
}

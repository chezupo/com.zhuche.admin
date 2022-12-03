declare module '@ckeditor/ckeditor5-react' {
  import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
  import Event from '@ckeditor/ckeditor5-utils/src/eventinfo'
  import { EditorConfig } from '@ckeditor/ckeditor5-core/src/editor/editorconfig'
  import * as React from 'react';
  const CKEditor: React.FunctionComponent<{
    disabled?: boolean;
    editor: typeof ClassicEditor;
    data?: string;
    id?: string;
    required?: boolean
    config?: EditorConfig;
    onReady?: (editor: ClassicEditor) => void;
    onChange?: (event: Event, editor: ClassicEditor) => void;
    onBlur?: (event: Event, editor: ClassicEditor) => void;
    onFocus?: (event: Event, editor: ClassicEditor) => void;
    onError?: (event: Event, editor: ClassicEditor) => void;
  }>
  export { CKEditor };
}

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

declare type RoleType =
  'ROLE_ADMIN' |
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
declare enum WechatGender {
  unknown = '0',
  male = '1',
  female = '2'
}
declare type WechatAccountType = {
  avatar: string
  nickName: string
  phone?: string
  gender?: string
}
declare type UserItemType = {
  id: number
  username: string
  roles: RoleType[]
  driverLicense?: string
  idCarBack?: string
  idCarFrontal?: string
  alipayAccount?: AlipayAccountType
  wechatAccount?: WechatAccountType
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
    admin: UserItemType
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
  user: UserItemType
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
  user: UserItemType
  coupon: CouponItemType
  reason: string
  isValid: boolean
  expired: number
  createdAt: string
}

/**
 * 订单状态
 */
declare type OrderStatusType =
'CREDITING' | // 信用授权中
  'PAYING' | // 支付中
  'CAR_PICKUP_IN_PROGRESS' | // 取车中
  'USING' | // 使用中
  'OVERTIME' | // 用车超时
  'RETURNING' | // 还车中
  'FINISHED' | // 已完成
  'RENEWED' | // 已续约
  'CANCELED'  // 已取消

/**
 * 支付类型
 */
declare type OrderPayType =
  'ALIPAY' | // 支付宝
  'WECHAT' // 微信

/**
 * 订单数据类型
 */
declare type OrderItemType = {
  createdAt: string
  updatedAt: string
  id: number
  startTimeStamp: number // 开始时间
  endTimeStamp: number// 还车时间
  isInsurance: boolean // 是否使用驾无忧
  cover: string // 图片
  insuranceFee: number //  驾无忧费用
  rent: number //费用
  deposit: number // 租金
  handlingFee: number // 手续费
  amount: number // 总费用
  waiverHandlingFee: number // 减免手续费
  waiverRent: number // 减免的租金
  alipayTradeNo: string // 支付宝订单号
  outTradeNo: string // 支付宝订单号
  unfreezeAmount: number
  status: OrderStatusType // 订单状态
  title: string // 商品名
  startStore: StoreItemType
  payType: OrderPayType
  endStore: StoreItemType
  car: CarItemType
  user: UserItemType
  wechatTradeNo: string // 微信订单号
}

declare type TransactionItemType = {
  createdAt: string
  id: number
  balance: number
  amount: number
  title: string
  payType: OrderPayType
  status: 'FINISHED' | 'PROCESSING' | 'FAILED'
  remark: string
  alipayOutTradeNo: string // 支付宝订单号
  tradeNo: string // 订单号
  user: UserItemType
}

declare type CommentItemType = {
  id: number
  user: UserItemType
  store: StoreItemType
  rate: number
  content: string
  createdAt: string
}

declare type FeedbackItemType = {
  id: number
  content: string
  flag: string
  phone: string
  email: string
  createdAt: string
}
declare type WeekUserAndOrderItemType = {
  name: string
  userCount: number
  orderCount: number
}
declare type DashboardItemType = {
  todayOrderCount: number
  userCount: number
  todayAmount: number
  weekUserAndOrderItems: WeekUserAndOrderItemType[]
  logs: LogItemType[]
}

declare type ViolationItemType = {
    id: number
    title: string
    description: string
    images: string[]; // 图
    amount: number; // 扣除的费
    freezeAmount: number; // 余下冻结的费
    user: UserItemType
}

declare type PosterItemType = {
  id: number
  size: number
  positionX: number
  positionY: number
  url: string
}

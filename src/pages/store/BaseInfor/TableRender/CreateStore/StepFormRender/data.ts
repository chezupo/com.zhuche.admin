import { CreateStoreType } from '@/pages/store/BaseInfor/TableRender/CreateStore/StepFormRender/StoreInformationForm'
import { GuidType, StoreAccountType } from '@/pages/store/BaseInfor/TableRender/CreateStore/StepFormRender/index'

export const initStoreData: CreateStoreType =  {
  name: '',
  mark: '',
  address: {
    province: '',
    name: '',
    city: '',
    area: '',
    provinceCode: '',
    cityCode: '',
    areaCode: '',
    address: '',
    lng: 0,
    lat: 0
  },
  servicePhone: '',
  businessHours: [ '08:00', '21:00' ],
  isAirport: false,
  isStation: false,
  isSelfService: false,
  isEnable: true,
  banners: []
}
export const intiStoreAccount: StoreAccountType = { username: '', password: '' }
export const initGuid: GuidType = { pickupGuids: [], returnGuids: [] }

export const convertCreateStore = (data: StoreItemType): CreateStoreType => {
  return {
    banners: data.banners.map(el => el.imgKey),
    name: data.name,
    mark: data.mark,
    address: {
      province: data.province.name,
      name: data.name,
      city: data.city.name,
      area: data.area.name,
      provinceCode: data.province.code,
      cityCode: data.city.code,
      areaCode: data.area.code,
      address: data.address,
      lng: data.lng,
      lat: data.lat
    },
    servicePhone: data.servicePhone,
    businessHours: [data.starAt, data.endAt],
    isEnable: data.isEnable,
    isStation: data.isStation,
    isAirport: data.isAirport,
    isSelfService: data.isSelfService
  }
}

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

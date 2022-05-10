import {get, patch, put} from "@/util/httpClient";

export type ConfigurationType = {
  imgPrefix: string
  appName: string
  logo: string
  amapKey: string
  amapSearchKey: string
  notice: string
  insurance: number
  servicePhone: string
  insuranceAgreement: string
  orderAgreement: string
} & PromotionType
export type PromotionType = {
  promotionLevel1: number
  promotionLevel2: number
}

export const getConfiguration = async (): Promise<ConfigurationType> => await get<ConfigurationType>("/configuration")
const setPromotionSetting  = async (data: PromotionType) => await put<ConfigurationType>(`/promotion`, data)

export type UpdateConfigurationType =  Omit<ConfigurationType, 'imgPrefix'>
export const updateConfiguration = async (data: UpdateConfigurationType): Promise<ConfigurationType> =>
  await patch<ConfigurationType>("/configuration", data)

const updateInsurance = async (insurance: number): Promise<ConfigurationType> => {
  return await patch<ConfigurationType>('/configuration/insurance', {
    insurance
  })
}

export {updateInsurance, setPromotionSetting}

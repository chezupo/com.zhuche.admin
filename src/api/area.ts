import { get } from '@/util/httpClient'

type CodeType = {
  name: string
  code: string
}
export const getAreas = async (provinceCode: string, cityCode: string): Promise<AreaType[]> => {
  return await get(`/province/${provinceCode}/cities/${cityCode}/area`)
}
type GetAreaResponseType = {
  city: CodeType & {province: CodeType}
} & CodeType
export const getArea = async (areaCode: string): Promise<GetAreaResponseType> => {
  return await get(`/province/cities/area/${areaCode}`)
}

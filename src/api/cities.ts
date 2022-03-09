import { get } from '@/util/httpClient'

export const getCities = async (provinceCode: string): Promise<CityType[]> => {
  return get(`/province/${provinceCode}/cities`)
}

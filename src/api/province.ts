import { get } from '@/util/httpClient'

export const getProvince = async (): Promise<ProvinceType[]> => {
  return await get("/province")
}

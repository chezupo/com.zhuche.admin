import {get, patch, post} from "@/util/httpClient";

export type CreateBrandType = {
  name: string
  imgKey: string
}

const createBrand = async (data: CreateBrandType): Promise<BrandItemType> => {
  return post<BrandItemType>('/brands', data)
}

export type GetBrandsQueryType = {
  page: number
  size: number
  name?: string
  shopName?: string
}

const getBrands = async (page: GetBrandsQueryType): Promise<PageType<BrandItemType>> => {
  return await get<PageType<BrandItemType>>('/brands', {...page})
}

const getAllBrands = async (): Promise<PageType<BrandItemType>> => {
  return await get<PageType<BrandItemType>>('/brands')
}

const updateBrand = async (data: BrandItemType): Promise<BrandItemType> => {
  const {id, name, imgKey} = data
  return await patch<BrandItemType>(`/brands/${id}`, {imgKey, name})

}

export {createBrand, getBrands, updateBrand, getAllBrands}

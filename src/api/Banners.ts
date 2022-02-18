import {deleteRequest, get, patch, post} from "@/util/httpClient";

export type BannerType = {
  id: number;
  imgKey: string;
  content: string;
}

export type BannersType = {
  list: BannerType[]
  total: number
  currentPage: number
  size: number
}

export const createBanner = async (newBanner: {imgKey: string; content: string}): Promise<BannerType> => {
  return await post<BannerType>('/banners', newBanner)
}

export const getBanners = async (page: number, pageSize: number): Promise<BannersType> => {
  return await get<BannersType>(`/banners?page=${page}&size=${pageSize}`)
}

export const updateBanner = async (banner: BannerType): Promise<BannerType> => {
  return  await patch<BannerType>(`/banners/${banner.id}`, {imgKey: banner.imgKey, content: banner.content})
}

export const  destroyBanner = async (id: number): Promise<BannerType> => {
  return  await deleteRequest<BannerType>(`/banners/${id}`)
}

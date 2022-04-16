import {deleteRequest, get, patch, post} from "@/util/httpClient";

export type BannerType = {
  id: number;
  imgKey: string;
  content: string;
  title: string;
}

export type BannersType = PageType<BannerType>

export const createBanner = async (newBanner: {imgKey: string; content: string}): Promise<BannerType> => {
  return await post<BannerType>('/banners', newBanner)
}

export const getBanners = async (page: number, pageSize: number): Promise<BannersType> => {
  return await get<BannersType>(`/banners?page=${page}&size=${pageSize}`)
}

export const updateBanner = async ({imgKey, content, title, id}: BannerType): Promise<BannerType> => {
  return  await patch<BannerType>(`/banners/${id}`, {imgKey, content, title})
}

export const  destroyBanner = async (id: number): Promise<BannerType> => {
  return  await deleteRequest<BannerType>(`/banners/${id}`)
}

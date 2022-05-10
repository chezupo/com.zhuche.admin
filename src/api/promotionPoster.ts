import {deleteRequest, get, patch, post} from "@/util/httpClient";
import {getPageQuery} from "@/util/paginationUtil";

const createPoster = async (data: Omit<PosterItemType, 'id'>) => {
  return await post<PosterItemType>(`/promotionalPoster`, data)
}

const updatePoster = async (id: number, data: Omit<PosterItemType, 'id'>) => {
  return await patch<PosterItemType>(`/promotionalPoster/${id}`, data)
}

const getPosters = async () => {
  return await get<PageType<PosterItemType>>(`/promotionalPoster`, getPageQuery())
}

const deletePoster = async (id: number) => {
  return await deleteRequest(`/promotionalPoster/${id}`)
}

export {createPoster, getPosters, updatePoster, deletePoster}

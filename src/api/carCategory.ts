import {get, post, patch, deleteRequest} from "@/util/httpClient";

export type CreateCarCategoryQueryDataType = {
  name: string
}
const createCarCategory = async (data: CreateCarCategoryQueryDataType): Promise<CarCategoryItemType> => {
  return await post<CarCategoryItemType>(`/cars/categories`, data)
}

const fetchCarCategory = async (query?: Record<string, string | number>): Promise<PageType<CarCategoryItemType>> => {
  return await get<PageType<CarCategoryItemType>>(`/cars/categories`, query);
}

const updateCarCategory = async (id: number, data: {name: string}): Promise<PageType<CarCategoryItemType>> => {
  return await patch<PageType<CarCategoryItemType>>(`/cars/categories/${id}`, data);
}

const deleteCarCategory = async (id: number): Promise<PageType<CarCategoryItemType>> => {
  return await deleteRequest(`/cars/categories/${id}`);
}

export {createCarCategory, fetchCarCategory, updateCarCategory, deleteCarCategory}

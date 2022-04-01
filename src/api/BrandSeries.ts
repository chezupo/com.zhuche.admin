import {deleteRequest, patch, post} from "@/util/httpClient";

const createBrandSeries = async (brandId: number, requestBody: {name: string}): Promise<BrandSeriesItemType> => {
  return await post<BrandSeriesItemType>(`/brands/${brandId}/series`, requestBody)
}

const updateBrandSeries = async (requestBody: BrandSeriesItemType ): Promise<BrandSeriesItemType> => {
  return await patch<BrandSeriesItemType>(`/brands/series/${requestBody.id}`, requestBody)
}

const deleteBrandSeries = async (id: number): Promise<void> => {
  await deleteRequest<void>(`/brands/series/${id}`)
}

export {createBrandSeries, updateBrandSeries, deleteBrandSeries}

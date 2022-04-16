import {deleteRequest, get, patch, post} from "@/util/httpClient";
import {getPageQuery} from "@/util/paginationUtil";

type CreateCouponType = Omit<CouponItemType, 'id'>
type UpdateCouponQueryType = Omit<CouponItemType, 'id'>
const getCoupons = async (): Promise<PageType<CouponItemType>> => {
  return await get<PageType<CouponItemType>>('/coupons', getPageQuery(1, 12) )
}

const createCoupon = async (data: CreateCouponType): Promise<CouponItemType> => (
  await post<CouponItemType>('/coupons', data)
)

const updateCoupon = async (id: number, updateCouponQuery: UpdateCouponQueryType): Promise<CouponItemType> => {
  return await patch<CouponItemType>(`/coupons/${id}`, updateCouponQuery)
}

const deleteCoupon  = async (id: number): Promise<void> => await deleteRequest(`/coupons/${id}`)

export type {CreateCouponType, UpdateCouponQueryType}
export {getCoupons, createCoupon, updateCoupon, deleteCoupon}

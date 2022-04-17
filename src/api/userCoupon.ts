import {get, post} from "@/util/httpClient";
import {getPageQuery} from "@/util/paginationUtil";

const createUserCoupon = async (userId: number, couponIds: number[]): Promise<UserCouponItemType[]> => {
  return await post<UserCouponItemType[]>(`/users/${userId}/coupons`, {couponIds})
}

const getUserCoupons = async (): Promise<PageType<UserCouponItemType>> => {
  return await get<PageType<UserCouponItemType>>(`/users/coupons`, getPageQuery() )
}

export {createUserCoupon, getUserCoupons}

import {deleteRequest, get, patch} from '@/util/httpClient'
import {getPageQuery} from "@/util/paginationUtil";

type HasUserType = {
  hasUser: boolean
}

const getUser =  async (username: string): Promise<UserItemType> => {
  return await get<UserItemType>(`/users/${username}`)
}

const hasUser =  async (username: string): Promise<HasUserType> => {
  return await get<HasUserType>(`/users/${username}/hasUser`)
}

const updateUserPassword = (userId: number, newPassword: string) => {
  return  async (): Promise<void> => {
    await patch<UserItemType>(`/users/${userId}/password`, {password: newPassword})
  }
}

const getAlipayUsers = async (): Promise<PageType<UserItemType>> => {
  return await get<PageType<UserItemType>>(`/users/alipay/users`, getPageQuery(1, 12))
}

const getWechatUsers = async (): Promise<PageType<UserItemType>> => {
  return await get<PageType<UserItemType>>(`/users/wechat/users`, getPageQuery(1, 12))
}

const setUserPromoter = async (userId: number): Promise<UserItemType> => {
  return await patch<UserItemType>(`/users/${userId}/roles/ROLE_PROMOTER`)
}

const unsetUserPromoter = async (userId: number): Promise<UserItemType> => {
  return await deleteRequest<UserItemType>(`/users/${userId}/roles/ROLE_PROMOTER`)
}

export {
  hasUser,
  getUser,
  updateUserPassword,
  getAlipayUsers,
  setUserPromoter,
  unsetUserPromoter,
  getWechatUsers
}

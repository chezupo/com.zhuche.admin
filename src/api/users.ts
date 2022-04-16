import {deleteRequest, get, patch} from '@/util/httpClient'
import {stat} from "fs";
import {getPageQuery} from "@/util/paginationUtil";

type HasUserType = {
  hasUser: boolean
}

const getUser =  async (username: string): Promise<UserType> => {
  const {id, username: resUsername, roles} = await get<UserType>(`/users/${username}`)

  return {id, username: resUsername, roles}
}

const hasUser =  async (username: string): Promise<HasUserType> => {
  return await get<HasUserType>(`/users/${username}/hasUser`)
}

const updateUserPassword = (userId: number, newPassword: string) => {
  return  async (): Promise<void> => {
    await patch<UserType>(`/users/${userId}/password`, {password: newPassword})
  }
}

const getAlipayUsers = async (): Promise<PageType<UserType>> => {
  return await get<PageType<UserType>>(`/users/alipay/users`, getPageQuery(1, 12))
}

const setUserPromoter = async (userId: number): Promise<UserType> => {
  return await patch<UserType>(`/users/${userId}/roles/ROLE_PROMOTER`)
}

const unsetUserPromoter = async (userId: number): Promise<UserType> => {
  return await deleteRequest<UserType>(`/users/${userId}/roles/ROLE_PROMOTER`)
}

export {
  hasUser,
  getUser,
  updateUserPassword,
  getAlipayUsers,
  setUserPromoter,
  unsetUserPromoter
}

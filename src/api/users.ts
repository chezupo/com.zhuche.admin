import {get, patch} from '@/util/httpClient'
import {stat} from "fs";

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

export {hasUser, getUser, updateUserPassword}

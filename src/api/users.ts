import { get } from '@/util/httpClient'

export const getUser =  async (username: string): Promise<UserType> => {
  const {id, username: resUsername, roles} = await get<UserType>(`/users/${username}`)

  return {id, username: resUsername, roles}
}

type HasUserType = {
  hasUser: boolean
}
export const hasUser =  async (username: string): Promise<HasUserType> => {
  return await get<HasUserType>(`/users/${username}/hasUser`)
}

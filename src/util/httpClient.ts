import axios from 'axios'
import { getAccessToken } from '@/util/AuthUtil'
import ErrorHandler, { ErrorType, isErrorFromClient, isErrorFromServer } from '@/config/ErrorHandler'
import { objectToQueryStr } from '@/util/helper'

const httpClient = axios.create({
  // baseURL: "https://a1001zhuche.jds.wuchuheng.com/api/v1",
  baseURL: "https://dev.a1001zhuche.wuchuheng.com/api/v1",
  // baseURL: "https://a1001zhuche.jds.wuchuheng.com/api/v1",
})
httpClient.interceptors.request.use(config => {
  const token = getAccessToken()
  if (token) {
    config.headers!.Authorization =  token ? `Bearer ${getAccessToken()?.accessToken}` : '';
  }

  return config
})

httpClient.interceptors.response.use(async (response) => {
  if (response.status === 200) {
    const data =  response.data  as {isSuccess: boolean, data?: object} | FailResponseType
    if (data.isSuccess && ([true, false].includes(data.isSuccess))) {
      if (data.data !== null) {
        const res = data.data
        return res
      } else {
        return {}
      }
      const {errorCode, errorMessage} =  data as FailResponseType
      // 客户端引发的错误
      if (isErrorFromClient(errorCode)) {
        throw new ErrorHandler(ErrorType.MY_ERROR, errorMessage, errorCode)
      }
      // 服务器内部引发的错误
      if (isErrorFromServer(errorCode)) {
        throw new ErrorHandler(ErrorType.SERVER_ERROR, errorMessage, errorCode );
      }
    }
    return data
  } else  {
    throw new ErrorHandler(ErrorType.NETWORK_ERROR, "网络错误!!!", 0)
  }

  return response;
})
type FailResponseType = {
  isSuccess: false
  errorMessage: string
  errorCode: number
}

// post 请求
export const post = async <T>(url: string, data?:object): Promise<T> =>  {
  try {
    const response = data ? await httpClient.post(url, data) : await httpClient.post(url)
    response.data === undefined && delete response.data;

    const res = response as unknown as T;
    return res as T;
  }catch (e) {
    throw new ErrorHandler(ErrorType.NETWORK_ERROR, (e as Error).message || '', 0)
  }
}

// get 请求
export const get = async <T>(url: string, data?: object): Promise<T> =>  {
  try {
    url += data ? objectToQueryStr(data) : ''
    console.log(`Getting request: ${url}`)
    const response = await httpClient.get(url )
    response.data === undefined && delete response.data;
    const res = response as unknown as T;

    return res as T;
  }catch (e) {
    throw new ErrorHandler(ErrorType.NETWORK_ERROR, '网络错误，请联系管理员处理', 0)
  }
}

// patch 请求
export const patch= async <T>(url: string, data?: object): Promise<T> =>  {
  const response = await httpClient.patch(url, data)
  response.data === undefined && delete response.data;
  console.log(`Patch request: ${url}`)
  const res = response as unknown as T;

  return res as T;
}

// put 请求
export const put = async <T>(url: string, data?: object): Promise<T> =>  {
  const response = await httpClient.put(url, data)
  response.data === undefined && delete response.data;
  console.log(`Patch request: ${url}`)
  const res = response as unknown as T;

  return res as T;
}

// delete 请求
export const deleteRequest = async <T>(url: string): Promise<T> =>  {
  const response = await httpClient.delete(url)
  response.data === undefined && delete response.data;
  console.log(`Delete request: ${url}`)
  const res = response as unknown as T;

  return res as T;
}


import axios, {AxiosResponse} from "axios";
import {getAccessToken} from "@/util/AuthUtil";
import {Service} from 'axios-middleware';
import ErrorHandler, {ErrorType} from "@/config/ErrorHandler";


const httpClient = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  headers: {
    ...( getAccessToken() ? {Authorization: `Bearer ${getAccessToken()}`} : {} )
  }
})

const service  = new Service(httpClient);

type FailResponseType = {
  isSuccess: false
  errorMessage: string
  errorCode: number
}

service.register({
  onResponse(response) {
    if (response.status === 200) {
      response = JSON.parse( response.data )
      if (response.isSuccess) {
        const {data} = response

        return  data
      }
      const {errorCode, errorMessage} = response as FailResponseType
      // 客户端引发的错误
      if (errorCode >= 40000 && errorCode < 50000) {
        throw new ErrorHandler(ErrorType.MY_ERROR, errorMessage)
      }
      // 服务器内部引发的错误
      if (errorCode >= 50000) {
        throw new ErrorHandler(ErrorType.SERVER_ERROR, errorMessage );
      }
    } else  {
      throw new ErrorHandler(ErrorType.NETWORK_ERROR, "网络错误!!!")
    }

    return response;
  }
})

// post 请求
export const post = async <T>(url: string, data?: any): Promise<T> =>  {
  const response = data ? await httpClient.post(url, data) : await httpClient.post(url)
  response.data === undefined && delete response.data;

  const res = response as unknown as T;
  return res as T;
}

// export default httpClient;

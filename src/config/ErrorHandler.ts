import {message as antMessage} from 'antd';
import store from '@/store'
import { showError } from '@/store/modules/error'

export enum ErrorType {
  NETWORK_ERROR,  // 网络错误
  MY_ERROR, // 客户端这边的引发的错误
  SERVER_ERROR, // 服务器那边的出现的内部引发错误
}

// 用户端出的问题
export const isErrorFromClient =(errorCode: number) => errorCode >= 40000 && errorCode < 50000
// 服务端出的问题
export const isErrorFromServer =(errorCode: number) => errorCode >= 50000

export default class ErrorHandler extends Error{
  constructor(errorType:ErrorType, message: string, errorCode: number) {
    super(message);
    if (isErrorFromClient(errorCode)) antMessage.error(message);
    else if (isErrorFromServer(errorCode)) antMessage.error(message);
    else if (errorType === ErrorType.NETWORK_ERROR) {
      store.dispatch(showError({visitable: true, message}))
    }
  }
}




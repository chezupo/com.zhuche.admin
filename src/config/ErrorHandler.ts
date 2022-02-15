export enum ErrorType {
  NETWORK_ERROR,  // 网络错误
  MY_ERROR, // 客户端这边的引发的错误
  SERVER_ERROR, // 服务器那边的出现的内部引发错误
}

export default class ErrorHandler extends Error{
  constructor(errorType:ErrorType, message: string) {
    super(message);
  }
}




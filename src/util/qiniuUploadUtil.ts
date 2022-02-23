import {createUploadToken} from "@/api/UploadTokens";
import * as qiniu from "qiniu-js";
import {getTimeStr} from "@/util/helper";

type CompleteType = { key: string; prefixUrl: string }
export type UploadFileCallbackType =  {
  next: (percent: number) => void
  error: (error: Error) => void
  complete?: (res: CompleteType) => void
}

export const uploadFile = async (file: File, callback: UploadFileCallbackType): Promise<CompleteType>  => {
  const {accessToken, prefixUrl} =  await createUploadToken()
  const key = getTimeStr() + '-' + Date.now() + '-' + file.name
  const observable = qiniu.upload(file, key, accessToken)

  return new Promise<CompleteType>((resolve) => {
    observable.subscribe({
      next: res => {
        const percent = Math.round(  res.total.percent * 100 ) / 100
        callback.next(percent)
      },
      error: err => callback.error(err),
      complete: () => {
        callback.complete && callback.complete({key, prefixUrl})
        return resolve({key, prefixUrl})
      }
    })
  })
}

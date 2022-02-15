import { FileLoader, UploadAdapter } from '@ckeditor/ckeditor5-upload/src/filerepository'
import { getTimeStr } from '@/util/helper'
import * as qiniu from 'qiniu-js'
import { ISubscriptionLike } from 'qiniu-js/src/utils/observable'
import {createUploadToken} from "@/api/UploadTokens";

export default class MyUploadAdapter implements UploadAdapter{
  loader: FileLoader
  prefix = ''

  subscription: ISubscriptionLike | undefined

  constructor(props: FileLoader) {
    // CKEditor 5's FileLoader instance.
    this.loader = props;
  }

  // Starts the upload process.
  upload(): Promise<Record<string, string>> {
    return new Promise<Record<string, string>>((resolve, reject) => {
      createUploadToken().then(tokenInfo => {
        this.prefix = tokenInfo.prefixUrl
        this.loader.file.then((f)=> {
          const file = f as File
          const key = getTimeStr() + '-' + Date.now() + '-' + file.name
          const observable = qiniu.upload(file, key, tokenInfo.accessToken)
          this.subscription= observable.subscribe({
            next: res => {
              this.loader.uploadTotal = res.total.size;
              this.loader.uploaded = res.total.loaded
            },
            error: err => reject(err),
            complete: res => {
              const url =  `${this.prefix}/${res.key}`
              resolve({default: url})
            }
          })
        })
      })
    })
  }

  // Aborts the upload process.
  abort() {
    this.subscription && this.subscription.unsubscribe()
  }
}

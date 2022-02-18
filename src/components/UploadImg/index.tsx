import {Upload} from 'antd'
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons'
import {createUploadToken} from "@/api/UploadTokens";
import React, {useState} from 'react'
import * as qiniu from 'qiniu-js'
import {getTimeStr} from '@/util/helper'

export type ImgType = {key: string; prefixUrl: string}
export type UploadImgPropsType = {
  onUploaded?: (newImg: ImgType) => void
  imageUrl?: string
}
const UploadImg = (props: UploadImgPropsType) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [progress, setProgress] = useState<number>(0)
  const handleUploading = (file: File, token: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const key = getTimeStr() + '-' + Date.now() + '-' + file.name
      const observable = qiniu.upload(file, key, token )
      observable.subscribe({
        next: res => setProgress(Math.round(  res.total.percent * 100 ) / 100),
        error: err => reject(err),
        complete: res => {
          setLoading(false)
          setProgress(0)
          resolve(key)
        }
      })
    })
  }
  const beforeUpload = async (file: File): Promise<boolean> => {
    setLoading(true)
    const uploadTokenInfo = await createUploadToken();
    const key = await handleUploading(file, uploadTokenInfo.accessToken)
    props.onUploaded && props.onUploaded({
      prefixUrl: uploadTokenInfo.prefixUrl,
      key
    })

    return false
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>上传
        {loading && ' ' + progress + '%'}
      </div>
    </div>
  );
    return (
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
      >
        {props.imageUrl? <img src={props.imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    )

}
export default UploadImg

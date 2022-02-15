import {Upload} from 'antd'
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons'
import {createUploadToken} from "@/api/UploadTokens";
import React, {useState} from 'react'
import * as qiniu from 'qiniu-js'
import {getTimeStr} from '@/util/helper'

type UploadImgPropsType = {
  onUploaded?: (key: string) => void
}
const UploadImg = (props: UploadImgPropsType) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [imageUrl, setImageUrl] = useState<string>('')
  const [progress, setProgress] = useState<number>(0)
  const handleUploading = (file: File, token: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const key = getTimeStr() + '-' + Date.now() + '-' + file.name
      const observable = qiniu.upload(file, key, token )
      observable.subscribe({
        next: res => {
          setProgress(res.total.percent)
        },
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
    setImageUrl(`${uploadTokenInfo.prefixUrl}/${key}`)
    props.onUploaded && props.onUploaded(key)

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
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    )

}
export default UploadImg

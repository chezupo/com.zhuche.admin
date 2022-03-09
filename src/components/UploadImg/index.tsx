import {Upload} from 'antd'
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons'
import {createUploadToken} from "@/api/UploadTokens";
import React, { useEffect, useRef, useState } from 'react'
import {uploadFile} from "@/util/qiniuUploadUtil";

export type ImgType = {key: string; prefixUrl: string}
export type UploadImgPropsType = {
  onUploaded?: (newImg: ImgType) => void
  imageUrl?: string
}
const UploadImg = (props: UploadImgPropsType) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [progress, setProgress] = useState<number>(0)
  const beforeUpload = async (file: File): Promise<boolean> => {
    setLoading(true)
    try {
      const uploadTokenInfo = await createUploadToken();
      const {key, prefixUrl}= await uploadFile(file, {
        next: percent => {
          setProgress(percent)
        },
        error: () => {
          setLoading(false)
        },
      })
      setLoading(false)
      props.onUploaded && props.onUploaded({key, prefixUrl})
      props.onUploaded && props.onUploaded({
        prefixUrl: uploadTokenInfo.prefixUrl,
        key
      })
    }catch (e) {
      setLoading(false)
    }

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

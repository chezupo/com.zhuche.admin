import {Upload} from 'antd'
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons'
// :xxx type
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import convert from 'image-file-resize';
import React, {useState} from 'react'
import {fileToBase64} from "@wuchuhengtools/helper";


export type UploadImgPropsType = {
  onUploaded?: (newImg: string) => void
  imageUrl?: string
}
const UploadImgBase64 = (props: UploadImgPropsType) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [progress, setProgress] = useState<number>(0)
  const beforeUpload = (file: File)  => {
    setLoading(true)
    convert({
      file: file,
      width: 20,
      height: 20,
      type: 'jpeg'
      // :xxx type
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
    }).then(resp => {
      return fileToBase64(resp as File)
    })
      // :xxx type
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .then(base64 => {
        // :xxx type
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        props.onUploaded(base64)
      }).finally(() => {
        setLoading(false)
    })

    return Upload.LIST_IGNORE
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
        accept='.png,.jpg,.jpeg'
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
export default UploadImgBase64

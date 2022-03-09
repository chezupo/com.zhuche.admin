import React from 'react'
import UploadImg, { ImgType } from '@/components/UploadImg'
import { Form } from 'antd'
import { idToImgName, GuidItemType } from './index'
import { useAppSelector } from '@/store/hooks'

type ImgRenderPropsType = {
  value?: string
  id?: string
  onChange: (imgData: ImgType) => void
}
const ImgRender: React.FC<ImgRenderPropsType> = (props) => {
  const imgPrefix = useAppSelector(state => state.configuration.imgPrefix)
  return (
      <UploadImg
        onUploaded={props.onChange}
        {...(imgPrefix && props.value ? {imageUrl:  `${imgPrefix}/${props.value}`} : {})}
      />
  )
}
const RenderImg: React.FC<{record: GuidItemType; onchange: (newImg: ImgType, id: number ) => void }> = ({record, onchange}) => {
  const handleChange = (imgData: ImgType) => onchange(imgData, record.id)

  return (
    <>
    <Form.Item
      name={idToImgName(record.id)}
      rules={[{required: true, message: '图片不能为空'}]}
    >
      <ImgRender
        onChange={handleChange}
      />
    </Form.Item>
  </>
)
}

export default RenderImg

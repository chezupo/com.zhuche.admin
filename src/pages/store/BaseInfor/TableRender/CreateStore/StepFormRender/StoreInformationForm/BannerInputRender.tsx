import React, { useContext, useEffect } from 'react'
import { InputRenderPropsType } from '@/pages/store/BaseInfor/TableRender/CreateStore/StepFormRender/StoreInformationForm/InputRender'
import { Rule } from 'antd/es/form'
import { Col, Form, FormInstance } from 'antd'
import UploadMultipleImg, { UploadMultipleImgPropsType } from '@/components/UploadMultipleImg'
import {
  CreateStoreType,
  FormContext
} from '@/pages/store/BaseInfor/TableRender/CreateStore/StepFormRender/StoreInformationForm/index'
import { useAppSelector } from '@/store/hooks'

const UploadMultipleImgRender: React.FC<UploadMultipleImgPropsType> = (props) => {
  const imgPrefix = useAppSelector(state => state.configuration.imgPrefix)
  const prefix = `${imgPrefix}/`
  const value = props.value ? props.value.map(el =>  `${prefix}${el}`) : props.value
  const handleChange = (keys: string[]) => {
    const newKes = keys.map(el => el.replace(prefix, ''))

    props.onChange && props.onChange(newKes)
  }

  return <UploadMultipleImg onChange={handleChange} value={value} accept='.png,.jpg,.jpeg' />
}

const BannerInputRender: React.FC<InputRenderPropsType & {form: FormInstance<CreateStoreType>}> = (props)=> {
  const form = props.form
  useEffect(() => {
    console.log(form?.setFieldsValue({banners: [
      ]}))
  }, [])

  let  rules: Rule[] = []
  if (props.rules) rules = Array.isArray(props.rules) ? props.rules : [props.rules]

  return (
    <Col span={24}>
      <Form.Item
        labelCol={{span: 2}}
        label={props.label}
        name={props.name}
        rules={rules}
      >
        <UploadMultipleImgRender/>
      </Form.Item>
    </Col>
  )
}



export default BannerInputRender

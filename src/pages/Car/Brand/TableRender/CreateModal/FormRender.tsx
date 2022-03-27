import React, {useState} from "react";
import {Button, Col, Form, Input, Row, Spin} from "antd";
import UploadImgBase64 from "@/components/UploadImgBase64";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {createBrandThunk} from "@/store/modules/brand";
import {successMessage} from "@/util/messageUtil";

type UploadImgPickerPropsType = {
  value?: string
  onChange?: (value: string) => void
}
export const UploadImgPicker:React.FC<UploadImgPickerPropsType> = props => {
  return (
    <UploadImgBase64
      imageUrl={props.value}
      onUploaded={props.onChange}
    />
  )
}
type FormRenderPropsType = {
  onSuccess: () => void
}
const FormRender: React.FC<FormRenderPropsType> = props  => {
  const [form] = Form.useForm<BrandItemType>()
  const [loading, setLoading] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  const handleFinish = (newData: BrandItemType) => {
    setLoading(true)
    dispatch(createBrandThunk(newData)).then(() => {
      form.resetFields()
      successMessage()
      props.onSuccess()
    }).finally(() => {
      setLoading(false)
    })
  }

  return (
    <Spin spinning={loading}>
      <Form
        form={form}
        wrapperCol={{span: 20}}
        labelCol={{span: 4}}
        onFinish={handleFinish}
      >
        <Form.Item
          label='品牌名'
          name='name'
          rules={[{required: true, message: '品牌不能为空'}]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='图标'
          name='imgKey'
          rules={[{required: true, message: '品牌图标不能为空'}]}
        >
          <UploadImgPicker />
        </Form.Item>
        <Form.Item
          wrapperCol={{span: 24}}
        >
          <Row justify='center'>
            <Col>
              <Button htmlType='submit' type='primary'>创建</Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Spin>
  )
}

export default FormRender

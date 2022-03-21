import React, {useEffect, useState} from "react";
import {Button, Form, Input, Spin} from "antd";
import UploadImg from "@/components/UploadImg";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {updateConfigurationThunk} from "@/store/modules/configuration";
import {UpdateConfigurationType} from "@/api/Configurations";
import {successMessage} from "@/util/messageUtil";

const FormRender: React.FC = () => {
  const {appName, imgPrefix, logo, notice} = useAppSelector(state => state.configuration)
  const [form] = Form.useForm();
  const [imgUrl, setImgUrl] = useState<string>(logo)
  form.setFieldsValue({appName, logo})
  useEffect(() => {
    form.setFieldsValue({appName, logo})
    setImgUrl(logo)
  }, [appName, imgPrefix, logo])

  const handleUploadIg = (newLogo: string) => {
    setImgUrl(newLogo)
  }
  const dispatch = useAppDispatch()

  const [loading, setLoading] = useState<boolean>(false)
  const handleFinish = (data: UpdateConfigurationType): void => {
    setLoading(true)
    dispatch(updateConfigurationThunk({...data, logo: imgUrl})).then(() => {
      setLoading(false)
      successMessage()
    }).catch(() => {
      setLoading(false)
    })
  }

  return (
    <Spin spinning={loading}>
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        initialValues={{appName, logo, notice}}
        onFinish={handleFinish}
      >
        <Form.Item
          label="应用名"
          name="appName"
          rules={[{required: true, message: '应用名不能为空'}]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Logo'
          name='logo'
          rules={[{required: true, message: 'Logo不能为空'}]}
        >
          <UploadImg imageUrl={`${imgPrefix}/${imgUrl}`} onUploaded={(e) => handleUploadIg(e.key)} />
        </Form.Item>
        <Form.Item
          label='公告'
          name='notice'
          rules={[{required: true, message: '公告不能为空'}]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{offset: 10, span: 14 }} >
          <Button type="primary" htmlType="submit">保存</Button>
        </Form.Item>
      </Form>
    </Spin>
  )
}

export default FormRender

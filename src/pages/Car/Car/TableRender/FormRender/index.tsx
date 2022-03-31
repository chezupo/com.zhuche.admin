import React from "react";
import {Form, Input, InputNumber, Select, Switch} from "antd";
import UploadImg from "@/components/UploadImg";

const FormRender: React.FC = () => {
  const [form] = Form.useForm<CarItemType>();
  return (
    <Form
      form={form}
    >
      <Form.Item
        name='name'
        rules={[{required: true, message: '名称不能为空'}]}
        label='名称'
      > <Input /> </Form.Item>
      <Form.Item
        name='isSelfHelp'
        label='自助'
        rules={[{required: true, message: '自助不能为空'}]}
      >
        <Switch checkedChildren="是" unCheckedChildren="否" defaultChecked />
      </Form.Item>
      <Form.Item
        label='排量'
        name='displacement'
        rules={[{required: true, message: '排量不能为空'}]}
      >
        <InputNumber min={0.1} />
      </Form.Item>

      <Form.Item
        label='挂档方式'
        name='shift'
      >
        <Select>
          <Select.Option value={'AUTO'}>自动</Select.Option>
          <Select.Option value={'MANUAL'}>手动</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        label='油量'
        name='gasVolume'
        rules={[{required: true, message: '油量不能为空'}]}
      >
        <InputNumber min={0.1} />
      </Form.Item>
      <Form.Item
        label='座位数'
        name='seats'
        rules={[{required: true, message: '座位不能为空'}]}
      >
        <InputNumber min={1} />
      </Form.Item>
      <Form.Item
        name='cover'
        label='封面'
        rules={[{required: true, message: '封面不能为空'}]}
      >
        <UploadImg />
      </Form.Item>
      <Form.Item
        name='type'
        label='车型'
        rules={[{required: true, message: '车型不能为空'}]}
      >
       <Input />
      </Form.Item>
      <Form.Item
        label='车牌号'
        name='number'
        rules={[{required: true, message: '车牌号不能为空'}]}
      >
        <Input />
      </Form.Item>
    </Form>
  )
}

export default FormRender

import React, {useState} from "react";
import {Button, Form, Input} from "antd";
import style from "./style.module.less"

type LayoutType = Parameters<typeof Form>[0]['layout'];

const FilterRender: React.FC = () => {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<LayoutType>('inline');
  const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
    setFormLayout(layout);
  };
  const formItemLayout = formLayout === 'horizontal' ? { labelCol: { span: 4 }, wrapperCol: { span: 14 }, } : null;
  const buttonItemLayout = formLayout === 'horizontal' ? { wrapperCol: { span: 14, offset: 4 }, } : null;

  return (
        <Form
          className={style.main}
          {...formItemLayout}
          layout={formLayout}
          form={form}
          initialValues={{ layout: formLayout }}
          onValuesChange={onFormLayoutChange}
        >
          <Form.Item label="店名">
            <Input placeholder="请输入店名" />
          </Form.Item>
          <Form.Item label="省">
            <Input placeholder="请选择省" />
          </Form.Item>
          <Form.Item label="城市">
            <Input placeholder="请选择城市" />
          </Form.Item>
          <Form.Item label="地区">
            <Input placeholder="请选择地区" />
          </Form.Item>
          <Form.Item {...buttonItemLayout}>
            <Button type="default">重置</Button>
          </Form.Item>
          <Form.Item {...buttonItemLayout}>
            <Button type="primary">搜索</Button>
          </Form.Item>
        </Form>
  )
}

export default FilterRender

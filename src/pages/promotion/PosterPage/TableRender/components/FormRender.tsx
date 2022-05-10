import React, {useEffect, useState} from "react";
import {Button, Col, Form, InputNumber, Row} from "antd";
import FormUpload from "@/components/FormUpload";
import style from "@/pages/promotion/PosterPage/TableRender/style.module.less";
import {ValidateFunctionType} from "@/util/ValidatorUtil";
import {RuleObject} from "antd/lib/form";

export type FormDataType = Omit<PosterItemType, 'id'>
type FormRenderPropsType = {
  onFinish: (value: FormDataType) => void
  onChange: (value: FormDataType) => void
  formData: FormDataType
}
const sizeValidator: ValidateFunctionType = async (rule: RuleObject, value: string): Promise<void> => {
  if (parseFloat(value) < 0) {
    throw new Error(`不能小于0`)
  }
}
const FormRender: React.FC<FormRenderPropsType> = (props) => {
  const [form] = Form.useForm<FormDataType>()
  useEffect(() => {
    form.setFieldsValue(props.formData)
  }, [props.formData])
  const handleChange = () => {
    const value = form.getFieldsValue()
    props.onChange({...props.formData, ...value})
  }
  return (
    <Form
      labelCol={{span: 4}}
      form={form}
      onFinish={props.onFinish}
      onChange={handleChange}
    >
      <Form.Item
        label='海报'
        name='url'
        rules={[{required: true, message: '不能为空'}]}
      >
        <FormUpload
          accept='.png,.jpeg,.jpg'
        />
      </Form.Item>
      <Form.Item
        name='size'
        rules={[
          {required: true, message: '不能为空'},
          {validator: sizeValidator}
        ]}
        label='海报大小'
      >
        <InputNumber onChange={handleChange} className={style.inputNumber}/>
      </Form.Item>
      <Form.Item
        name='positionX'
        label='X坐标'
        rules={[
          {required: true, message: '不能为空'},
          {validator: sizeValidator}
        ]}
      >
        <InputNumber onChange={handleChange} className={style.inputNumber}/>
      </Form.Item>
      <Form.Item
        name='positionY'
        label='Y坐标'
        rules={[
          {required: true, message: '不能为空'},
          {validator: sizeValidator}
        ]}
      >
        <InputNumber onChange={handleChange} className={style.inputNumber}/>
      </Form.Item>

      <Row justify='center'>
        <Col>
          <Form.Item >
            <Button type='primary' htmlType='submit'>确定</Button>
          </Form.Item>
        </Col>
      </Row>

    </Form>
  )
}

export default FormRender

import React, {useEffect} from "react";
import {Button, Col, Form, Input, InputNumber, Row} from "antd";
import CustomerEditor from "@/components/BraftEditor";
import Switch from "@/components/Switch";
import {CreateCouponType} from "@/api/coupon";

export type FormType = CreateCouponType

type FormRenderPropsType = {
  onFinish: (value: FormType) => void
  onCancel: () => void
  data?: FormType
  reset?: number
}
const FormRender: React.FC<FormRenderPropsType> = props => {
  const [form] = Form.useForm<FormType>()
  const initValue:Partial<FormType> = {
    isWithServiceAmount: false,
    isWithHoliday: false,
    isWithRent: false,
    isAutoDispatchingToNewUser: false
  }
  useEffect(() => {
    if (props.reset) {
      form.resetFields();
    }
  }, [props.reset])
  useEffect(() => {
    if (props.data) {
      form.setFieldsValue(props.data)
    }
  }, [props.data])
  const labelSpan = 4;
  const handleCancel = () => {
    form.resetFields()
    props.onCancel()
  }

  return (
    <Form
      onFinish={props.onFinish}
      form={form}
      labelCol={{span: labelSpan}}
      initialValues={initValue}
    >
      <Row>
        <Col span={24}>
          <Form.Item
            name='title'
            label='标题'
            rules={[{required: true, message: '标题不能为空'}]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12} >
          <Form.Item
            labelCol={{span: labelSpan * 2}}
            name='isAutoDispatchingToNewUser'
            label='新用户自动发放'
            rules={[{required: true, message: '规则不能为空'}]}
          >
            <Switch checkedChildren='是' unCheckedChildren='否' />
          </Form.Item>
        </Col>
        <Col span={12} >
          <Form.Item
            labelCol={{span: labelSpan * 2}}
            name='isWithHoliday'
            label='节假日使用'
            rules={[{required: true, message: '不能为空'}]}
          >
            <Switch checkedChildren='是' unCheckedChildren='否' />
          </Form.Item>
        </Col>
        <Col span={12} >
          <Form.Item
            labelCol={{span: labelSpan * 2}}
            name='isWithRent'
            label='用于租赁费'
            rules={[{required: true, message: '不能为空'}]}
          >
            <Switch checkedChildren='是' unCheckedChildren='否' />
          </Form.Item>
        </Col>
        <Col span={12} >
          <Form.Item
            labelCol={{span: labelSpan * 2}}
            name='isWithServiceAmount'
            label='用于服务费'
            rules={[{required: true, message: '不能为空'}]}
          >
            <Switch checkedChildren='是' unCheckedChildren='否' />
          </Form.Item>
        </Col>
        <Col span={12} >
          <Form.Item
            labelCol={{span: labelSpan * 2}}
            name='amount'
            label='额度'
            rules={[{required: true, message: '不能为空'}]}
          >
            <InputNumber style={{width: '100%'}}/>
          </Form.Item>
        </Col>
        <Col span={12} >
          <Form.Item
            labelCol={{span: labelSpan * 2}}
            name='meetAmount'
            label='满足额度'
            rules={[{required: true, message: '不能为空'}]}
          >
            <InputNumber style={{width: '100%'}}/>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            labelCol={{span: labelSpan * 2}}
            name='expired'
            rules={[{required: true, message: '有效期不能为空'}]}
            label='有效期(天)'
          >
            <InputNumber style={{width: '100%'}} min={1} />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            name='content'
            label='规则说明'
            rules={[{required: true, message: '规则不能为空'}]}
          >
            <CustomerEditor style={{border: 'solid 1px gray'}}/>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Row justify='center' gutter={[12, 0]}>
            <Col><Button onClick={() => handleCancel()}>取消</Button></Col>
            <Col><Button htmlType='submit' type='primary'>确定</Button></Col>
          </Row>
        </Col>
      </Row>
    </Form>
  )
}

export default FormRender

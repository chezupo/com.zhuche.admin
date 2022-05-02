import React from "react";
import {Button, Col, Form, Input, Popconfirm, Row} from "antd";

type CancelButtonRenderPropsType = {
  onCancel: (reason: string) => void
}
const CancelButtonRender: React.FC<CancelButtonRenderPropsType> = props => {
  const [form] = Form.useForm()
  const handleConfirm = async () => {
    await form.validateFields()
    const {reason} =  form.getFieldsValue();
    props.onCancel(reason)
  }

  return (<>
    <Popconfirm
      cancelText='取消'
      okText='确定'
      onConfirm={handleConfirm}
      title={
        <Form
          form={form}
        >
          <Row>
            <Col span={24}>请输入拒绝的原因？</Col>
            <Col span={24} >
              <Form.Item
                label='原因说明'
                name='reason'
                rules={[{required: true, message: '不能为空'}]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      } >
      <Button danger>拒绝</Button>
    </Popconfirm>
  </>)
}

export default CancelButtonRender

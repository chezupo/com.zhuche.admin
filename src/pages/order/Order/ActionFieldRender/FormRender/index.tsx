import React, {useState} from "react";
import {Button, Col, Form, Input, Row, Spin} from "antd";
import UploadMultipleImg from "@/components/UploadMultipleImg";
import {minValidator} from "@/util/ValidatorUtil";
import {createViolation, CreateViolationQueryType} from "@/api/order";
import {successMessage} from "@/util/messageUtil";

type FormRenderPropsType = {
  order: OrderItemType
  onSucceeded: () => void
  onCanceled: () => void
}
const FormRender: React.FC<FormRenderPropsType> = props => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false)
  const handleFinished = (value: CreateViolationQueryType) => {
    setLoading(true)
    createViolation(props.order.id, value)
      .then(() => {
        successMessage()
        props.onSucceeded()
      })
      .finally(() => setLoading(false))
  }

  return (<>
    <Spin spinning={loading}>
      <Form
        form={form}
        onFinish={handleFinished}
      >
        <Form.Item
          name='title'
          rules={[{required: true, message: '标题不能为空'}]}
          label='标题'
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='description'
          rules={[{required: true, message: '内容不能为空'}]}
          label='描述'
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name='amount'
          rules={[
            {required: true, message: '扣除费用不能为空'},
            {validator: minValidator({min: 0.01, message: '不能小于0.01'}) }
          ]}
          label='费用'

        >
          <Input type='number' />
        </Form.Item>
        <Form.Item
          name='images'
          rules={[{required: true, message: '图片不能为空'}]}
          label='图片'
        >
          <UploadMultipleImg
            accept=".png,.jpg,.jpeg"

          />
        </Form.Item>
        <Row justify='center' gutter={[24, 0]}>
          <Col>
            <Form.Item>
              <Button onClick={() => props.onCanceled()}>取消</Button>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item>
              <Button type='primary' htmlType='submit'>确定</Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Spin>
  </>)
}

export default FormRender

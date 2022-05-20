import React from "react";
import {Button, Col, Form, Row} from "antd";
import FormUpload from "@/components/FormUpload";
import {ConfirmPickerCarType} from "@/api/order";

type ConfirmPickerCarFormRenderPropsType = {
  onSubmit: (value: ConfirmPickerCarType) => void
  onCancel: () => void
}
const ConfirmPickerCarFormRender: React.FC<ConfirmPickerCarFormRenderPropsType> = props => {
  const [form] = Form.useForm()
  return (<>
    <Form
      form={form}
      onFinish={props.onSubmit}
    >
      <Form.Item
        label='取车合同'
        name='contract'
        rules={[{required: true, message: '不能为空'}]}
      >
        <FormUpload
        accept='.png,.jpg,.jpeg'/>
      </Form.Item>
      <Row gutter={[12, 12]}  justify='center'>
        <Col span={12}>
          <Form.Item >
            <Button
              onClick={props.onCancel}
            >取消</Button>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item >
            <Button type='primary' htmlType='submit'>确认</Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  </>)
}

export default ConfirmPickerCarFormRender

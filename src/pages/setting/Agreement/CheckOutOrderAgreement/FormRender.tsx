import React, {useEffect, useState} from "react";
import {Button, Col, Form, Input, Row, Spin} from "antd";
import CustomerEditor from "@/components/BraftEditor";
import {updateAgreementById} from "@/api/agreement";
import {successMessage} from "@/util/messageUtil";

type FormRenderPropsType = {
  value: AgreementItemType
  onUpdated: () => void
}
const FormRender: React.FC<FormRenderPropsType> = props => {
  const {title, content} = props.value
  const [loading, setLoading] = useState<boolean>(false)
  const [form] = Form.useForm()
  const handleInit = () => {
    form.setFieldsValue({title, content})
  }
  useEffect(() => handleInit(), [])
  useEffect(() => handleInit(), [props.value])
  const handleFinish = (newValue: {title: string; content: string}) => {
    setLoading(true)
    updateAgreementById(props.value.id, newValue)
      .then(() => {
        successMessage();
        props.onUpdated()
      }).finally(() => setLoading(false))
  }

  return (<>
    <Spin spinning={loading}>
      <Form
        form={form}
        onFinish={handleFinish}
      >
        <Form.Item
          label='标题'
          name='title'
          rules={[{required: true, message: '标题不能为空'}]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='内容'
          name='content'
          rules={[{required: true, message: '内容不能为空'}]}
        >
          <CustomerEditor style={{border: 'solid 1px gray'}}/>
        </Form.Item>
        <Row justify='center'>
          <Col>
            <Form.Item>
              <Button htmlType='submit' type='primary'>保存</Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Spin>
  </>)
}

export default FormRender

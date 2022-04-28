import React, {useEffect, useState} from "react";
import {Button, Col, Form, Row, Spin} from "antd";
import {getConfiguration} from "@/api/Configurations";
import {updateAgreement, UpdateAgreementQueryType} from "@/api/agreement";
import {successMessage} from "@/util/messageUtil";
import CustomerEditor from "@/components/BraftEditor";

const OrderAgreement: React.FC = () => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)
  const handleInit = () => {
    getConfiguration().then(({insuranceAgreement, orderAgreement}) => {
      form.setFieldsValue({
        insuranceAgreement,
        orderAgreement
      })
    })
  }
  useEffect(() => handleInit(), [])

  const handleFinish = (newValue: UpdateAgreementQueryType) => {
    setLoading(true)
    updateAgreement(newValue).then(() => {
      successMessage()
    }).finally(() => setLoading(false))
    console.log()
  }

  return (<>
    <Spin spinning={loading}>
      <Form
        onFinish={handleFinish}
        form={form}
        labelCol={{span: 2}}
      >
        <Form.Item
          name='orderAgreement'
          rules={[{required: true, message: '协议不能为空'}]}
          label='下单协议'
        >
          <CustomerEditor style={{border: 'solid 1px gray'}} />
        </Form.Item>
        <Form.Item
          name='insuranceAgreement'
          rules={[{required: true, message: '协议不能为空'}]}
          label='驾无忧协议'
        >
          <CustomerEditor style={{border: 'solid 1px gray'}} />
        </Form.Item>
        <Form.Item>
          <Row justify='center'>
            <Col>
              <Button htmlType='submit' type='primary'>保存</Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Spin>
  </>)
}

export default OrderAgreement;

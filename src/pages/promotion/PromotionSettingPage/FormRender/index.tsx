import React, {useEffect, useState} from "react";
import {Button, Col, Form, InputNumber, Row, Spin} from "antd";
import style from './style.module.less'
import {getConfiguration, PromotionType, setPromotionSetting} from "@/api/Configurations";
import {ValidateFunctionType} from "@/util/ValidatorUtil";
import {RuleObject} from "antd/lib/form";
import {successMessage} from "@/util/messageUtil";

const valueValidator: ValidateFunctionType = async (rule: RuleObject, value: string): Promise<void> => {
  if (parseFloat(value) <= 0) {
    throw new Error(`不能小于或等于0`)
  }
}
const FormRender: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [form] = Form.useForm();
  useEffect(() => {
    setLoading(true)
    getConfiguration()
      .then(({promotionLevel1, promotionLevel2}) => {
        form.setFieldsValue({ promotionLevel1, promotionLevel2 })
      })
      .finally(() => setLoading(false))
  }, [])
  const handleFinished = (value: PromotionType) => {
    setLoading(true)
    setPromotionSetting(value)
      .then(() => {
        successMessage()
      })
      .finally(() => setLoading(false))
  }

  return (<>
    <Spin spinning={loading}>
      <Row className={style.main} justify='center'>
        <Col span={12}>
          <Form
            onFinish={handleFinished}
            form={form}
          >
            <Form.Item
              label='一级推广返点(%)'
              rules={[
                {required: true, message: '不能为空'},
                {validator: valueValidator}
              ]}
              name='promotionLevel1'
            >
              <InputNumber className={style.input}/>
            </Form.Item>
            <Form.Item
              label='二级推广返点(%)'
              rules={[
                {required: true, message: '不能为空'},
                {validator: valueValidator}
              ]}
              name='promotionLevel2'
            >
              <InputNumber className={style.input} />
            </Form.Item>
            <Row justify='center'>
              <Col>
                <Form.Item >
                  <Button htmlType='submit' type='primary'>保存</Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Spin>
  </>)
}

export default FormRender

import React, {useEffect, useState} from "react";
import HeaderPage from "@/components/HeaderPage";
import ContentContainer from "@/components/ContentContainer";
import style from "./style.module.less";
import {Button, Col, Form, Input, InputNumber, Row, Spin} from "antd";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {updateInsuranceThunk} from "@/store/modules/configuration";
import {successMessage} from "@/util/messageUtil";

const Insurance: React.FC = () => {
  const [form] = Form.useForm()
  const config = useAppSelector(state => state.configuration)
  const init = () => {
    if (config) {
      form.setFieldsValue({insurance: config.insurance })
    }
  }
  useEffect(() => init(), [])
  useEffect(() => init(), [config])
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState<boolean>(false)
  const handleFinish = (newValue: {insurance: number}) => {
    setLoading(true)
    dispatch(updateInsuranceThunk(newValue.insurance)).then(() => {
      successMessage()
    }).finally(() =>  setLoading(false))
  }

  return (<>
    <HeaderPage >
      <>用于管理用户下单的保险费用</>
    </HeaderPage>
    <ContentContainer classname={style.main}>
      <Spin spinning={loading}>
        <Form
          form={form}
          onFinish={handleFinish}
        >
          <Row justify='center'>
            <Col span={12}>
              <Row justify='center'>
                <Col span={24}>
                  <Form.Item
                    name='insurance'
                    label='驾无忧价格'
                    rules={[
                      {required: true, message: '价格不能为空'},

                    ]}
                  >
                    <InputNumber min={0} style={{width: '100%'}}/>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item>
                    <Button htmlType='submit' type='primary'>保存</Button>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </Spin>
    </ContentContainer>
  </>)
}

export default Insurance

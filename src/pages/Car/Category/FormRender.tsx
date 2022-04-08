import React, {useEffect} from "react";
import {Button, Col, Form, Input, Row} from "antd";
import {CreateCarCategoryQueryDataType} from "@/api/carCategory";
import {FormInstance} from "antd/lib/form/hooks/useForm";

type FormRenderPropsType = {
  onFinish: (newValue: CreateCarCategoryQueryDataType) => void
  onCancel: () => void
  onRef?: (form: FormInstance) => void
  value?: CreateCarCategoryQueryDataType
}
const FormRender: React.FC<FormRenderPropsType> = props => {
  const [form] = Form.useForm<CreateCarCategoryQueryDataType>()
  const handleInit = () => {
    if (props.value) {
      form.setFieldsValue(props.value)
    }
  }
  useEffect(() => {
    handleInit();
    props.onRef && props.onRef(form)
  }, [])
  useEffect(() => handleInit(), [props.value])

  return (<>
    <Form
      form={form}
      onFinish={props.onFinish}
    >
      <Row>
        <Col span={24}>
          <Form.Item
            name='name'
            label="名称"
            rules={[{required: true, message: '不能为空'}]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Row justify='center' gutter={[12, 0]}>
            <Col>
              <Form.Item>
                <Button onClick={() => props.onCancel()}>取消</Button>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item>
                <Button type='primary' htmlType='submit'>确定</Button>
              </Form.Item>
            </Col>
          </Row>
        </Col>
      </Row>
    </Form>
  </>)

}

export default FormRender

import React, {useState} from "react";
import {Button, Popover, Row, Col, Input, Form, Spin} from "antd";
import {lengthValidator} from "@/util/ValidatorUtil";
import {useAppDispatch} from "@/store/hooks";
import {updateUserPassword} from "@/api/users";
import {successMessage} from "@/util/messageUtil";

type EditPasswordRenderPropsType = {
  value: StoreItemType
}
const EditPasswordRender: React.FC<EditPasswordRenderPropsType> = props => {
  const [loading, setLoading] = useState<boolean>(false)
  const [visible, setVisible] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const [form] = Form.useForm()
  const handleFinish = (newValue: {password: string}) => {
    setLoading(true)
    dispatch(updateUserPassword(props.value.admin.id, newValue.password)).then(() => {
      successMessage()
      form.resetFields()
      setVisible(false)
    }).finally(() => {
      setLoading(false)
    })
  }
  const ContentRender = (
    <Spin spinning={loading}>
      <Form
        form={form}
        onFinish={handleFinish}
      >
        <Row gutter={[12, 0]}>
          <Col>
            <Form.Item
              name='password'
              rules={[
                {required: true, message: '密码不能为空'},
                {validator: lengthValidator({min: 8, message: '密码不能少于8位'})}
              ]}
            >
              <Input placeholder='请输入新的密码'  />
            </Form.Item>
          </Col>
          <Col>
            <Button type='primary' htmlType='submit'>确定</Button>
          </Col>
        </Row>
      </Form>
    </Spin>
  )
  return (
    <Popover
      content={ContentRender} title='修改密码'
      visible={visible}
      onVisibleChange={setVisible}
    >
      <Button size='small'>改密</Button>
    </Popover>
  )
}

export default EditPasswordRender

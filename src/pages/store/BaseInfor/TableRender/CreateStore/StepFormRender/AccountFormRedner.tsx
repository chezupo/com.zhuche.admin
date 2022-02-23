import * as React from "react";
import {Form, Input} from "antd";
import {useEffect} from "react";
import {
  areYouOkSubscription,
  iAmOkSubscription, StoreAccountType
} from "@/pages/store/BaseInfor/TableRender/CreateStore/StepFormRender/index";

type CreateAccountFormPropsType = {
  onChange: (account: StoreAccountType) => void
  data: StoreAccountType
}
const CreateAccountForm: React.FC<CreateAccountFormPropsType> = (props) => {
  const [form] = Form.useForm()
  const handleInitData = () => form.setFieldsValue(props.data)
  useEffect(() => {
    const subscriptionHandler = areYouOkSubscription.subscription(() => {
      form.validateFields().then((res) => {
          iAmOkSubscription.next("Nice")
        }
      )
    })
    handleInitData()
    return () => {
      areYouOkSubscription.unSubscription(subscriptionHandler)
    }
  }, [])
  useEffect(() => handleInitData(), [props.data])
  const handleChange = (newData: StoreAccountType): void => {
    props.onChange({...props.data, ...newData})
  }

  return (
    <Form
      form={form}
      onValuesChange={handleChange}
      initialValues={props.data}
    >
      <Form.Item
        label="账号"
        name='username'
        rules={[{required: true, message: '账号不能为空'}]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label='密码'
        name='password'
        rules={[{required: true, message: '密码不能为空'}]}
      >
        <Input
          type='password'
        />
      </Form.Item>
    </Form>
  )
}

export default CreateAccountForm

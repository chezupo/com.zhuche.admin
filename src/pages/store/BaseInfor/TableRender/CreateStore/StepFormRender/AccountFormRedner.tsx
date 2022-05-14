import * as React from 'react'
import { useEffect } from 'react'
import { Form, Input } from 'antd'
import {
  areYouOkSubscription,
  iAmOkSubscription,
  StepIndexType,
  StoreAccountType
} from '@/pages/store/BaseInfor/TableRender/CreateStore/StepFormRender/index'
import { hasUser } from '@/api/users'
import {RuleObject} from "antd/lib/form";

type CreateAccountFormPropsType = {
  onChange: (account: StoreAccountType) => void
  data: StoreAccountType
}
const CreateAccountForm: React.FC<CreateAccountFormPropsType> = (props) => {
  const [form] = Form.useForm()
  const handleInitData = () => form.setFieldsValue(props.data)
  useEffect(() => {
    const subscriptionHandler = areYouOkSubscription.subscription(() => {
      form.validateFields().then(() => {
          iAmOkSubscription.next(StepIndexType.STEP_1)
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

  const accountValidator = async (rule: RuleObject, value: string): Promise<void> => {
    if (value.length < 3) {
      throw new Error("账号不能小于3位")
    } else {
      const isUser = await hasUser(value)
      if (isUser.hasUser) throw new Error("账号已存在")
    }
  }

  const passwordValidator = async (rule: RuleObject, value: string): Promise<void> => {
    if (value.length < 8) {
      throw new Error("密码不能小于8位")
    }
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
        rules={[{required: true, message: '账号不能为空'}, {validator:  accountValidator}]}
      >
        <Input
          minLength={3}
        />
      </Form.Item>
      <Form.Item
        label='密码'
        name='password'
        rules={[{required: true, message: '密码不能为空'}, {validator: passwordValidator}]}
      >
        <Input
          minLength={8}
          type='password'
        />
      </Form.Item>
    </Form>
  )
}

export default CreateAccountForm

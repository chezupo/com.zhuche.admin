import React, { useState } from 'react'
import { Button, Checkbox, Form, Input, message, Spin } from 'antd'
import { gql } from '@apollo/client'
import style from './style.module.less'
import apolloClient from '@/util/apolloClient'
import store from '@/store'
import { loginThunk, MeType } from '@/store/modules/me'
import { useNavigate } from 'react-router-dom'

const LOGIN_MUTATION = gql`
    mutation($input: AuthorizationInput!) {
      authorize(input: $input) {
        tokenType
        expiredAt
        accessToken
      }
    }
  `;
const UsernameLoginForm: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const navigator = useNavigate()
  const onFinish = async (values: {password: string; username: string}) => {
    try {
      setLoading(true)
      const { data, errors } = await  apolloClient.mutate({
        mutation: LOGIN_MUTATION,
        variables: { input: { username: values.username, password: values.password } }
      })
      const meInfo: MeType = {
        isLogin: false,
        accessToken: data.authorize.accessToken,
        expiredAt: data.authorize.expiredAt
      }
      await store.dispatch(loginThunk(meInfo))
      message.success("登录成功🎉🎉🎉")
      setTimeout(() => {
        setLoading(false)
        navigator('/dashboard')
      }, 1000)
    }catch (e) {
      setLoading(false)
    }
  }


    return (
    <Spin spinning={loading}>
    <Form
      name="basic"
      style={{width: '15rem'}}
      wrapperCol={{ span: 24 }}
      initialValues={{ remember: true, username: 'admin', password: '12345678' }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item name='username' rules={[{ required: true, message: '请输入你的账号或手机号' }]} >
        <Input placeholder='用户名或手机号'/>
      </Form.Item>

      <Form.Item name='password' rules={[{ required: true, message: '请输入你的密码' }]} >
        <Input.Password placeholder='密码' />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked" >
        <div className={style.rememberMeWrapper}>
          <Checkbox>自动登录</Checkbox>
          <div>忘记密码</div>
        </div>
      </Form.Item>

      <Form.Item wrapperCol={{span: 24}}>
        <Button type="primary" htmlType="submit"  style={{width: '100%'}}>登录</Button>
      </Form.Item>
    </Form>
    </Spin>
  );
}

export default UsernameLoginForm;

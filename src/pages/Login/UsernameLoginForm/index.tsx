import React from 'react'
import { Button, Checkbox, Form, Input, message, Spin } from 'antd'
import { gql, useMutation } from '@apollo/client'
import style from './style.module.less'
import { useNavigate } from 'react-router-dom'

const UsernameLoginForm: React.FC = () => {
  const LOGIN_MUTATION = gql`
    mutation($input: AuthorizationInput!) {
      authorize(input: $input) {
        tokenType
        expiredAt
        accessToken
      }
    }
  `;
  const [mutationFun, {data, loading, error }] = useMutation(LOGIN_MUTATION);
  const navigater = useNavigate()
  if (!loading && error) {
    message.error('登录失败,账号或密码不正确');
  } else if(data) {
    navigater('/dashboard')
  }
  const onFinish = (values: {password: string; username: string}) => {
    mutationFun({ variables: { input: {
          username: values.username,
          password: values.password
        }}})
    console.log('Success:', values);
  };

  return (
    <Spin spinning={loading}>
    <Form
      name="basic"
      style={{width: '15rem'}}
      wrapperCol={{ span: 24 }}
      initialValues={{ remember: true }}
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

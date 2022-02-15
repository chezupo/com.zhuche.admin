import React, {useState} from 'react'
import {Button, Checkbox, Form, Input, message, Spin} from 'antd'
import style from './style.module.less'
import store from '@/store'
import {loginThunk} from '@/store/modules/me'
import {useNavigate} from 'react-router-dom'

const UsernameLoginForm: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const navigator = useNavigate()
  const onFinish = async (account: {password: string; username: string}) => {

    try {
      setLoading(true)
      await store.dispatch(loginThunk(account.username, account.password))
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

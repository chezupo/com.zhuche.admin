import React from 'react'
import style from './style.module.less'
import Header from '@/pages/Login/Header'
import {Tabs} from 'antd'
import UsernameLoginForm from '@/pages/Login/UsernameLoginForm'

const { TabPane } = Tabs;
const Login: React.FC = () => {
  return (<div className={style.main}>
    <Header />

    <div className={style.formWrapper}>
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="账号密码登录" key="1">
          <UsernameLoginForm />
        </TabPane>
        <TabPane tab="手机号登录" key="2">
          Content of Tab Pane 2
        </TabPane>
      </Tabs>
    </div>

  </div>)
}

export default Login

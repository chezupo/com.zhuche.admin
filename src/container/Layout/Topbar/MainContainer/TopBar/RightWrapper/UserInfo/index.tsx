import React from 'react'
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {Dropdown, Menu, message} from "antd";
import style from "./style.module.less"
import {DownOutlined} from '@ant-design/icons';
import {logoutThunk} from "@/store/modules/me";
import {useNavigate} from "react-router-dom";

const UserInfo: React.FC = () => {
  const username = useAppSelector(state =>state.me.username)
  const dispatch = useAppDispatch()
  const navigator = useNavigate()
  const handleLogout = () => {
    dispatch(logoutThunk()).then(() => {
      message.success({duration: 5000, content: '您已经退出 🎉 🎉 🎉'})
      navigator('/login')
    })
  }
  const menu = (
    <Menu>
      <Menu.Item
        key="1"
        onClick={handleLogout}

      >

        <a>退出登录</a>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} placement="bottomLeft" arrow>
      <div className={style.main}>
        {username}
        <DownOutlined />
      </div>
    </Dropdown>
  )
}

export default UserInfo


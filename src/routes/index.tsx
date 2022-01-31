import { RouteObject } from 'react-router-dom'
import React from 'react'
import Login from '@/pages/Login'
import LayoutOld from '@/container/LayoutOld'
import Layout from '@/container/Layout'
import Tmp from '@/pages/Tmp'
import Dashboard from '@/pages/Dashboard'
import { AiOutlineDashboard } from 'react-icons/ai'
import FontIcon from '@/components/FontIcon'
import style from '@/container/Layout/SideBar/NavigationBar/style.module.less'

export type MenuItemType = {
  name: string;
  hideInMenu: boolean;
  icon: React.ReactElement
  children: MenuItemType[]
} & RouteObject

const routes:  (Partial<MenuItemType> & RouteObject) [] = [
  {path: '/', element: <LayoutOld />, hideInMenu: true, children: [] },
  {path: '/layout', element: <Layout/>, hideInMenu: true, children: []},
  {path: '/dashboard', element: <Dashboard />, icon: <AiOutlineDashboard className={style.icon}/> , name: '仪表盘', children: []},
  {path: '/orders', element: <Dashboard />, icon: <FontIcon name='icon-order' className={style.icon}/> , name: '订单', children: []},
  {path: '/login', element: <Login />, hideInMenu: true, children: []},
  {path: '/tmp', element: <Tmp/>, hideInMenu: true, children: []},
]

export const getMenu = (children?:MenuItemType[]): MenuItemType[] => {
  const routeMenus = children ? children : routes

  return routeMenus.filter(route =>  !route.hideInMenu)
    .map(route => {
      if (route.children && route.children.length > 0) {
        route.children = getMenu(route.children as MenuItemType[] )
      }

      return route as MenuItemType
    })
}

export default routes

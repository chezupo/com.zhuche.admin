import { RouteObject } from 'react-router-dom'
import React from 'react'
import Login from '@/pages/Login'
import LayoutOld from '@/container/LayoutOld'
import Layout from '@/container/Layout'
import Tmp from '@/pages/Tmp'
import Dashboard from '@/pages/Dashboard'
import { AiOutlineDashboard } from 'react-icons/ai'
import FontIcon from '@/components/FontIcon'
import style from '@/styles/global.module.less'
import Order1 from '@/pages/order/Order1'
import Order2 from '@/pages/order/Order2'
import Banner from '@/pages/Banner'
import {BiSlideshow} from 'react-icons/bi'

export type MenuItemType = {
  name: string;
  hideInMenu: boolean;
  icon: React.ReactElement
  children: MenuItemType[]
} & RouteObject

const routes:  (Partial<MenuItemType> & RouteObject) [] = [
  {path: '/', element: <LayoutOld />, hideInMenu: true, children: [] },
  {path: '/layout', element: <Layout/>, hideInMenu: true, children: []},
  {path: '/', element: <Layout/>, icon: <AiOutlineDashboard className={style.icon}/> , name: '仪表盘', children: [
      {path: 'dashboard', element: <Dashboard />, icon: <AiOutlineDashboard className={style.navIcon}/> , hideInMenu: false, name: '仪表盘', children: [ ]},
    ]},
  {path: '/orders',hideInMenu: false, element: <Layout/>, icon: <FontIcon name='icon-order' className={style.navIcon}/> , name: '订单', children: [
      {path: 'order1', element: <Order1/>, icon: <AiOutlineDashboard className={style.navIcon}/> , hideInMenu: false, name: '订单1', children: [ ]},
      {path: 'order2', element: <Order2/>, icon: <AiOutlineDashboard className={style.navIcon}/> , hideInMenu: false, name: '订单2', children: [ ]},
    ]},
  {path: '/',hideInMenu: false, element: <Layout/>, icon: <FontIcon name='icon-order' className={style.navIcon}/> , name: '', children: [
      {path: 'banners', element: <Banner/>, icon: <BiSlideshow className={style.navIcon}/> , hideInMenu: false, name: '幻灯片管理', children: [ ]},
    ]},
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

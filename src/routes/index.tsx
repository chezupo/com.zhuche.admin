import { RouteObject } from 'react-router-dom'
import React from 'react'
import Login from '@/pages/Login'
import LayoutOld from '@/container/LayoutOld'
import Layout from '@/container/Layout'
import Dashboard from '@/pages/Dashboard'
import { AiOutlineComment, AiOutlineDashboard } from 'react-icons/ai'
import FontIcon from '@/components/FontIcon'
import style from '@/styles/global.module.less'
import Order1 from '@/pages/order/Order1'
import Order2 from '@/pages/order/Order2'
import Banner from '@/pages/Banner'
import { BiSlideshow } from 'react-icons/bi'
import { FiSettings } from 'react-icons/fi'
import { BsShop } from 'react-icons/bs'
import { RiGuideFill } from 'react-icons/ri'
import BaseSetting from '@/pages/setting/BaseSetting'
import Store from '@/pages/store'
import BaseInfor from '@/pages/store/BaseInfor'
import StoreReturnGuids from '@/pages/store/StoreReturnGuids'

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
  {path: '/stores',hideInMenu: false, element: <Layout/>, icon: <BsShop className={style.navIcon}/> , name: '门店管理', children: [
      {path: '', element: <BaseInfor/>, icon: <BsShop className={style.navIcon}/> , hideInMenu: false, name: '基本信息', children: [ ]},
      {path: 'pickupGuid', element: <StoreReturnGuids/>, icon: <RiGuideFill className={style.navIcon}/> , hideInMenu: false, name: '取车/还车指引', children: [ ]},
      {path: 'commonts', element: <Store/>, icon: <AiOutlineComment className={style.navIcon}/> , hideInMenu: false, name: '门店评论', children: [ ]},
    ]},
  {path: '/orders',hideInMenu: false, element: <Layout/>, icon: <FontIcon name='icon-order' className={style.navIcon}/> , name: '订单', children: [
      {path: 'order1', element: <Order1/>, icon: <AiOutlineDashboard className={style.navIcon}/> , hideInMenu: false, name: '订单1', children: [ ]},
      {path: 'order2', element: <Order2/>, icon: <AiOutlineDashboard className={style.navIcon}/> , hideInMenu: false, name: '订单2', children: [ ]},
    ]},
  {path: '/',hideInMenu: false, element: <Layout/>, icon: <FontIcon name='icon-order' className={style.navIcon}/> , name: '', children: [
      {path: 'banners', element: <Banner/>, icon: <BiSlideshow className={style.navIcon}/> , hideInMenu: false, name: '幻灯片管理', children: [ ]},
    ]},

  {path: '/setting',hideInMenu: false, element: <Layout/>, icon: <FiSettings name='icon-order' className={style.navIcon}/> , name: '系统设置', children: [
      {path: 'base', element: <BaseSetting/>, icon: <FontIcon name='icon-navicon-jbxxsz' className={style.navIcon}/> , hideInMenu: false, name: '基础设置', children: [ ]},
      {path: 'agreement', element: <Banner/>, icon: <FontIcon name='icon-hetong6' className={style.navIcon}/> , hideInMenu: false, name: '协议管理', children: [ ]},
    ]},

  {path: '/login', element: <Login />, hideInMenu: true, children: []},
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

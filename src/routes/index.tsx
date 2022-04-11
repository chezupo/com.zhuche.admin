import {RouteObject} from 'react-router-dom'
import React from 'react'
import Login from '@/pages/Login'
import Layout from '@/container/Layout'
import Dashboard from '@/pages/Dashboard'
import {AiOutlineComment, AiOutlineDashboard} from 'react-icons/ai'
import FontIcon from '@/components/FontIcon'
import style from '@/styles/global.module.less'
import Order1 from '@/pages/order/Order1'
import Order2 from '@/pages/order/Order2'
import Banner from '@/pages/Banner'
import {BiSlideshow} from 'react-icons/bi'
import {FiSettings} from 'react-icons/fi'
import {BsShop} from 'react-icons/bs'
import BaseSetting from '@/pages/setting/BaseSetting'
import Store from '@/pages/store'
import BaseInfor from '@/pages/store/BaseInfor'
import {RoleType} from "@/store/modules/me";
import NotFound from "@/pages/NotFound";
import Brand from "@/pages/Car/Brand";
import Home from "@/pages/Home";
import Config from "@/pages/Car/Config";
import Log from "@/pages/setting/Log";
import Car from "@/pages/Car/Car";
import Category from "@/pages/Car/Category";
import Insurance from "@/pages/Insurance";

export type MenuItemType = {
  name: string;
  hideInMenu: boolean;
  icon: React.ReactElement
  children: MenuItemType[]
  roles?: RoleType[];
} & RouteObject

const routes:  (Partial<MenuItemType> & RouteObject) [] = [
  {
    path: '/',
    element: <Home/>,
    hideInMenu: true,
    children: []
  },
  {
    path: '/layout',
    element: <Layout/>,
    hideInMenu: true,
    children: []
  },
  {
    path: '/',
    element: <Layout/>,
    icon: <AiOutlineDashboard className={style.icon}/> ,
    name: '仪表盘', children: [
      {path: 'dashboard',
        element: <Dashboard />,
        icon: <AiOutlineDashboard className={style.navIcon}/> ,
        hideInMenu: false,
        name: '仪表盘', children: [ ]},
    ]
  },
  {
    path: '/stores',
    hideInMenu: false,
    element: <Layout/>,
    icon: <BsShop className={style.navIcon}/> ,
    name: '门店管理',
    children: [
      {
        path: '',
        element: <BaseInfor/>,
        icon: <BsShop className={style.navIcon}/> ,
        hideInMenu: false,
        name: '门店管理',
        children: [ ]
      },
      {
        path: 'comments',
        element: <Store/>,
        icon: <AiOutlineComment className={style.navIcon}/> ,
        hideInMenu: false,
        name: '门店评论',
        children: [ ]
      },
    ]
  },
  {
    path: '/orders',
    hideInMenu: false,
    element: <Layout/>,
    icon: <FontIcon name='order' className={style.navIcon}/> ,
    name: '订单管理', children: [
      {
        path: 'order1',
        element: <Order1/>,
        icon: <AiOutlineDashboard className={style.navIcon}/> ,
        hideInMenu: false,
        name: '订单1',
        children: [ ]
      },
      {
        path: 'order2',
        element: <Order2/>,
        icon: <AiOutlineDashboard className={style.navIcon}/> ,
        hideInMenu: false,
        name: '订单2',
        children: [ ]
      },
    ]},
  {
    path: '/cars',
    hideInMenu: false,
    element: <Layout/>,
    icon: <FontIcon name='car' className={style.navIcon}/> ,
    name: '汽车管理',
    roles: [RoleType.ROLE_BUSINESS, RoleType.ROLE_ADMIN],
    children: [
      {
        path: 'cars',
        element: <Car/> ,
        icon: <FontIcon name='car' className={style.navIcon}/> ,
        hideInMenu: false,
        name: '汽车管理',
        children: [ ]
      },
      {
        path: 'brands',
        element: <Brand />,
        icon: <FontIcon name='brand' className={style.navIcon}/> ,
        hideInMenu: false,
        name: '品牌车系',
        roles: [RoleType.ROLE_BUSINESS, RoleType.ROLE_ADMIN],
        children: [ ]
      },
      {
        path: 'cofnig',
        element: <Config />,
        icon: <FontIcon name='config' className={style.navIcon}/> ,
        hideInMenu: false,
        name: '配置管理',
        roles: [RoleType.ROLE_BUSINESS, RoleType.ROLE_ADMIN],
        children: [ ]
      },
      {
        path: 'categories',
        element: <Category />,
        icon: <FontIcon name='category' className={style.navIcon}/> ,
        hideInMenu: false,
        name: '分类管理',
        roles: [RoleType.ROLE_BUSINESS, RoleType.ROLE_ADMIN],
        children: [ ]
      }
    ]
  },
  {
    path: '/',
    hideInMenu: false,
    element: <Layout/>,
    icon: <FontIcon name='order' className={style.navIcon}/> ,
    name: '',
    children: [
      {path: 'banners',
        element: <Banner/>,
        icon: <BiSlideshow className={style.navIcon}/> ,
        hideInMenu: false,
        name: '幻灯片管理',
        roles: [RoleType.ROLE_ADMIN],
        children: [ ]

      },
    ]
  },
  {
    path: '/',
    hideInMenu: false,
    element: <Layout/>,
    icon: <FontIcon name='insurance' className={style.navIcon}/> ,
    name: '',
    children: [
      {path: 'insurance',
        element: <Insurance />,
        icon: <FontIcon name='insurance' className={style.navIcon}/> ,
        hideInMenu: false,
        name: '驾无忧管理',
        roles: [RoleType.ROLE_ADMIN],
        children: [ ]
      },
    ]
  },

  {
    path: '/setting',
    hideInMenu: false,
    element: <Layout/>,
    icon: <FiSettings name='icon-order' className={style.navIcon}/> ,
    name: '系统设置',
    children: [
      {path: 'base',
        element: <BaseSetting/>,
        icon: <FontIcon name='nav' className={style.navIcon}/> ,
        hideInMenu: false,
        name: '基础设置',
        children: [ ]
      },
      {
        path: 'agreement',
        element: <Banner/>,
        icon: <FontIcon name='hetong' className={style.navIcon}/> ,
        hideInMenu: false,
        name: '协议管理',
        children: [ ]
      },
      {
        path: 'logs',
        element: <Log />,
        icon: <FontIcon name='log' className={style.navIcon}/> ,
        hideInMenu: false,
        name: '操作日志',
        children: [ ]
      },
    ],
    roles: [RoleType.ROLE_ADMIN]
  },

  {
    path: '/login',
    element: <Login />,
    hideInMenu: true,
    children: []
  },
  {
    path: '/*',
    element: <NotFound /> ,
    hideInMenu: true,
    children: []
  }
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

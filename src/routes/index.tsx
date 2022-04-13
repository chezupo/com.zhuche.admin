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
import Insurance from "@/pages/setting/Insurance";
import Agreement from "@/pages/setting/Agreement";

export type MenuItemType = {
  name: string;
  hideInMenu?: boolean;
  icon: React.ReactElement
  children?: MenuItemType[]
  roles?: RoleType[];
} & RouteObject

const routes:  (Partial<MenuItemType> & RouteObject) [] = [
  {
    path: '/',
    element: <Home/>,
    hideInMenu: true,
  },
  {
    path: '/layout',
    element: <Layout/>,
    hideInMenu: true,
  },
  {
    path: '/',
    element: <Layout/>,
    icon: <AiOutlineDashboard className={style.icon}/> ,
    name: '仪表盘', children: [
      {path: 'dashboard',
        element: <Dashboard />,
        icon: <AiOutlineDashboard className={style.navIcon}/> ,
        name: '仪表盘'},
    ]
  },
  {
    path: '/stores',
    element: <Layout/>,
    icon: <BsShop className={style.navIcon}/> ,
    name: '门店管理',
    children: [
      {
        path: '',
        element: <BaseInfor/>,
        icon: <BsShop className={style.navIcon}/> ,
        name: '门店管理',
      },
      {
        path: 'comments',
        element: <Store/>,
        icon: <AiOutlineComment className={style.navIcon}/> ,
        name: '门店评论',
      },
    ]
  },
  {
    path: '/orders',
    element: <Layout/>,
    icon: <FontIcon name='order' className={style.navIcon}/> ,
    name: '订单管理', children: [
      {
        path: 'order1',
        element: <Order1/>,
        icon: <AiOutlineDashboard className={style.navIcon}/> ,
        name: '订单1',
      },
      {
        path: 'order2',
        element: <Order2/>,
        icon: <AiOutlineDashboard className={style.navIcon}/> ,
        name: '订单2',
      },
    ]},
  {
    path: '/cars',
    element: <Layout/>,
    icon: <FontIcon name='car' className={style.navIcon}/> ,
    name: '汽车管理',
    roles: [RoleType.ROLE_BUSINESS, RoleType.ROLE_ADMIN],
    children: [
      {
        path: 'cars',
        element: <Car/> ,
        icon: <FontIcon name='car' className={style.navIcon}/> ,
        name: '汽车管理',
      },
      {
        path: 'brands',
        element: <Brand />,
        icon: <FontIcon name='brand' className={style.navIcon}/> ,
        name: '品牌车系',
        roles: [RoleType.ROLE_BUSINESS, RoleType.ROLE_ADMIN],
      },
      {
        path: 'cofnig',
        element: <Config />,
        icon: <FontIcon name='config' className={style.navIcon}/> ,
        name: '配置管理',
        roles: [RoleType.ROLE_BUSINESS, RoleType.ROLE_ADMIN],
      },
      {
        path: 'categories',
        element: <Category />,
        icon: <FontIcon name='category' className={style.navIcon}/> ,
        name: '分类管理',
        roles: [RoleType.ROLE_BUSINESS, RoleType.ROLE_ADMIN],
      }
    ]
  },
  {
    path: '/',
    element: <Layout/>,
    icon: <FontIcon name='order' className={style.navIcon}/> ,
    name: '',
    children: [
      {path: 'banners',
        element: <Banner/>,
        icon: <BiSlideshow className={style.navIcon}/> ,
        name: '幻灯片管理',
        roles: [RoleType.ROLE_ADMIN],

      },
    ]
  },
  {
    path: '/setting',
    element: <Layout/>,
    icon: <FiSettings name='icon-order' className={style.navIcon}/> ,
    name: '系统设置',
    children: [
      {path: 'base',
        element: <BaseSetting/>,
        icon: <FontIcon name='nav' className={style.navIcon}/> ,
        name: '基础设置',
      },
      {path: 'insurance',
        element: <Insurance />,
        icon: <FontIcon name='insurance' className={style.navIcon}/> ,
        name: '驾无忧价格',
        roles: [RoleType.ROLE_ADMIN],
      },
      {
        path: 'agreement',
        element: <Agreement />,
        icon: <FontIcon name='hetong' className={style.navIcon}/> ,
        name: '协议管理',
      },
      {
        path: 'logs',
        element: <Log />,
        icon: <FontIcon name='log' className={style.navIcon}/> ,
        name: '操作日志',
      },
    ],
    roles: [RoleType.ROLE_ADMIN]
  },

  {
    path: '/login',
    element: <Login />,
    hideInMenu: true,
  },
  {
    path: '/*',
    element: <NotFound /> ,
    hideInMenu: true,
  }
]

export const getMenu = (children?:MenuItemType[]): MenuItemType[] => {
  const routeMenus = children ? children : routes

  return routeMenus.filter(route => !route.hideInMenu)
    .map(route => {
      if (route.children && route.children.length > 0) {
        route.children = getMenu(route.children as MenuItemType[] )
      }
      if (!route.children) route.children = []

      return route as MenuItemType
    })
}

export default routes

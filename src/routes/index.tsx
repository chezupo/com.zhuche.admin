import {RouteObject} from 'react-router-dom'
import React from 'react'
import Login from '@/pages/Login'
import Layout from '@/container/Layout'
import Dashboard from '@/pages/Dashboard'
import {AiOutlineComment, AiOutlineDashboard} from 'react-icons/ai'
import FontIcon from '@/components/FontIcon'
import style from '@/styles/global.module.less'
import Order from '@/pages/order/Order'
import Banner from '@/pages/Banner'
import {BiSlideshow} from 'react-icons/bi'
import {FiSettings} from 'react-icons/fi'
import {BsShop} from 'react-icons/bs'
import BaseSetting from '@/pages/setting/BaseSetting'
import BaseInfor from '@/pages/store/BaseInfor'
import NotFound from "@/pages/NotFound";
import Brand from "@/pages/Car/Brand";
import Home from "@/pages/Home";
import Config from "@/pages/Car/Config";
import Log from "@/pages/setting/Log";
import Car from "@/pages/Car/Car";
import Category from "@/pages/Car/Category";
import Agreement from "@/pages/setting/Agreement";
import Holiday from "@/pages/Coupon/Holiday";
import Coupon from "@/pages/Coupon/Coupon";
import AlipayUser from "@/pages/User/AlipayUser";
import UserCoupon from "@/pages/Coupon/UserCoupon";
import TransactionPage from "@/pages/finance/TransactionPage";
import WithdrawPage from "@/pages/finance/WithdrawPage";
import StoreCommentPage from "@/pages/store/StoreCommentPage";
import FeedbackPage from "@/pages/FeedbackPage";
import ViolationPage from "@/pages/order/ViolationPage";
import PromotionSettingPage from "@/pages/promotion/PromotionSettingPage";
import PosterPage from "@/pages/promotion/PosterPage";

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
    name: '?????????', children: [
      {path: 'dashboard',
        element: <Dashboard />,
        icon: <AiOutlineDashboard className={style.navIcon}/> ,
        name: '?????????'},
    ]
  },
  {
    path: '/stores',
    element: <Layout/>,
    icon: <BsShop className={style.navIcon}/> ,
    name: '????????????',
    children: [
      {
        path: '',
        element: <BaseInfor/>,
        icon: <BsShop className={style.navIcon}/> ,
        name: '????????????',
      },
      {
        path: 'comments',
        element: <StoreCommentPage />,
        icon: <AiOutlineComment className={style.navIcon}/> ,
        name: '????????????',
      },
    ]
  },
  {
    path: '/',
    element: <Layout/>,
    icon: <BsShop className={style.navIcon}/> ,
    roles: ['ROLE_ADMIN', 'ROLE_BUSINESS'],
    name: '????????????',
    children: [
      {
        path: 'users/alipayUser',
        element: <AlipayUser/>,
        icon: <FontIcon name='alipay' className={style.navIcon}/> ,
        name: '???????????????',
      }
    ]
  },
  {
    path: '/',
    element: <Layout/>,
    icon: <FontIcon name='order' className={style.navIcon}/> ,
    name: '????????????', children: [
      {
        path: 'orders',
        element: <Order/>,
        icon: <FontIcon name='order' className={style.navIcon}/> ,
        name: '????????????',
      },
      {
        path: 'violations',
        element: <ViolationPage/>,
        icon: <FontIcon name='violation' />,
        name: '????????????',
      },
    ]},
  {
    path: '/cars',
    element: <Layout/>,
    icon: <FontIcon name='car' className={style.navIcon}/> ,
    name: '????????????',
    roles: ['ROLE_BUSINESS', 'ROLE_ADMIN'],
    children: [
      {
        path: 'cars',
        element: <Car/> ,
        icon: <FontIcon name='car' className={style.navIcon}/> ,
        name: '????????????',
      },
      {
        path: 'brands',
        element: <Brand />,
        icon: <FontIcon name='brand' className={style.navIcon}/> ,
        name: '????????????',
        roles: ['ROLE_BUSINESS', 'ROLE_ADMIN'],
      },
      {
        path: 'cofnig',
        element: <Config />,
        icon: <FontIcon name='config' className={style.navIcon}/> ,
        name: '????????????',
        roles: ['ROLE_BUSINESS', 'ROLE_ADMIN'],
      },
      {
        path: 'categories',
        element: <Category />,
        icon: <FontIcon name='category' className={style.navIcon}/> ,
        name: '????????????',
        roles: ['ROLE_BUSINESS', 'ROLE_ADMIN'],
      }
    ]
  },
  {
    name: '???????????????',
    path: '/coupon',
    element: <Layout />,
    roles: ['ROLE_ADMIN'],
    icon: <FontIcon name='coupon' />,
    children: [
      {
        path: 'coupon',
        name: '???????????????',
        icon: <FontIcon name='coupon' />,
        element: <Coupon />
      },
      {
        path: 'userCoupons',
        name: '???????????????',
        icon: <FontIcon name='userCoupon' />,
        element: <UserCoupon />
      },
      {
        path: 'holiday',
        name: '???????????????',
        icon: <FontIcon name='holiday' />,
        element: <Holiday />
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
        name: '???????????????',
        roles: ['ROLE_ADMIN'],

      },
    ]
  },
  {
    path: '/finance',
    element: <Layout/>,
    icon: <FontIcon name='finance' className={style.navIcon}/> ,
    name: '????????????',
    children: [
      {path: 'transaction',
        element: <TransactionPage />,
        icon: <FontIcon name='transaction' className={style.navIcon}/> ,
        name: '????????????',
        roles: ['ROLE_ADMIN']
      },
      {path: 'withdraw',
        element: <WithdrawPage />,
        icon: <FontIcon name='withdraw' className={style.navIcon}/> ,
        name: '????????????',
        roles: ['ROLE_ADMIN']
      }
    ],
    roles: ['ROLE_ADMIN']
  },
  {
    path: '/promotion',
    element: <Layout/>,
    icon: <FontIcon name='promotion' />,
    name: '????????????',
    children: [
      { path: 'setting',
        element: (<PromotionSettingPage />),
        icon: <FontIcon name='promotion' className={style.navIcon}/> ,
        name: '????????????',
        roles: ['ROLE_ADMIN']
      },
      { path: 'posters',
        element: (<PosterPage />),
        icon: <FontIcon name='poster' className={style.navIcon}/> ,
        name: '????????????',
        roles: ['ROLE_ADMIN']
      }
    ],
    roles: ['ROLE_ADMIN']
  },
  {
    path: '/setting',
    element: <Layout/>,
    icon: <FiSettings name='icon-order' className={style.navIcon}/> ,
    name: '????????????',
    children: [
      {path: 'base',
        element: <BaseSetting/>,
        icon: <FontIcon name='nav' className={style.navIcon}/> ,
        name: '????????????',
      },
      {
        path: 'agreement',
        element: <Agreement />,
        icon: <FontIcon name='hetong' className={style.navIcon}/> ,
        name: '????????????',
      },
      {
        path: 'logs',
        element: <Log />,
        icon: <FontIcon name='log' className={style.navIcon}/> ,
        name: '????????????',
      },
    ],
    roles: ['ROLE_ADMIN']
  },
  {
    path: '/',
    element: <Layout/>,
    icon: <FiSettings name='icon-order' className={style.navIcon}/> ,
    name: '????????????',
    children: [
      {path: 'feedbacks',
        element: (<FeedbackPage/>),
        icon: <FontIcon name='feedback' className={style.navIcon}/> ,
        name: '????????????',
        roles: ['ROLE_ADMIN']
      }
    ],
    roles: ['ROLE_ADMIN']
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

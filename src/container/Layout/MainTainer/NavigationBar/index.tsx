import React, { useEffect, useRef, useState } from 'react'
import style from './style.module.less'
import { HiOutlineChevronLeft } from 'react-icons/hi'
import { useObserve } from '@wuchuheng/rxjs'
import { getMenu, MenuItemType } from '@/routes'
import { toggleObserve } from '@/store'
import { useLocation, useNavigate, useParams, useRoutes } from 'react-router-dom'
import ListRender from '@/container/Layout/MainTainer/NavigationBar/ListRender'

const NavigationBar: React.FC = () => {
  const menus: MenuItemType[] = getMenu()
  const [toggle] = useObserve(toggleObserve)

  return (
    <div className={[
      style.main,
      toggle ? style.active : ''
    ].join(' ')}>
      <ul className={style.ul}>
        {menus.map((menu, key) => (
          <ListRender data={menu} key={menu.path} level={1} prefix={''}/>
        ))}
      </ul>
    </div>
  )
}

export default NavigationBar

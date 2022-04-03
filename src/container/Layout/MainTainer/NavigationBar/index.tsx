import React, {useContext} from 'react'
import style from './style.module.less'
import {getMenu, MenuItemType} from '@/routes'
import ListRender from '@/container/Layout/MainTainer/NavigationBar/ListRender'
import store from '@/store'
import {save} from '@/store/modules/activeRoute'
import {FoldContext} from "@/container/Layout";
import {TopBarPropsType} from "@/container/Layout/Topbar/MainContainer/TopBar";

const NavigationBar: React.FC<TopBarPropsType> = props => {
  const menus: MenuItemType[] = getMenu()
  const toggle = useContext(FoldContext)
  const handleMatch = (name: string) => store.dispatch(save({name}))

  return (
    <div className={[
      style.main,
      !toggle ? style.active : ''
    ].join(' ')}>
      <ul className={style.ul}>
        {menus.map((menu, key) => (
          <ListRender
            data={menu}
            key={key}
            level={1}
            prefix={''}
            onMatch={handleMatch}
            {...props}
          />
        ))}
      </ul>
    </div>
  )
}

export default NavigationBar

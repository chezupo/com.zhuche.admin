import React from 'react'
import style from './style.module.less'
import { useObserve } from '@wuchuheng/rxjs'
import { getMenu, MenuItemType } from '@/routes'
import { toggleObserve } from '@/store/toggleObserve'
import ListRender from '@/container/Layout/MainTainer/NavigationBar/ListRender'
import store from '@/store'
import { save } from '@/store/modules/activeRoute'

const NavigationBar: React.FC = () => {
  const menus: MenuItemType[] = getMenu()
  const [toggle] = useObserve(toggleObserve)
  const handleMatch = (name: string) => store.dispatch(save({name}))

  return (
    <div className={[
      style.main,
      toggle ? style.active : ''
    ].join(' ')}>
      <ul className={style.ul}>
        {menus.map((menu, key) => (
          <ListRender data={menu} key={key} level={1} prefix={''}
                      onMatch={handleMatch}
          />
        ))}
      </ul>
    </div>
  )
}

export default NavigationBar

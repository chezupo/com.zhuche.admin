import React from 'react'
import style from './style.module.less'
import {AiOutlineMenuFold,
  AiOutlineMenuUnfold
} from 'react-icons/ai'
import { useObserve } from '@wuchuheng/rxjs'
import { toggleObserve } from '@/store'
import Search from './Search'
import UserInfo from '@/container/Layout/MainContainer/TopBar/RightWrapper'

const TopBar: React.FC = () => {
  const [toggle, toggleDispatcher] = useObserve(toggleObserve)
  const handleToggle = (): void => {
    toggleDispatcher.next(!toggle)
  }
  const MenuFold: React.FC = () => {
    return (
      <>
        { toggle && <AiOutlineMenuUnfold
          className={style.icon}
          onClick={handleToggle}
        />
        }
        { !toggle &&
        <AiOutlineMenuFold
          className={style.icon}
          onClick={handleToggle}
        />
        }
      </>
    )
  }
  return (
    <div className={style.main}>
      <MenuFold />
      <Search />
      <UserInfo/>
    </div>
  )
}

export default TopBar

import React, {useContext} from 'react'
import style from './style.module.less'
import {AiOutlineMenuFold, AiOutlineMenuUnfold} from 'react-icons/ai'
import Search from './Search'
import UserInfo from '@/container/Layout/Topbar/MainContainer/TopBar/RightWrapper'
import {FoldContext} from "@/container/Layout";

export type TopBarPropsType = {
  onFold: (isFold: boolean) => void
}
const TopBar: React.FC<TopBarPropsType> = props => {
  const toggle = useContext(FoldContext)
  const handleToggle = (): void => {
    props.onFold(!toggle)
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

import React, {useContext} from 'react'
import style from './style.module.less'
import classNames from 'classnames'
import TopBar, {TopBarPropsType} from '@/container/Layout/Topbar/MainContainer/TopBar'
import {FoldContext} from "@/container/Layout";

type MainContainerPropsType = {
  onToggle?: () => void;
} & TopBarPropsType
const MainContainer: React.FC<MainContainerPropsType> = ({ onToggle , onFold}) => {
  const isFold = useContext(FoldContext)

  return (
    <div className={ classNames({
      [style.main]: true,
      [style.active]: !isFold
    })}>
      <TopBar onFold={onFold} />
    </div>
  )
}

export default MainContainer

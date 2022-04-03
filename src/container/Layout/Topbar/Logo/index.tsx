import React, {useContext, useEffect, useRef} from 'react'
import style from './style.module.less'
import classNames from 'classnames'
import {useAppSelector} from "@/store/hooks";
import {FoldContext} from "@/container/Layout";

const Logo: React.FC = () => {
  const configuration = useAppSelector(state => state.configuration);
  const avatar = `${configuration.imgPrefix}/${configuration.logo}`
  const mainRef = useRef<HTMLDivElement>(null)
  const isFold = useContext(FoldContext)
  const handleChangeClass = () => {
    if (isFold) {
      mainRef.current?.classList.remove(style.active)
    } else {
      mainRef.current?.classList.add(style.active)
    }
  }
  useEffect(() => {
    handleChangeClass()
  }, [isFold])
  useEffect(() => {
    handleChangeClass()
  }, [])

  return (
    <div className={[style.container].join(' ')} ref={mainRef}>
      <img src={avatar} />
      <h2>{configuration.appName}管理系统</h2>
    </div>
  )
}

const SideBar: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const toggle = useContext(FoldContext)

  return (
      <div className={classNames({
        [style.main]: true,
        [style.active]: !toggle
      })} ref={mainRef}>
        <Logo />
      </div>
  )
}

export default SideBar

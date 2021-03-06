import {MenuItemType} from '@/routes'
import React, {useContext, useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import style from './style.module.less'
import {HiOutlineChevronLeft} from 'react-icons/hi'
import {FoldContext} from "@/container/Layout";

type LiItemPropsType = {
  onClick: () => void;
  data: MenuItemType;
  level: number;
  isOpen: boolean;
  prefix: string;
  onMatch: (name: string) => void;
}

const LiItem: React.FC<LiItemPropsType> = ({onMatch, ...props}) => {
  const toggle = useContext(FoldContext)
  const location = useLocation()
  const myRoute = props.level === 1 ? props.prefix + props.data.path : props.prefix + '/' + props.data.path
  const currentRoute = location.pathname
  const isActive = myRoute === currentRoute
  const isParentRoute = currentRoute.match && !!(currentRoute.match(myRoute.replace(/\\/g, '/')))  && !isActive
  useEffect(() => {
    isActive && onMatch(props.data.name)
  }, [])

  return (
    <nav
      className={[
        style.liItem,
        isActive || (isParentRoute && !toggle) ? style.active : '',
        isParentRoute && !toggle ? style.activeParent : ''
      ].join(' ')}
      onClick={() => {onMatch(props.data.name); props.onClick()}}
      style={{
        paddingLeft: toggle ?  props.level + 'rem' : '0px'
      }}
    >
      {props.data?.children && props.data.children.length > 0 && (
        <>
          {props.data.icon }
          {toggle && (
            <>
              <span>{props.data.name}</span>
              <HiOutlineChevronLeft className={[style.icon, props.isOpen ? style.open : ''].join(' ')} />
            </>
          )}
        </>
      ) }
      {!props.data?.children || props.data.children.length === 0 && (
        <>
          {props.data.icon }
          {toggle && <span>{props.data.name}</span> }
        </>
      ) }

    </nav>
  )
}

export default LiItem

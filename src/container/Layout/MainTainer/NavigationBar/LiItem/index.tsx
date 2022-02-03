import { MenuItemType } from '@/routes'
import React, { useEffect } from 'react'
import { useObserve } from '@wuchuheng/rxjs'
import { toggleObserve } from '@/store/toggleObserve'
import { useLocation } from 'react-router-dom'
import style from './style.module.less'
import { HiOutlineChevronLeft } from 'react-icons/hi'

type LiItemPropsType = {
  onClick: () => void;
  data: MenuItemType;
  level: number;
  isOpen: boolean;
  prefix: string;
  onMatch: () => void;
}

const LiItem: React.FC<LiItemPropsType> = ({onMatch, ...props}) => {
  const [toggle] = useObserve(toggleObserve)
  const location = useLocation()
  const myRoute = props.level === 1 ? props.prefix + props.data.path : props.prefix + '/' + props.data.path
  const currentRoute = location.pathname
  const isActive = myRoute === currentRoute
  const isParentRoute = !!currentRoute.match(myRoute.replace(/\\/g, '/'))  && !isActive
  useEffect(() => {
    isParentRoute && onMatch()
  }, [])

  return (
    <a
      className={[
        style.liItem,
        isActive || (isParentRoute && toggle) ? style.active : '',
        isParentRoute && !toggle ? style.activeParent : ''
      ].join(' ')}
      onClick={props.onClick}
      style={{
        paddingLeft: !toggle ?  props.level + 'rem' : '0px'
      }}
    >
      {props.data?.children && props.data.children.length > 0 && (
        <>
          {props.data.icon }
          {!toggle && (
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
          {!toggle && <span>{props.data.name}</span> }
        </>
      ) }

    </a>
  )
}

export default LiItem

import React, { useEffect, useRef, useState } from 'react'
import style from './style.module.less'
import { HiOutlineChevronLeft } from 'react-icons/hi'
import { useObserve } from '@wuchuheng/rxjs'
import { getMenu, MenuItemType } from '@/routes'
import { toggleObserve } from '@/store'

type LiItemPropsType = {
  onClick: () => void;
  data: MenuItemType;
  level: number;
  isOpen: boolean;
}

const LiItem: React.FC<LiItemPropsType> = (props) => {
  const [toggle] = useObserve(toggleObserve)

  return (
    <a
      className={style.liItem}
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

type ListRenderPropsType = {
  data: MenuItemType;
  level: number
}
const ListRender: React.FC<ListRenderPropsType> = (props) =>  {
  const ulRef = useRef<HTMLUListElement>(null)
  const[isOpen, setIsOpen] = useState<boolean>(false)
  const [maxHeight, setMaxHeight] = useState<number>(0)
  const [toggle, toggleDispatcher] = useObserve(toggleObserve)
  useEffect(() => {
   isOpen && toggle && handleClose()
  } , [toggle])
  const handleClose = (): void => {
    ulRef.current?.classList.add(style.closeUl)
    ulRef.current?.classList.remove(style.openUl)
    setMaxHeight(0)
    setIsOpen(false)
  }
  const handleOpen = (): void => {
    setMaxHeight(500)
    ulRef.current?.classList.add(style.openUl)
    ulRef.current?.classList.remove(style.closeUl)
    setIsOpen(true)
  }
  const handleClick = (): void => {
    if (isOpen) {
      handleClose()
    } else {
      toggle && props.data.children.length > 0 && toggleDispatcher.next(false)
      handleOpen()
    }
  }

  return (
    <li >
      <LiItem
        onClick={handleClick}
        data={props.data}
        level={props.level}
        isOpen={isOpen}
      />
      {
        props.children && (
          <ul className={[style.subUl, style.closeUl].join(' ')} ref={ulRef}
              style={{ maxHeight: maxHeight + 'px', }}
          >
            {props.data.children.map((item, key) => (
              <ListRender data={item} key={item.path} level={props.level + 1}/>
            ))}
          </ul>
        )
      }
    </li>
  )
}
const NavigationBar: React.FC = () => {
  const menus: MenuItemType[] = getMenu()

  return (
    <ul className={style.main}>
      {menus.map((menu, key) => (
        <ListRender data={menu} key={menu.path} level={1}/>
      ))}
    </ul>
  )
}

export default NavigationBar

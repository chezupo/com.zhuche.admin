import React, { useEffect, useRef, useState } from 'react'
import { useObserve } from '@wuchuheng/rxjs'
import { toggleObserve } from '@/store'
import style from '@/container/Layout/MainTainer/NavigationBar/style.module.less'
import { useNavigate } from 'react-router-dom'
import { MenuItemType } from '@/routes'
import LiItem from '@/container/Layout/MainTainer/NavigationBar/LiItem'

export type ListRenderPropsType = {
  data: MenuItemType;
  level: number;
  prefix: string;
  onMatch?: () => void
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
  const isTopOneItem: boolean = props.data.children.length === 1 && props.data.children[0].children.length === 0
  const data = isTopOneItem ? props.data.children[0] : props.data;
  const prefix: string = isTopOneItem ? props.prefix + props.data.path : props.prefix
  const navigate = useNavigate();
  const handleClick = (): void => {
    if (isOpen) {
      handleClose()
    } else {
      toggle && props.data.children.length > 0 && toggleDispatcher.next(false)
      handleOpen()
    }
    if (data.children.length === 0) {
      const myRoute = prefix === '/' ? prefix + data.path : prefix + '/' + data.path
      navigate(myRoute)
    }
  }
  const handleMatch = () => {
    handleOpen()
    props.onMatch && props.onMatch()
  }

  return (
    <li >
      <LiItem
        onClick={handleClick}
        data={data}
        level={props.level}
        isOpen={isOpen}
        prefix={prefix}
        onMatch={handleMatch}
      />
      { !isTopOneItem &&
      props.data.children && (
        <ul className={[style.subUl, style.closeUl].join(' ')} ref={ulRef}
            style={{ maxHeight: maxHeight + 'px', }}
        >
          {props.data.children.map((item, key) => (
            <ListRender
              onMatch={handleMatch}
              data={item} key={item.path} level={props.level + 1} prefix={
              prefix.length === 0 ? '' + data.path : prefix + '/' + data.path
            }/>
          ))}
        </ul>
      )
      }
    </li>
  )
}

export default ListRender

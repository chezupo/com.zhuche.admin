import React from "react";
import style from './style.module.less'


type ContainerPropsType = {
  children: React.ReactNode | React.ReactChildren
  title: string
}
const Container: React.FC<ContainerPropsType> = props => {
  return (<>
    <div className={style.main}>
      <h3 className={style.title}>
        {props.title}
      </h3>
      <div className={style.line} />
      {props.children}
    </div>
  </>)
}

export default Container

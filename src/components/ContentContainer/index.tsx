import React, {ReactChild, ReactChildren, ReactNode} from "react";
import style from './style.module.less'

type ContentContainerPropsType = {
  children: ReactChild | ReactChildren | ReactNode[]
  classname?: string
}
const ContentContainer: React.FC<ContentContainerPropsType> = (props) => {
  return (
    <div className={[style.main, props.classname ? props.classname : ''].join(' ')}>
      {props.children}
    </div>
  )
}

export default ContentContainer

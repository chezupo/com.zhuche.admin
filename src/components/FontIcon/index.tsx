import React from 'react'

type FontIconPropsType = {
  className?: string;
  name: string
}
const FontIcon: React.FC<FontIconPropsType> = (props) => {
  return (
    <i className={[
      'iconfont',
      props.name,
      props.className ? props.className : ''
    ].join(' ')
    } ></i>

  )

}

export default FontIcon

import React from 'react'

type FontIconPropsType = {
  className?: string;
  name: 'order' | 'car' |  'nav' | 'hetong' | 'config' | 'brand' | 'plus' | 'log'
}
const FontIcon: React.FC<FontIconPropsType> = props => {
  return (
    <i className={[
      'iconfont',
      props.name ? `icon-${props.name}` : '',
      props.className || ''
    ].join(' ')
    } />
  )

}

export default FontIcon

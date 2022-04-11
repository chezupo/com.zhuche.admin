import React from 'react'

type FontIconPropsType = {
  className?: string;
  name: 'order' | 'car' |  'nav' | 'hetong' | 'config' | 'brand' | 'plus' | 'log' | 'category' | 'insurance'
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

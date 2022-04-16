import React from 'react'

type FontIconPropsType = {
  className?: string;
  name: 'order' |
    'car' |
    'nav' |
    'hetong' |
    'config' |
    'brand' |
    'plus' |
    'log' |
    'category' |
    'insurance' |
    'coupon' |
    'holiday' |
    'left' |
    'right' |
    'alipay' |
    'bitDance'
    ,
  onClick?: () => void
}
const FontIcon: React.FC<FontIconPropsType> = props => {
  return (
    <i
      onClick={() => props.onClick && props.onClick()}
      className={[
      'iconfont',
      props.name ? `icon-${props.name}` : '',
      props.className || ''
    ].join(' ')
    } />
  )

}

export default FontIcon

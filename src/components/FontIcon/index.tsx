import React, {CSSProperties} from 'react'

type FontIconPropsType = {
  className?: string;
  style?: CSSProperties
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
    'bitDance' |
    'userCoupon' |
    'transaction' |
    'finance' |
    'withdraw' |
    'wechat' |
    'star' |
    'feedback' |
    'user' |
    'violation'
  onClick?: () => void
}
const FontIcon: React.FC<FontIconPropsType> = props => {
  return (
    <i
      style={props.style}
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

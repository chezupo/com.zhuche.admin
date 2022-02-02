import style from '@/pages/Login/style.module.less'
import React from 'react'

const Header: React.FC = () => {
  const avatar = 'https://tfsimg.alipay.com/images/partner/ATMv8TTZKDzsQAAAAAAAAAAAAADtl2AA'
  return (
    <div className={style.container}>
      <div className={style.titleWrapper}>
        <img src={avatar} />
        <h1> 车租婆管理系统 </h1>
      </div>
      <h4 className={style.subTitle}>车租婆是基于小程序的互联网租车解决方案</h4>
    </div>

  )

}

export default Header

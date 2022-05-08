import React from "react";
import style from './style.module.less'
import dashboardPng from "@/assets/images/dashboard.png";
import {Image} from "antd";
import FontIcon from "@/components/FontIcon";


type WelcomeRenderPropsType = {
  data: DashboardItemType
}
const WelcomeRender: React.FC<WelcomeRenderPropsType> = ({data}) => {
  return (<>
      <div className={style.main}>
        <div className={style.leftBar}>
          <h2>您好,管理员</h2>
          <div className={style.notice}>今日晴，0℃ - 10℃，天气寒冷，注意添加衣物。</div>
          <div className={style.itemWrapper} >
            <div>
              <FontIcon name='order' className={style.icon} />
              今日订单 ({data.todayOrderCount})
            </div>
            <div>
              <FontIcon name='user' className={style.icon} /> 总用户数 ({data.userCount}) </div>
            <div>
              <FontIcon name='transaction' className={style.icon} />
              今日交易({data.todayAmount})
            </div>
          </div>
          <div>如果您对本系统有任何的意见，请拨打13427969604，我将在第一时间进行改正。感谢您的使用!</div>
        </div>
        <div className={style.imageWrapper}>
          <Image src={dashboardPng} className={style.image} />
        </div>
      </div>
  </>)
}

export default WelcomeRender

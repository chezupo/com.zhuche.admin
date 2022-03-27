import React from "react";
import style from './style.module.less'
import svg from "@/assets/images/undraw_vehicle_sale_a645.svg"
import {Link} from "react-router-dom";
import {useAppSelector} from "@/store/hooks";
import {Button} from "antd";
import CopyRight, {CopyRightAffixBottom} from "@/components/CopyRight";

const Home: React.FC = () => {
  const { imgPrefix, logo, appName} = useAppSelector(state => state.configuration)

  return (<>
    <div className={style.main}>
      <div className={style.container}>
        {
          imgPrefix && logo ?
            // <img src={`${imgPrefix}/${logo}`} className={style.logoImg}/> :
            <img src={svg} className={style.defaultImg} /> :
            <img src={svg} className={style.defaultImg} />
        }
        <h1>{appName ? appName : '车租婆'}汽车租赁管理系统</h1>
        <div className={style.linkWrapper}>
          <Link to='/login'>
            <Button type='primary'>
              前去登录
            </Button>
          </Link>
        </div>
      </div>
    </div>
    <CopyRightAffixBottom />
  </>)

}

export default Home

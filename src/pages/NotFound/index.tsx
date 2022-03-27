import React from "react";
import notFoundSvg from '../../assets/images/undraw_not_found_-60-pq.svg'
import style from './style.module.less'
import {Link, useNavigate} from "react-router-dom";

const NotFound: React.FC =() => {
 const navigate = useNavigate();
  const handleGoBack = (): void => {
    navigate(-1)
  }

  return (<>
    <div className={style.main}>
      <img src={notFoundSvg} />
      <h1>404页面</h1>
      <div className={style.linkWrapper}>
        <Link to='/'>返回首页</Link>
        <a onClick={handleGoBack}>返回上一页</a>
      </div>
    </div>
  </>)
}

export default NotFound

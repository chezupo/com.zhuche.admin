import React from "react";
import style from './style.module.less'

const CopyRight: React.FC = () => {
  return (<>
    © 2017 - {(new Date()).getFullYear()}
    <a href='https://wuchuheng.com' >
      Wuchuheng.</a>
    All Rights Reserved.
    <a href='https://beian.miit.gov.cn/#/Integrated/index'>粤ICP备17071471号-2</a>
  </>)
}
const CopyRightAffixBottom: React.FC = () => (
  <div className={style.main}>
    <CopyRight />
  </div>
)

export {CopyRightAffixBottom}
export default CopyRight

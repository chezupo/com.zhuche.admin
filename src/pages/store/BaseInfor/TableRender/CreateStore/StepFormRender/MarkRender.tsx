import React, { ReactNode } from 'react'
import style from '@/pages/store/BaseInfor/TableRender/CreateStore/StepFormRender/style.module.less'
import { Divider } from 'antd'

type MarkRenderPropsType = {
  data?: ReactNode
}
const MarkRender: React.FC<MarkRenderPropsType> = (props) => {
  return (
    <>
      {props.data ?
        (
          <div className={style.guid}>
            <Divider />
            <div>
              <h3>说明</h3>
              {props.data}
            </div>
          </div>
        )
        : <></>}
    </>
  )
}

export default MarkRender

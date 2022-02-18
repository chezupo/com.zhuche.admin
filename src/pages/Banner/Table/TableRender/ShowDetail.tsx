import React from "react";
import {Modal} from "antd";

type ShowDetailPropsType = {
  content: string
  isVisible: boolean
  onChancel: () => void
}
const ShowDetail = (props: ShowDetailPropsType) => {
  const handleCancel = () => props.onChancel()
  return <>
    <Modal title="详情"
           visible={props.isVisible}
           onCancel={handleCancel}
           cancelText='取消'
    >
      <div dangerouslySetInnerHTML={{ __html:props.content}} />
    </Modal>
  </>
}

export default ShowDetail;

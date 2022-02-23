import React, {useState} from "react";
import {Button, Modal} from "antd";
import style from "./style.module.less";
import {AiOutlinePlus} from "react-icons/ai";
import StepFormRender from "@/pages/store/BaseInfor/TableRender/CreateStore/StepFormRender";

const CreateStore: React.FC = () => {
  const [visitable, setVisitable] = useState<boolean>(true)
  return (
    <>
      <Button type='primary' onClick={() => setVisitable(true)} >
        <div className={style.buttonContentWrapper}>
          <AiOutlinePlus className={style.createButton}/>
          <div>创建门店 </div>
        </div>
      </Button>
      <Modal
        width={1500}
        title="创建门店"
        visible={visitable}
        footer={null}
        onCancel={() => setVisitable(false)}
      >
        <StepFormRender />
      </Modal>
    </>
  )
}

export default CreateStore

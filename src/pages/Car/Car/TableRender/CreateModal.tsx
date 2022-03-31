import React, {useState} from "react";
import {Button, Col, Modal} from "antd";
import style from "@/pages/Car/Car/TableRender/style.module.less";
import FontIcon from "@/components/FontIcon";
import FormRender from "@/pages/Car/Car/TableRender/FormRender";

const CreateModal:React.FC = () => {
  const [visiable, setVisiable] = useState<boolean>(true)

  return (<>
    <Button type='dashed' className={style.button} icon={<FontIcon name='plus' />}
            onClick={() => setVisiable(true)}
    >添加汽车</Button>
    <Modal
      title='添加汽车'
      visible={visiable}
      onCancel={() => setVisiable(false)}
      footer={null}
    >
      <FormRender />
    </Modal>
  </>)

}

export default CreateModal

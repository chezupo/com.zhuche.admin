import React, {useState} from "react";
import {Modal, Spin} from "antd";
import FormRender from "@/pages/Car/Car/TableRender/FormRender";
import {useAppDispatch} from "@/store/hooks";
import {updateCarThunk} from "@/store/modules/car";
import {successMessage} from "@/util/messageUtil";

type EditModelPropsType = {
  data: CarItemType | null
  onSuccess: () => void
  onCancel: () => void
}
const EditModel: React.FC<EditModelPropsType> = props => {
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState<boolean>(false)
  const handleFinish = (newData: Omit<CarItemType, 'id'>) => {
    setLoading(true)
    dispatch(updateCarThunk({...newData, id: props.data!.id})).then(() => {
      successMessage()
      props.onSuccess()
    }).finally(() => {
      setLoading(false)
    })
  }
  return (<>
    <Modal visible={!!props.data} title='编辑汽车' footer={null} width={'60%'} onCancel={props.onCancel}>
      <Spin spinning={loading}>
      {
        !!props.data && <FormRender onFinish={handleFinish} data={props.data} />
      }
      </Spin>
    </Modal>
  </>)
}

export default EditModel

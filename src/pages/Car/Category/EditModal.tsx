import React, {useState} from "react";
import {Modal, Form} from "antd";
import FormRender from "@/pages/Car/Category/FormRender";
import {CreateCarCategoryQueryDataType, updateCarCategory} from "@/api/carCategory";
import {useAppDispatch} from "@/store/hooks";
import {updateCarCategoryThunk} from "@/store/modules/carCatetory";
import {successMessage} from "@/util/messageUtil";

type EditModalPropsType = {
  value: CarCategoryItemType | null
  onCancel: () => void
}
const EditModal: React.FC<EditModalPropsType> = props => {
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState<boolean>(false)
  const handleFinish = ({name}: CreateCarCategoryQueryDataType): void => {
    setLoading(true)
    dispatch(updateCarCategoryThunk(props.value!.id, {name})).then(() => {
      successMessage()
      props.onCancel()
    }).finally(() => setLoading(false))
  }

  return (
    <Modal
      title='编辑'
      visible={!!props.value}
      onCancel={() => props.onCancel()}
      footer={null}
    >
      {!!props.value && (
        <FormRender onFinish={handleFinish} onCancel={props.onCancel} value={props.value} />
      )}
    </Modal>
  )
}

export default EditModal

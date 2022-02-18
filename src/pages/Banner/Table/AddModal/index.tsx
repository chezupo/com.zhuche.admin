import React, {useState} from 'react'
import {Button, Modal} from 'antd'
import style from './style.module.less'
import AddForm from '@/pages/Banner/Table/AddModal/AddForm'

type AddModalPropsType  = {
  onSuccess?: () => void
}
const AddModal: (props: AddModalPropsType) => any = (props: AddModalPropsType) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleUpdate = () => {
    props.onSuccess && props.onSuccess()
    setIsModalVisible(() => !isModalVisible)
  }

  return (
    <>
      <Button
        type='dashed'
        className={style.button}
        onClick={() => setIsModalVisible(true)}
      >添加</Button>
      <Modal
        title="添加新的幻灯片"
        visible={isModalVisible}
        footer={null}
        onCancel={handleCancel}
      >
        <AddForm onCreated={() => handleUpdate()} />
      </Modal>
    </>
    )
}

export default AddModal

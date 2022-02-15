import React, { useState } from 'react'
import { Button, Modal } from 'antd'
import style from './style.module.less'
import AddForm from '@/pages/Banner/Table/AddModal/AddForm'

const AddModal: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(true);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
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
        onOk={handleOk}
        onCancel={handleCancel}
        cancelText='取消'
        okText='确定'
      >
        <AddForm />
      </Modal>
    </>
    )
}

export default AddModal

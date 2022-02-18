import React from "react";
import {BannerType} from "@/api/Banners";
import {Modal} from "antd";
import EditForm from "@/pages/Banner/Table/TableRender/EditModal/EditForm";

type EditModalPropsType = {
  visitable: boolean
  data: BannerType
  onCancel?: () => void
  onSuccess?: (banner: BannerType) => void
}

const EditModal: React.FC<EditModalPropsType> = (props) => {
  return (<>
    <Modal
      title='编辑Banner'
      visible={props.visitable}
      onCancel={() => props.onCancel && props.onCancel()}
      footer={null}
    >
      <EditForm
        data={props.data}
        onSuccess={(newBanner) => props.onSuccess && props.onSuccess(newBanner)}
      />
    </Modal>
  </>)
}

export default EditModal

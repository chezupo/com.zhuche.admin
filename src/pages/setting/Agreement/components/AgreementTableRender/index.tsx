import React, {useState} from "react";
import {ColumnsType} from "antd/lib/table/interface";
import {Button, Col, Modal, Row, Table} from "antd";
import FormRender from "@/pages/setting/Agreement/components/AgreementTableRender/FormRender";

type AgreementTableRenderPropsType = {
  data: AgreementItemType[]
  onChanged: () => void
  loading: boolean
}
const AgreementTableRender: React.FC<AgreementTableRenderPropsType> = ({data, onChanged, loading}) => {
  const [editItem, setEditItem] = useState<AgreementItemType | undefined >()
  const columns: ColumnsType<AgreementItemType> = [
    {
      title: 'ID',
      dataIndex:'id',
    },
    {
      title: '标题',
      dataIndex:'title',
    },
    {
      title: '内容',
      render: (_, record) => {
        return (<a onClick={() => setEditItem(record) }>查看</a>)
      }
    },
    {
      title: '操作',
      render: (_, record) => {
        return (
          <Row>
            <Col><Button onClick={() => setEditItem(record)} type='primary'>修改</Button></Col>
          </Row>
        )
      }
    },
  ]
  const handleUpdated = () => {
    onChanged()
    setEditItem(undefined)
  }

  return (<>
    <Table
      columns={columns}
      rowKey={record => record.id}
      dataSource={data}
      loading={loading}
    />
    <Modal
      onCancel={() => setEditItem(undefined)}
      visible={!!editItem}
      title='编辑'
      width='75%'
      footer={null}
    >
      { editItem && (<FormRender value={editItem} onUpdated={handleUpdated}/>) }
    </Modal>
  </>)
}

export default AgreementTableRender

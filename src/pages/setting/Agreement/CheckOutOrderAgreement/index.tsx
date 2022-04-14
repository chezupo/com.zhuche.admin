import React, {useEffect, useState} from "react";
import {Button, Col, Modal, Row, Table} from "antd";
import {ColumnsType} from "antd/lib/table/interface";
import {getCheckoutAgreements} from "@/api/agreement";
import FormRender from "@/pages/setting/Agreement/CheckOutOrderAgreement/FormRender";

const CheckOutOrderAgreement: React.FC = props => {
  const [data, setData] = useState<AgreementItemType[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [editItem, setEditItem] = useState<AgreementItemType | undefined >({
    id: 1,
    title: 'hello',
    content: 'content'
  })
  const handleFetchData = () => {
    setLoading(true)
    getCheckoutAgreements().then(res => {
      setData(res)
    })
      .finally(() => setLoading(false))
  }
  useEffect(() => {
    handleFetchData()
  }, [])
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
    handleFetchData()
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

export default CheckOutOrderAgreement

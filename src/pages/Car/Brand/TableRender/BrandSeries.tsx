import React, {useEffect, useState} from "react";
import {Button, Col, Drawer, Input, Row, Space, Spin, Table} from "antd";
import FontIcon from "@/components/FontIcon";
import {ColumnsType} from "antd/lib/table/interface";
import {useAppDispatch} from "@/store/hooks";
import {createBrandSeriesThunk} from "@/store/modules/brand";
import {successMessage} from "@/util/messageUtil";

type BrandSeriesPropsType = {
  data: BrandItemType
  onClose: () => void
}
const BrandSeries: React.FC<BrandSeriesPropsType> = props => {
  const newId = -1;
  const [data, setData] = useState<BrandSeriesItemType[]>(props.data.seriesList)
  const [editItem, setEditItem] = useState<BrandSeriesItemType | null>(null)
  const dispatch = useAppDispatch()
  const handleCreate = () => {
    dispatch(createBrandSeriesThunk(props.data.id, {name: editItem!.name})).then(newSeries => {
      successMessage('添加成功🎉🎉🎉')
      setData([
        ...data.filter(el => el.id !== newId)
        , newSeries])
      setEditItem(null)
    })
  }
  useEffect(() => {
    setData(props.data.seriesList)
  }, [props.data.seriesList])
  const columns:ColumnsType<BrandSeriesItemType> = [
    { title: 'ID',
      dataIndex: 'id'
    },
    { title: '名称', render: (_, record) => {
      if (record.id === newId) {
        return <Input value={editItem?.name} onChange={v => setEditItem({...editItem!, name: v.target.value}) } />
      }
      return (<>{record.name}</>)

      } },
    {
      title: '操作',
      render: (_, record) => {
        return (<Row>
          {
            record.id === newId && ( <Col><Button type='primary' onClick={handleCreate}>创建</Button></Col> )
          }
        </Row>)
      }
    }
  ]
  const handlePushNewItem = () => {
    const newItem:BrandSeriesItemType = {
      id: newId, name: ''
    }
    setEditItem(newItem)
    setData([...data, newItem])
  }

  return (
    <Drawer
      title="车系管理"
      placement='top'
      height={'70%'}
      // onClose={onClose}
      visible={true}
      extra={
        <Space><Button type='primary' onClick={() =>props.onClose()}>关闭</Button></Space>
      }
      onClose={() => props.onClose()}
    >
      <Row>
          <Col span={24}>
            <Spin spinning={editItem !== null} >
              <Button type='dashed' icon={<FontIcon name='plus' />} style={{width: '100%'}} onClick={handlePushNewItem}>添加</Button>
            </Spin>
          </Col>
        <Col span={24}>
          <Table
            columns={columns}
            dataSource={data}
            rowKey={record => record.id}
          />
        </Col>
      </Row>
    </Drawer>
  )
}

export default BrandSeries

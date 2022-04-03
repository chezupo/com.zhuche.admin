import React, {useEffect, useState} from "react";
import {Button, Col, Drawer, Input, Popconfirm, Row, Space, Spin, Table} from "antd";
import FontIcon from "@/components/FontIcon";
import {ColumnsType} from "antd/lib/table/interface";
import {useAppDispatch} from "@/store/hooks";
import {createBrandSeriesThunk, deleteBrandSeriesThunk, updateBrandSeriesThunk} from "@/store/modules/brand";
import {successMessage} from "@/util/messageUtil";

type BrandSeriesPropsType = {
  data: BrandItemType
  onClose: () => void
}
const BrandSeries: React.FC<BrandSeriesPropsType> = props => {
  const newId = -1;
  const [data, setData] = useState<BrandSeriesItemType[]>(props.data.seriesList)
  const [createItem, setCreateItem] = useState<BrandSeriesItemType | null>(null)
  const [editItem, setEditItem] = useState<BrandSeriesItemType | null>(null)
  const dispatch = useAppDispatch()
  const handleCreate = () => {
    if (createItem!.name.trim().length > 0) {
      dispatch(createBrandSeriesThunk(props.data.id, {name: createItem!.name})).then(newSeries => {
        successMessage('添加成功🎉🎉🎉')
        setData([
          ...data.filter(el => el.id !== newId)
          , newSeries])
        setCreateItem(null)
      })
    }
  }
  useEffect(() => {
    setData(props.data.seriesList)
  }, [props.data.seriesList])
  const handleCancelCreate = () => {
    setCreateItem(null)
    setData( data.filter(el => el.id !== newId) )
  }
  const handleDelete = (id: number): void => {
    dispatch( deleteBrandSeriesThunk(props.data.id, id)).then(() => {
      successMessage()
      setData( data.filter(el => el.id !== id) )
    })
  }

  const handleSave = (): void => {
    dispatch( updateBrandSeriesThunk(props.data.id, editItem!)).then(() => {
      successMessage()
      setData( data.map(el => el.id === editItem!.id ? editItem! : el) )
      setEditItem(null)
    })
  }

  const columns:ColumnsType<BrandSeriesItemType> = [
    { title: 'ID',
      dataIndex: 'id'
    },
    { title: '名称', render: (_, record) => {
        if (record.id === newId) {
          return <Input value={createItem?.name} onChange={v => setCreateItem({...createItem!, name: v.target.value}) } onPressEnter={() => handleCreate()} />
        } else if (!!editItem && editItem.id === record.id) {
          return <Input value={editItem?.name} onChange={v => setEditItem({...editItem!, name: v.target.value}) } />
        }
        return (<>{record.name}</>)
      } },
    {
      title: '操作',
      render: (_, record) => {
        return (<Row gutter={[24, 0]}>
          {
            record.id === newId && (<>
              <Col><Button
                type='primary'
                onClick={handleCreate}
                disabled={!createItem || createItem.name.trim().length === 0}
              >创建</Button></Col>
              <Col><Button onClick={handleCancelCreate}>取消</Button></Col>
            </>)
          }
          {
            record.id !== newId && (<>
              {
                editItem === null && (
                  <>
                    <Col>
                      <Button onClick={() => setEditItem(record)}>修改</Button>
                    </Col>
                    <Col>
                      <Popconfirm
                        title='您确定要删除数据吗？'
                        onConfirm={() => handleDelete(record.id)}
                        okText="是"
                        cancelText="否"
                      >
                        <Button danger>删除</Button>
                      </Popconfirm>
                    </Col>
                  </>
                )
              }
              {
                !!editItem && editItem.id === record.id && (
                  <>
                    <Col>
                      <Button type='primary' onClick={handleSave}>保存</Button>
                    </Col>
                    <Col>
                      <Button onClick={() => setEditItem(null)}>取消</Button>
                    </Col>
                  </>
                )
              }
            </>)
          }
        </Row>)
      }
    }
  ]
  const handlePushNewItem = () => {
    const newItem:BrandSeriesItemType = {
      id: newId, name: ''
    }
    setCreateItem(newItem)
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
          <Spin spinning={createItem !== null} >
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

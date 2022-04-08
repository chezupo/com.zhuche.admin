import React, {useEffect, useState} from "react";
import HeaderPage from "@/components/HeaderPage";
import ContentContainer from "@/components/ContentContainer";
import style from "./style.module.less";
import {Col, Row, Table, Button, Popconfirm} from "antd";
import {ColumnsType} from "antd/lib/table/interface";
import CreateModel from "@/pages/Car/Category/CreateModel";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {initCarCategoryThunk, deleteCarCategoryThunk} from "@/store/modules/carCatetory";
import EditModal from "@/pages/Car/Category/EditModal";
import {successMessage} from "@/util/messageUtil";

const Category: React.FC = () => {
  const {loading, list: {list, currentPage, size, total}}  = useAppSelector(state => state.carCategory)
  const dispatch = useAppDispatch()
  const [editItem, setEditItem] = useState<CarCategoryItemType | null>(null)
  useEffect(() => {
    if (list.length === 0) {
      dispatch(initCarCategoryThunk()).then(() => console.log('Init carCategory.'))
    }
  }, [])
  const handleDelete = async (id: number) => {
    await dispatch(deleteCarCategoryThunk(id));
    successMessage();
  }
  const columns: ColumnsType<CarCategoryItemType> = [
    { title: 'ID', dataIndex: 'id' },
    {title: '名称', dataIndex: 'name'},
    {title: '归属门店', render: (_, record ) => record.store.name },
    {
      title: '操作',
      render: (_, record) => {
        return (
          <Row gutter={[12, 0]}>
            <Col>
              <Button
                type='primary'
                onClick={() => setEditItem(record)}
              >编辑</Button>
            </Col>
            <Popconfirm
              title='您确定要删除该数据吗?'
              onConfirm={() => handleDelete(record.id)}
              okText='确定'
              cancelText='否'
            >
              <Col>
                <Button danger>删除</Button>
              </Col>
            </Popconfirm>
          </Row>
        )
      }
    }
  ]
  return (<>
    <HeaderPage>
      <>用于对本地门店的汽车的分类管理</>
    </HeaderPage>

    <ContentContainer classname={style.main}>
      <Row gutter={[0, 12]}>
        <Col span={24}>
          <CreateModel />
        </Col>
        <Col span={24}>
          <Table
            loading={loading}
            columns={columns}
            dataSource={list}
            rowKey={record => record.id}
            pagination={{pageSize: size, total, current: currentPage, showTotal: () => {
                return (<>共{total}条</>)
              }}}
          />
        </Col>
      </Row>
      <EditModal
        value={editItem}
        onCancel={() => setEditItem(null)}
      />
    </ContentContainer>
  </>)
}

export default Category

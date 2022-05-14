import React, {useEffect, useState} from "react";
import {Button, Col, Image, Row, Spin, Table} from "antd";
import style from "./style.module.less"
import {ColumnsType} from "antd/lib/table/interface";
import CreateForm from "@/pages/Car/Brand/TableRender/CreateModal";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {getBrandThunk, initBrandThunk} from "@/store/modules/brand";
import EditModal from "./EditModel";
import Permission from "@/components/Permission";
import BrandSeries from "@/pages/Car/Brand/TableRender/BrandSeries";

const TableRender: React.FC = () => {
  const dispatch = useAppDispatch()
  const data = useAppSelector(state => state.brands.list)
  const loading = useAppSelector(state => state.brands.loading)
  const [editBrand, setEditBrand] = useState<BrandItemType | null>(null)
  const [visitSeries, setVisitSeries] = useState<BrandItemType | null>(null)
  useEffect(() => {
    if (data.list.length === 0) {
      dispatch(initBrandThunk()).then(() => {
        console.log("Init brands.")
      })
    }
  }, [])

  const columns:ColumnsType<BrandItemType> = [
    {
      title: 'ID',
      dataIndex: 'id'
    },
    {
      title: '品牌名',
      dataIndex: 'name'
    },
    {
      title: '图片',
      dataIndex: 'imgKey',
      render: (src) => {
        return <Image src={src} />

      }
    },
    {
      title: '归属门店',
      render: (value, record) => (<>{record.store.name}</>)
    },
    {
      title: '操作',
      render: (v, record) => {
        return (<>
          <Row gutter={[24, 0]}>
            <Col><Button
              type='primary'
              onClick={() => setEditBrand(record)}
            >修改</Button></Col>
            <Col><Button
              onClick={() => setVisitSeries(record)}
            >查看车系</Button></Col>
          </Row>
        </>)
      }
    }
  ]
  const handleChange = (page: number, size: number) => {
    dispatch(getBrandThunk()).then(() => {
      console.log("Get new page's brands")
    })
  }

  return (<>
    { editBrand && <EditModal
      data={editBrand}
      onUpdated={() => setEditBrand(null)}
      onCancel={() => setEditBrand(null)}
    /> }
    { visitSeries && <BrandSeries data={visitSeries} onClose={() => setVisitSeries(null)} /> }
    <Spin spinning={loading}>
      <div className={style.main}>
        <Row gutter={[0, 12]} >
          <Permission roles={['ROLE_BUSINESS']} >
            <Col span={24}>
              <CreateForm />
            </Col>
          </Permission>
          <Col span={24}>
            <Table
              onChange={newPage => handleChange(newPage.current!, newPage.pageSize!)}
              columns={columns}
              rowKey={record => record.id}
              dataSource={data.list}
              pagination={{
                total: data.total,
                pageSize: data.size,
                current: data.currentPage,
                showTotal: () => (<>共{data.total}条</>)
              }}
            />
          </Col>
        </Row>
      </div>
    </Spin>
  </>)
}

export default TableRender

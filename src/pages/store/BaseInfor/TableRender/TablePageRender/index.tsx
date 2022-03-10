import { Button, Col, Image, Modal, Popconfirm, Row, Table, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import { ColumnsType, TablePaginationConfig } from 'antd/lib/table/interface'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { destroyThunk, getStoresThunk } from '@/store/modules/stores'
import { useLocation, useNavigate } from 'react-router-dom'
import { objectToQueryStr, queryStrToObject } from '@/util/helper'
import style from './style.module.less'
import Permission from '@/components/Permission'
import { RoleType } from '@/store/modules/me'
import store from '@/store'
import { errorMessage, successMessage } from '@/util/messageUtil'
import EditorRender from '@/pages/store/BaseInfor/TableRender/EditorRender'
import GuidePreviewRender from '@/pages/store/BaseInfor/TableRender/TablePageRender/GuidePreviewRender'

export  const StateRender: React.FC<{isOk: boolean}>  = (props) => {
  return props.isOk ?  <Tag color='blue'>是</Tag> : <Tag color='red'>否</Tag>
}
const handleDestroy = (id: number) => {
  store.dispatch(destroyThunk(id)).then(() => {
    successMessage()
  }).catch(() => {
    errorMessage()
  })
}

const TablePageRender: React.FC = () => {
  const [editData, setEditData] = useState<StoreItemType | null>(null)
  const [previewGuides, setPreviewGuides] = useState< {title: string; guides: StoreGuideType[]} | null>(null)
  const handlePreview = (guides: StoreGuideType[], title: string) => {
    setPreviewGuides({ title, guides })
  }
  const columns: ColumnsType<StoreItemType> = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 100,
      fixed: 'left',
    },
    {
      width: 100,
      fixed: 'left',
      title: '店名',
      dataIndex: 'name'
    },
    {
      title: '营业时间',
      width: 200,
      render: (record) => {
        return (<>{record.starAt}-{record.endAt}</>)
      }
    },
    {
      title: '地址',
      width: 300,
      render: (record: StoreItemType) => {
        return (<>
          {record.province.name} {record.city.name} {record.area.name} {record.address}
        </>)
      }
    },
    {
      title: '服务电话',
      dataIndex: 'servicePhone',
      width: 150
    },
    {
      title: '火车站',
      dataIndex: 'isStation',
      width: 100,
      render: (isStation) => <StateRender isOk={isStation} />
    },
    {
      title: '飞机场',
      dataIndex: 'isAirport',
      width: 100,
      render: (isAirport: boolean) => <StateRender isOk={isAirport} />
    },
    {
      title: '含自助',
      width: 100,
      dataIndex: 'isSelfService',
      render: (isSelfService: boolean) => <StateRender isOk={isSelfService} />
    },
    {
      title: '管理员',
      width: 100,
      // todo 查看管理员
      render: () => {
        return (<a>查看</a>)
      }
    },
    {
      title: '门头图',
      width: 250,
      render: (record: StoreItemType) => {

        return (
          <>
            {record.banners.length > 0 ? (
              <div className={style.bannerWrapper} >
                {
                  record.banners.map(el =>
                    <Image
                      key={el.id}
                      src={`${el.prefixUrl}/${el.imgKey}`}
                      className={style.image}
                    />
                  )
                }
              </div>
            ) : <div className={style.empty}>无</div> }
          </>
        )
      }
    },
    {
      title: '取车指引',
      width: 100,
      render: (value, record) => {

        if (record.pickupGuides.length === 0) {
          return <>无</>
        } else {
          return (<a onClick={() => handlePreview(record.pickupGuides, '取车指引')}>查看</a>)
        }
      }
    },

    {
      title: '还车指引',
      width: 100,
      render: (value, record) => {
        if (record.returnGuides.length === 0) {
          return <>无</>
        } else {
          return (<a onClick={() => handlePreview(record.returnGuides, '还车指引')}>查看</a>)
        }
      }
    },
    {
      width: 150,
      fixed: 'right',
      title: '操作',
      render: (record: StoreItemType) => {
        return <>
          <Row gutter={[12, 0]}>
            <Col><Button
              size='small'
              type='primary'
              onClick={() => setEditData(record)}
            >编辑</Button></Col>
            <Permission roles={[RoleType.ROLE_ADMIN]} >
              <Col>
                <Popconfirm title='确认删除?' cancelText='取消' okText='确认' onConfirm={() => handleDestroy(record.id)}>
                  <Button size='small' danger>删除</Button>
                </Popconfirm>
              </Col>
            </Permission>
          </Row>
        </>
      }
    }
  ]
  const stores = useAppSelector(state => state.store.stores)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getStoresThunk()).then(() => {
      console.log("Init stores data.")
    })
  }, [])
  const {
    total,
    currentPage,
    size
  } = useAppSelector(state => state.store.stores)
  const navicator = useNavigate()
  const {search, pathname}  = useLocation()
  const handleChange = ({ current, pageSize }: TablePaginationConfig): void => {
    const queryObj = queryStrToObject(search)
    const queryStr = objectToQueryStr({...queryObj, page: current as number, size: pageSize as number})
    navicator(pathname + queryStr)
    dispatch(getStoresThunk()).then(() => {
      console.log("fetching the stores.")
    })

  }
  const handleSuccess = () => {
    setEditData(null)
  }

  return (<>
    <Table
      pagination={{pageSize: size, current: currentPage, total}}
      onChange={handleChange}
      scroll={{ x: 1300 }}
      columns={columns}
      dataSource={stores.list}
      rowKey={el => el.id}
    />
    <Modal title='编辑' visible={!!editData} footer={null} width={1000} onCancel={() => setEditData(null)}>
      <EditorRender
        data={editData as StoreItemType}
        onCancel={() => setEditData(null)}
        onSuccess={handleSuccess}
      />
    </Modal>
    <Modal
      visible={!!previewGuides}
      title={previewGuides?.title}
      onCancel={() => setPreviewGuides(null)}
      footer={null}
    >
      <GuidePreviewRender data={previewGuides?.guides || []} />
    </Modal>

  </>)
}

export default TablePageRender

import React, {useState} from "react";
import {Button, Col, Popconfirm, Row, Table} from "antd";
import {ColumnsType, TableRowSelection} from "antd/lib/table/interface";
import BooleanTag from "@/components/BooleanTag";
import {useReloadPagination} from "@/util/paginationHook";
import {deleteCoupon, getCoupons, GetCouponsQueryType} from "@/api/coupon";
import {successMessage} from "@/util/messageUtil";
import AddModalRender from "@/pages/Coupon/Coupon/AddModalRender";
import EditRender from "@/pages/Coupon/Coupon/EditRender";

type TableRenderPropsType = {
  onChange?: (keys: number[]) => void
  isSelectKey?: boolean
}
const TableRender: React.FC<TableRenderPropsType> = ({ onChange , isSelectKey}) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const selection: TableRowSelection<CouponItemType> = {
    selectedRowKeys,
    onChange: (newKeys) => {
      onChange && onChange(newKeys as number[])
      setSelectedRowKeys(newKeys)
    }
  }
  const handleFetchData = (query?: GetCouponsQueryType) => {
    setLoading(true)
    getCoupons(query).then(res => {
      setData(res)
    }).finally(() => setLoading(false))
  }
  const [setPagination] = useReloadPagination(handleFetchData)

  const  handleDelete = (id: number) => {
    setLoading(true)
    deleteCoupon(id).then(() => {
      successMessage()
      handleFetchData()
    }).finally(() => setLoading(false))
  }
  const columns: ColumnsType<CouponItemType> = [
    { title: 'ID', dataIndex: 'id' },
    { title: '标题', dataIndex: 'title'},
    { title: '规则', render: (_, record) => (<a onClick={() => setEditItem(record)}>查看</a>) },
    {
      title: '是否新用户自动发放',
      render: (_, record) => {
        return (<BooleanTag isOk={record.isAutoDispatchingToNewUser} />)
      }
    },
    {
      title: '额度',
      dataIndex: 'amount'
    },
    {
      title: '须满足的额度',
      dataIndex: 'meetAmount'
    },
    {
      title: '有效时长',
      dataIndex: 'expired',
      render: (date) => `${date}天`
    },
    {
      title: '用于节假日',
      render: (_, record) => {
        return (<BooleanTag isOk={record.isWithHoliday} />)
      }
    },
    {
      title: '用于租赁费',
      render: (_, record) => {
        return (<BooleanTag isOk={record.isWithRent} />)
      }
    },
    {
      title: '用于服务费',
      render: (_, record) => {
        return ( <BooleanTag isOk={record.isWithServiceAmount} /> )
      }
    },
    {
      title: '操作',
      render: (_, record) => {
        return (
          <>
            {
              !isSelectKey && (
                <Row gutter={[12, 0]}>
                  <Col><Button type='primary'
                               onClick={() => setEditItem(record)}
                  >编辑</Button></Col>

                  <Col>
                    <Popconfirm
                      title='你确定要删除该优惠券吗?'
                      onConfirm={() => handleDelete(record.id)}
                      okText='确定'
                      cancelText='取消'
                    >
                      <Button danger >删除</Button>
                    </Popconfirm>
                  </Col>
                </Row>
              )
            }
          </>
        )
      }
    }
  ]
  const handleChange = (page: number, size: number): void => {
    isSelectKey ? handleFetchData({page, size}) : setPagination({page, size})
  }
  const [editItem, setEditItem] = useState<CouponItemType | undefined>()

  const [data, setData] = useState<PageType<CouponItemType>>({ size: 12, currentPage: 1, total: 0, list: [] })
  const handleEditSuccess = (newItem: CouponItemType) => {
    const newItemList = data.list.map(item => item.id === newItem.id ? newItem : item)
    setData({...data, list: newItemList})
    setEditItem(undefined)
  }

  return (
    <>
      <Row>
        {
          !isSelectKey && (
            <Col span={24}><AddModalRender
              onSuccess={() => handleFetchData()}
            /></Col>
          )
        }
        <Col span={24}>
          <Table
            rowSelection={isSelectKey ? selection : undefined}
            columns={columns}
            rowKey={record => record.id}
            loading={loading}
            dataSource={data.list}
            pagination={{
              total: data.total,
              pageSize: data.size,
              current: data.currentPage,
              showTotal: () => (<>共{data.total}条</>)
            }}
            onChange={(e) => handleChange(e.current!, e.pageSize!) }
          />
        </Col>
      </Row>
      <EditRender
        onSuccess={handleEditSuccess}
        onCancel={() => setEditItem(undefined)}
        data={editItem}
      />
    </>
  )
}

export default TableRender

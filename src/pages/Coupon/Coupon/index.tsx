import React, {useEffect, useState} from "react";
import HeaderPage from "@/components/HeaderPage";
import ContentContainer from "@/components/ContentContainer";
import {Button, Col, Popconfirm, Row, Table, Tag} from "antd";
import style from './style.module.less';
import {ColumnsType} from "antd/lib/table/interface";
import {deleteCoupon, getCoupons} from "@/api/coupon";
import {useLocation, useNavigate} from "react-router-dom";
import {obj2Query} from "@wuchuhengtools/helper";
import AddModalRender from "@/pages/Coupon/Coupon/AddModalRender";
import EditRender from "@/pages/Coupon/Coupon/EditRender";
import {successMessage} from "@/util/messageUtil";

const Coupon: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<PageType<CouponItemType>>({ size: 12, currentPage: 1, total: 0, list: [] })
  const [editItem, setEditItem] = useState<CouponItemType | undefined>()

  const handleFetchData = () => {
    setLoading(true)
    getCoupons().then(res => {
      setData(res)
    }).finally(() => setLoading(false))
  }

  useEffect(() => handleFetchData(), [])
 const BooleanTag: React.FC<{isOk: boolean}> = ({isOk}) => {
    return (
      <>
        {isOk && <Tag color='green'>是</Tag>}
        {!isOk && <Tag color='red'>否</Tag>}
      </>
    )
 }
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
    }
  ]
  const navigator = useNavigate();
  const {pathname} = useLocation();
  const handleChange = (newPageNumber: number, size: number): void => {
    const search = obj2Query({page: newPageNumber, size})
    navigator(pathname +  search)
    handleFetchData()
  }
  const handleEditSuccess = (newItem: CouponItemType) => {
    const newItemList = data.list.map(item => item.id === newItem.id ? newItem : item)
    setData({...data, list: newItemList})
    setEditItem(undefined)
  }

  return (<>
    <HeaderPage>用于管理各种优惠卷管理的创建，删除和修改</HeaderPage>
    <ContentContainer classname={style.main}>
      <Row>
        <Col span={24}><AddModalRender
          onSuccess={() => handleFetchData()}
        /></Col>
        <Col span={24}>
          <Table
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
    </ContentContainer>
  </>)
}

export default Coupon

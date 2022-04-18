import React, {useState} from "react";
import {Table} from "antd";
import {ColumnsType} from "antd/lib/table/interface";
import BooleanTag from "@/components/BooleanTag";
import {initPaginationData, pageDataConvertPagination} from "@/util/paginationUtil";
import {useReloadPagination} from "@/util/paginationHook";
import {getUserCoupons} from "@/api/userCoupon";
import MarkSearchKeyword from "@/components/MarkSearchKeyword";

const TableRender: React.FC = () => {
  const [data, setData] = useState<PageType<UserCouponItemType>>(initPaginationData())
  const [loading, setLoading] = useState<boolean>(false)
  const [setPagination] = useReloadPagination(() => {
    setLoading(true)
    getUserCoupons().then(res =>
      setData(res)
    ).finally(() => setLoading(false))
  })

  const columns: ColumnsType<UserCouponItemType> = [
    {
      title: 'ID',
      dataIndex: 'id'
    },
    {
      title: '昵称',
      render: (_, record) => {
        return <MarkSearchKeyword text={record.user.alipayAccount?.nickName || ''} pathParamKeyword='nickName' />
      }
    },
    {
      title: '标题',
      render: (_, record) => {
        return <MarkSearchKeyword text={record.coupon.title} pathParamKeyword='title' />
      }
    },
    { title: '有效时长',
      render: (_, record) => {
        return record.expired + '天'
      }
    },
    { title: '剩余有效时长',
      render: (_, record) => {
        const dayTimestampLength = 60 * 60 * 24 * 1000;
        const days = ((new Date(record.createdAt)).getTime() + record.expired * dayTimestampLength - Date.now()) /dayTimestampLength
        return days.toFixed(2) + '天'
      }
    },
    { title: '原因',
      render: (_, record) => record.reason
    },
    {
      title: '状态',
      render: (_, record) => {
        return <BooleanTag isOk={record.isValid} okText='有效' cancelText='无效' />
      }
    },
    {
      title: '创建日期',
      render: (_, record) => record.createdAt
    }
  ]

  return (<>
    <Table
      columns={columns}
      rowKey={record => record.id}
      dataSource={data.list}
      loading={loading}
      onChange={(e) => setPagination({page: e.current!, size: e.pageSize!})}
      pagination={pageDataConvertPagination(data)}
    />
  </>)
}

export default TableRender

import React, {useState} from "react";
import {Table, Tag} from "antd";
import {ColumnsType} from "antd/lib/table/interface";
import {useReloadPagination} from "@/util/paginationHook";
import {getTransaction} from "@/api/Tansaction";
import {pageDataConvertPagination} from "@/util/paginationUtil";
import style from './style.module.less';
import {useNavigate} from "react-router-dom";
import FontIcon from "@/components/FontIcon";

const TableRender: React.FC = () => {
  const navigator = useNavigate()
  const columns: ColumnsType<TransactionItemType> = [
    { title: 'ID', dataIndex: 'id' },
    {title: '标题', dataIndex: 'title'},
    {title: '费用',
      render: (_, record) => {
        const flag = record.amount > 0 ? '+' : '';
        return (<span style={{color: record.amount > 0 ? 'green' : 'red'}}>{`${flag}${record.amount}`}</span>)
      }
    },
    {title: '余额', render: (_, record) => record.balance.toFixed(2) },
    {title: '备注', render: (_, record) => record.remark },
    {title: '状态', render: (_, record) =>  {
        switch(record.status) {
          case "FAILED":
            return <Tag color="#f50">失败</Tag>
            break;
          case "FINISHED":
            return <Tag color="#87d068">完成</Tag>
            break;
          case "PROCESSING":
            return <Tag color="orange">进行中</Tag>
            break;
        }
      }
    },
    {title: '支付方式', render: (_, record) => {
        switch (record.payType) {
          case "ALIPAY":
            return <FontIcon name='alipay' style={{fontSize: '1.3rem', color: "blue"}} />
            break;
          case "WECHAT":
            return <FontIcon name='wechat' style={{fontSize: '1.3rem', color: 'green'}} />
            break;
        }
      }},
    {title: '用户', render: (_, record) => {
        return (<a
          onClick={() => navigator(`/users/alipayUser?id=${record.user.alipayAccount?.id}`)}
        >{record.user.alipayAccount?.nickName}</a>)
      } },
    {title: '时间', dataIndex: 'createdAt'}
  ]
  const [data, setData] = useState<PageType<TransactionItemType>>({
    total: 0,
    size: 12,
    currentPage: 1,
    list: []
  })
  const [loading, setLoading] = useState<boolean>(false)
   const [handleChangePage] = useReloadPagination(async () => {
    setLoading(true)
    try {
      setData( await getTransaction() )
    }finally {
      setLoading(false)
    }
  })

  return (<>
    <Table
      className={style.main}
      columns={columns}
      dataSource={data.list}
      loading={loading}
      onChange={(e) => handleChangePage({page: e.current!, size: e.pageSize!})}
      pagination={pageDataConvertPagination(data)}
      rowKey={record => record.id}
    />
  </>)
}

export default TableRender

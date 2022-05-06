import React, {useState} from "react";
import {Table} from "antd";
import {ColumnsType} from "antd/lib/table/interface";
import {CommentItemType, PageType} from "@/typings";
import style from './style.module.less';
import {useReloadPagination} from "@/util/paginationHook";
import {getStoreComments} from "@/api/storeComments";
import {pageDataConvertPagination} from "@/util/paginationUtil";
import FontIcon from "@/components/FontIcon";

const TableRender: React.FC = () => {
  const [data, setData] = useState<PageType<CommentItemType>>({
    currentPage: 1,
    size: 12,
    list: [],
    total: 0
  })
  const [loading, setLoading] = useState<boolean>(false)
  const [handleChange] = useReloadPagination(() => {
    setLoading(true)
    getStoreComments()
      .then(res => setData(res))
      .finally(() => setLoading(false))
  })

  const columns: ColumnsType<CommentItemType> = [
    { title: 'ID', dataIndex: 'id' },
    { title: '内容', dataIndex: 'content', width: 400},
    { title: '评分',
      render: (_, record) => {
      return (<div>
        {
          Array.from( Array(record.rate) ).map((_, i) =>
            <FontIcon name='star' key={i}/>
          )
        }
      </div>)
      }
    },
    {title: '用户',
      render: (_, record) => {
        return (<a>{record.user.alipayAccount?.nickName}</a>)
      }},
    {
      title: '门店',
      render: (_, record) => {
        return (<a>{record.store.name}</a>)
      }
    },
    {title: '创建时间', dataIndex: 'createdAt'}
  ]
  return (<>
    <Table
      loading={loading}
      onChange={e => handleChange({ page: e.current!, size: e.pageSize! })}
      className={style.main}
      columns={columns}
      dataSource={data.list}
      pagination={pageDataConvertPagination(data)}
      rowKey={record => record.id}
    />
  </>)
}


export default TableRender


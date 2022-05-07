import React, {useState} from "react";
import {Table} from "antd";
import {ColumnsType} from "antd/lib/table/interface";
import style from './style.module.less'
import {useReloadPagination} from "@/util/paginationHook";
import {pageDataConvertPagination} from "@/util/paginationUtil";
import {getFeedback} from "@/api/feedback";

const TableRender: React.FC = () => {
  const [data, setData] = useState<PageType<FeedbackItemType>>({
    total: 0,
    currentPage: 1,
    size: 12,
    list: []
  })
  const [loading, setLoading] = useState<boolean>(false)
  const [handleChange ] = useReloadPagination(() => {
    setLoading(true)
    getFeedback()
      .then(res => setData(res))
      .finally(() => setLoading(false))
  })
  const columns: ColumnsType<FeedbackItemType> = [
    { title: 'ID', dataIndex: 'id' },
    {title: '内容', dataIndex: 'content', width: 400},
    {title: '类型', dataIndex: 'flag'},
    {title: '手机', dataIndex: 'phone'},
    {title: '邮箱', dataIndex: 'email'},
    {title: '时间', dataIndex: 'createdAt'}
  ]
  return (<>
  <Table
    loading={loading}
    className={style.main}
    dataSource={data.list}
    columns={columns}
    onChange={e => handleChange({page: e.current!, size: e.pageSize!})}
    pagination={pageDataConvertPagination(data)}
    rowKey={record => record.id}
  />

  </>)
}

export default TableRender

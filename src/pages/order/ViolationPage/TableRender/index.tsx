import React, {useState} from "react";
import {Image, Table} from "antd";
import {ColumnsType} from "antd/lib/table/interface";
import {useReloadPagination} from "@/util/paginationHook";
import {getViolationPageData} from "@/api/violation";
import style from './style.module.less'

const TableRender: React.FC = () => {
  const [data, setData] = useState<PageType<ViolationItemType>>({
    currentPage: 1,
    total: 0,
    list: [],
    size: 10
  })
  const [loading, setLoading] = useState<boolean>(false)
  const [handleChange] = useReloadPagination(() => {
    setLoading(true)
    getViolationPageData()
      .then(res => setData(res))
      .finally(() => setLoading(false))
  })
  const columns: ColumnsType<ViolationItemType> = [
    { title: 'ID', dataIndex: 'id' },
    { title: '标题', dataIndex: 'title' },
    { title: '说明', dataIndex: 'description' },
    { title: '用户', render: (_, record) => {
        return (record.user.alipayAccount?.nickName)
      }},
    {
      title: '图片',
      render: (_, record) => {
        return (
          <>
            {
              record.images.map((src, i) => (
                <Image key={i} src={src} className={style.image}/>
              ))
            }
          </>
        )
      }
    },
    { title: '金额',dataIndex: 'amount' },
    { title: '余下未解冻',dataIndex: 'freezeAmount' },
    { title: '创建时间',dataIndex: 'createdAt' },
  ]
  return (<>
    <Table
      className={style.main}
      loading={loading}
      dataSource={data.list}
      columns={columns}
      onChange={handleChange}
      rowKey={record => record.id}
    />
  </>)
}

export default TableRender

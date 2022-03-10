import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { getStoreReturnGuideThunk } from '@/store/modules/storeGuids'
import { ColumnsType, TablePaginationConfig } from 'antd/lib/table/interface'
import { Image, Table } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import { query2Obj } from '@wuchuhengtools/helper'
import { objectToQueryStr } from '@/util/helper'

const TableRender: React.FC = () => {
  const dispatch = useAppDispatch()
  const handleFetchData = () => {
    dispatch(getStoreReturnGuideThunk()).then(() => {
      console.log("Fetched store's banners.")
    })
  }
  useEffect(() => handleFetchData(), [])
  const columns:ColumnsType<StoreGuideType> = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '店名',
      render: (value, record) => (<>{record.store.name}</>)
    },
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '指南图',
      render: (value, record) => {
        return (
          <Image
            width={100}
            src={`${record.prefixUrl}/${record.imgKey}`}
          />
        )
      }
    }
  ]
  const {returnGuids} = useAppSelector(state => state.storeGuids)
  const navigate = useNavigate()
  const {search, pathname} = useLocation()
  const handleChange = ({current, pageSize}: TablePaginationConfig) => {
    const queryObj = query2Obj(search)
    navigate(pathname + objectToQueryStr( {...queryObj, page: current, size: pageSize} )  )
    handleFetchData()
  }

  return (
    <Table
      columns={columns}
      rowKey={record => record.id}
      dataSource={returnGuids.list}
      onChange={handleChange}
      pagination={{
        current: returnGuids.currentPage,
        total: returnGuids.total,
        pageSize: returnGuids.size
      }}
    />
  )
}

export default TableRender

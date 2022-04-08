import {Image, Spin, Table as AntTable} from "antd";
import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {getBannersThunk} from "@/store/modules/banners";
import {ColumnsType, TablePaginationConfig} from "antd/lib/table/interface";
import ShowDetail from "@/pages/Banner/Table/TableRender/ShowDetail";
import {BannerType} from "@/api/Banners";
import ActionRender from "@/pages/Banner/Table/TableRender/ActionRender";
import EditModal from "@/pages/Banner/Table/TableRender/EditModal";

const TableRender = () => {
  const dispatch = useAppDispatch();
  const imgPrefix = useAppSelector(state => state.configuration.imgPrefix)
  const {list, loading, size, currentPage, total} = useAppSelector(state => state.banners)
  const [detail, setDetail] = useState<{isVisible: boolean; content: string}>({isVisible: false, content: ''})
  const handleShowDetail = (content: string): void =>  {
    setDetail({content, isVisible: true})
  }
  const handleCancelShowDetail = () => setDetail(() => ({...detail, isVisible: false}))
  const [editBannerInfo, setEditBannerInfo] = useState<{visitable: boolean; data: BannerType}>({visitable: false, data: {imgKey:'', id: 0, content: '', title: ''} });
  const columns:ColumnsType = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: '图片',
      dataIndex: 'imgKey',
      key: 'imgKey',
      render: url => <Image src={`${imgPrefix}/${url}`} width={100}  />
    },
    {
      title: '内容',
      dataIndex: 'content',
      key: 'content',
      render: context => (<a onClick={() => handleShowDetail(context)}>查看详情</a>)
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (_:any, record:BannerType  ) => <ActionRender
        data={record}
        onEdit={(banner) => { setEditBannerInfo({visitable: true, data: banner}) } }
      />
    },
  ];
  const handleFetchPageData = (newPage: number): void =>{ dispatch(getBannersThunk(newPage))}
  const handleChange = (pagination: TablePaginationConfig): void => {
    handleFetchPageData(pagination.current!)
  }
  useEffect(() => handleFetchPageData(currentPage) , [])
  const pagination:TablePaginationConfig = {
    pageSize: size,
    total,
    current: currentPage,
    showTotal: () => (<>共{total}条</>)
  }
  return (<Spin spinning={loading}>
    <AntTable
      dataSource={list}
      columns={columns}
      rowKey='id'
      pagination={pagination}
      onChange={(pagination) => handleChange(pagination)}
    />
    <ShowDetail
      content={detail.content}
      isVisible={detail.isVisible}
      onChancel={handleCancelShowDetail}
    />
    <EditModal
      visitable={editBannerInfo.visitable}
      data={editBannerInfo.data}
      onCancel={() => setEditBannerInfo(() => ({...editBannerInfo, visitable: false}))}
      onSuccess={() => setEditBannerInfo(() => ({...editBannerInfo, visitable: false}))}
    />
  </Spin>)
}

export default TableRender

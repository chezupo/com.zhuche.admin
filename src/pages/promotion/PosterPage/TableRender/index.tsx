import React, {useState} from "react";
import style from './style.module.less'
import {Button, Col, Image, Popconfirm, Row, Table} from "antd";
import {ColumnsType} from "antd/lib/table/interface";
import CreateButtonRender from "@/pages/promotion/PosterPage/TableRender/CreateButtonRender";
import {getInitPageData, pageDataConvertPagination} from "@/util/paginationUtil";
import {useReloadPagination} from "@/util/paginationHook";
import {deletePoster, getPosters} from "@/api/promotionPoster";
import EditModalRender from "@/pages/promotion/PosterPage/TableRender/EditModalRender";
import {successMessage} from "@/util/messageUtil";

const TableRender: React.FC = () => {
  const [data, setData] = useState<PageType<PosterItemType>>(getInitPageData())
  const [loading, setLoading] = useState<boolean>(false)
  const [handleChange, forceReload] = useReloadPagination(() => {
    setLoading(false)
    getPosters()
      .then(res => setData(res) )
      .finally(() => setLoading(false))
  })
  const [editPoster, setEditPoster] = useState<PosterItemType | undefined>()
  const handleDelete = (id: number) => {
    setLoading(true)
    deletePoster(id)
      .then(() => {
        successMessage()
        forceReload()
      })
      .finally(() => setLoading(false))
  }

  const columns: ColumnsType<PosterItemType> = [
    { title: 'ID', dataIndex: 'id'},
    { title: '海报', render: (_, record) => { return (<Image src={record.url} width='2rem' />) } },
    { title: '大小', render: (_, record) => record.size },
    { title: '坐标Y', render: (_, record) => record.positionY },
    { title: '坐标x', render: (_, record) => record.positionX },
    { title: '操作', render: (_, record) => {
        return (<>
          <Row gutter={[24, 0]}>
            <Col><Button type='primary' onClick={() => setEditPoster(record)}>编辑</Button></Col>
            <Col>
              <Popconfirm title='你是否要删除?'
                          cancelText='取消'
                          okText='确定'
                          onConfirm={() => handleDelete(record.id)} >
                <Button danger>删除</Button>
              </Popconfirm>
            </Col>
          </Row>
        </>)
      }
    }
  ]
  return (<>
    <div className={style.main}>
      <Row>
        <Col span={24}>
          <CreateButtonRender
            onCreated={() => forceReload()}
          />
        </Col>
        <Col span={24}>
          <Table
            loading={loading}
            className={style.table}
            dataSource={data.list}
            columns={columns}
            rowKey={record => record.id}
            onChange={e => handleChange({
              page: e.current!,
              size: e.pageSize!
            })}
            pagination={pageDataConvertPagination(data)}
          />
        </Col>
      </Row>
    </div>
    {
      editPoster && (<EditModalRender
      formData={editPoster}
      onCancel={() => setEditPoster(undefined)}
      onUpdated={() => {
        setEditPoster(undefined)
        forceReload();
      }}
      />)
    }
  </>)
}

export default TableRender

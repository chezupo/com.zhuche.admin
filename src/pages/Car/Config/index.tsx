import React, {useEffect, useState} from "react";
import HeaderPage from "@/components/HeaderPage";
import ContentContainer from "@/components/ContentContainer";
import style from "./style.module.less"
import {Button, Col, Popconfirm, Row, Spin, Table} from "antd";
import {ColumnsType} from "antd/lib/table/interface";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {destoryStoreCarConfigThunk, getStoreCarConfigsThunk, initThunk} from "@/store/modules/storeCarConfig";
import {useLocation, useNavigate} from "react-router-dom";
import {obj2Query, query2Obj} from "@wuchuhengtools/helper";
import CreateRender from "@/pages/Car/Config/CreateRender";
import Permission from "@/components/Permission";
import EditRender from "@/pages/Car/Config/EditRender";

const Config: React.FC = () => {
  const [prevSearch, setPrevSearch] = useState<string>('')
  const [editStoreCarConfig, setEditStoreCarConfig] = useState<StoreCarConfigItemType | null>(null)
  const dispatch = useAppDispatch()
  const handleDestroy = (id: number) => {
    dispatch(destoryStoreCarConfigThunk(id)).then(() => {
      console.log("Destroy storeCarConfig.")
    })
  }
  const columns:ColumnsType<StoreCarConfigItemType> = [
    {
      title: 'ID',
      dataIndex: 'id'
    },
    {
      title: '配置名',
      dataIndex: 'name'
    },
    {
      title: '归属门店',
      render: (_, record) => {
        return (<>{record.store.name}</>)
      }
    },
    {
      title: '操作',
      render: (_, record) => {
        return (<Row gutter={[24, 0]}>
          <Col>
            <Button
              type='primary'
              onClick={() => setEditStoreCarConfig(record)}
            >
              修改
            </Button>
          </Col>
          <Col>
            <Popconfirm
              title="是否要删除这行数据?"
              cancelText='取消'
              okText='确定'
              onConfirm={() => handleDestroy(record.id)}
            >
              <Button danger>删除</Button>
            </Popconfirm>
          </Col>
        </Row>)
      }
    }
  ]
  const {loading, list} = useAppSelector(state => state.storeCarConfig)
  useEffect(() => {
    if (list.list.length === 0) {
      dispatch(initThunk()).then(() => {
        console.log("Init storeCarConfig.")
      })
    }

  }, [])
  const navigator = useNavigate()
  const {search, pathname} = useLocation()
  const handleChange = ({size, page}: {size: number; page: number}) => {
    const query = obj2Query( { ...query2Obj(search), size, page} )
    navigator(pathname + query)
  }
  if (search !== prevSearch) {
    setPrevSearch(search)
    dispatch(getStoreCarConfigsThunk()).then(() => {
      console.log("Fetch storeCarConfig.")
    })
  }

  return (<>
    <HeaderPage>
      <>用于对本地门店的汽车配置进行管理,帮助用户在小程序过滤搜索时使用</>
    </HeaderPage>

    <ContentContainer>
      <div className={style.main}>
        <Row>
          <Permission roles={['ROLE_BUSINESS']}>
              <Col span={24}>
                <CreateRender />
              </Col>
          </Permission>
          <Col span={24}>
            <Spin spinning={loading}>
            <Table
              columns={columns}
              dataSource={list.list}
              pagination={{
                pageSize: list.size,
                current: list.currentPage,
                total: list.total,
                showTotal: () => (<>共{list.total}条</>)
            }}
              rowKey={record => record.id}
              onChange={pagination => handleChange({size: pagination.pageSize!, page: pagination.current!})}
            />
            </Spin>
          </Col>
        </Row>
        {
          editStoreCarConfig && <EditRender
            onCancel={() => setEditStoreCarConfig(null)}
            data={editStoreCarConfig}
            onSuccess={() => setEditStoreCarConfig(null)}
          />
        }
      </div>
    </ContentContainer>
  </>)

}

export default Config

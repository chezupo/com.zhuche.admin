import React, {useEffect, useState} from "react";
import HeaderPage from "@/components/HeaderPage";
import ContentContainer from "@/components/ContentContainer";
import style from "./style.module.less"
import {Col, Row, Spin, Table} from "antd";
import {ColumnsType} from "antd/lib/table/interface";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {getStoreCarConfigsThunk, initThunk} from "@/store/modules/storeCarConfig";
import {useLocation, useNavigate} from "react-router-dom";
import {obj2Query, query2Obj} from "@wuchuhengtools/helper";
import CreateRender from "@/pages/Car/Config/CreateRender";
import Permission from "@/components/Permission";
import {RoleType} from "@/store/modules/me";

const Config: React.FC = () => {
  const [prevSearch, setPrevSearch] = useState<string>('')
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
      render: () => {
        return (<>hello</>)
      }
    }
  ]
  const {loading, list} = useAppSelector(state => state.storeCarConfig)
  const dispatch = useAppDispatch()
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
          <Permission roles={[RoleType.ROLE_BUSINESS]}>
              <Col span={24}>
                <CreateRender />
              </Col>
          </Permission>
          <Col span={24}>
            <Spin spinning={loading}>
            <Table
              columns={columns}
              dataSource={list.list}
              pagination={{pageSize: list.size, current: list.currentPage, total: list.total}}
              rowKey={record => record.id}
              onChange={pagination => handleChange({size: pagination.pageSize!, page: pagination.current!})}
            />
            </Spin>
          </Col>
        </Row>
      </div>
    </ContentContainer>
  </>)

}

export default Config

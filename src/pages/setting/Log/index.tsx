import React, {useEffect, useState} from "react";
import HeaderPage from "@/components/HeaderPage";
import ContentContainer from "@/components/ContentContainer";
import {Modal, Spin, Table, Tag} from "antd";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import style from "./style.module.less"
import {ColumnsType} from "antd/lib/table/interface";
import {getLogsThunk, initThunk} from "@/store/modules/log";
import {useLocation, useNavigate} from "react-router-dom";
import {obj2Query, query2Obj} from "@wuchuhengtools/helper";
import { prettyPrintJson } from "pretty-print-json"


const Log: React.FC = () => {
  const [detail, setDetail] = useState<object | null>(null)
  const [prevSearch, setPrevSearch] = useState<string>('')
  const columns: ColumnsType<LogItemType>  = [
    {
      title: 'ID',
      dataIndex: 'id'
    },
    {
      title: '标题',
      dataIndex: 'title'
    },
    {
      title: '说明',
      dataIndex: 'description',
    },
    {
      title: '操作类型',
      dataIndex: 'type',
      render: (_, record) => {
        switch (record.type) {
          case 'CREATED':
            return <Tag color='green'>创建</Tag>
          case 'DELETED':
            return <Tag color='red'>删除</Tag>
          case 'UPDATED':
            return <Tag color='yellow'>更新</Tag>
        }
        return <></>
      }
    },
    {
      title: '处理的文件',
      dataIndex: 'className',
      render: (v) => {
        return (<a onClick={() => setDetail({file: v})}>查看</a>)
      }
    },
    {
      title: '数据',
      dataIndex: 'params',
      render: (v) => {
        return (<a onClick={() => setDetail(JSON.parse(v))}>查看</a>)
      }
    },
    {
      title: '请求URL',
      render: (_, record) => {
        return (<>{record.requestPath}</>)
      }
    },
    {
      title: '操作者',
      render: (_, record) => {
        return (<>{record.user.username}</>)
      }
    },
    {
      title: '操作时间',
      render: (_, record) => {
        return (<>{record.createdAt}</>)
      }
    }
  ]
  const logs = useAppSelector(state => state.log)
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (logs.list.list.length === 0 ) {
      dispatch(initThunk()).then(() => {
        console.log("Init logs.")
      })
    }

  }, [])
  const navigator = useNavigate();
  const {search, pathname} = useLocation();
  const handleChange = (size: number, page: number) => {
    const searchObj = query2Obj(search)
    navigator(pathname + obj2Query({
      ...searchObj,
      page,
      size: size
    }))
  }
  if (prevSearch != search) {
    dispatch(getLogsThunk()).then(() => {
      console.log("Get logs.")
    })
    setPrevSearch(search)
  }

  return (<>
    <HeaderPage>
      <>查看管理员的操作记录</>
    </HeaderPage>
    <ContentContainer>
      <Spin spinning={logs.loading}>
        <Modal
          visible={!!detail}
          footer={null} onCancel={() => setDetail(null)}
          width={"50%"}
        >
          {
            !!detail &&
            <pre dangerouslySetInnerHTML={{__html:
                prettyPrintJson.toHtml(detail)
            }} >
            </pre>
          }
        </Modal>
        <div className={style.main}>
          <Table
            onChange={page => handleChange(page.pageSize!, page.current!)}
            columns={columns}
            rowKey={record => record.id}
            dataSource={logs.list.list}
            pagination={{
              pageSize: logs.list.size,
              total: logs.list.total,
              current: logs.list.currentPage,
              showTotal: () => (<>共{logs.list.total}条</>)
            }}
          />
        </div>
      </Spin>
    </ContentContainer>

  </>)
}

export default Log

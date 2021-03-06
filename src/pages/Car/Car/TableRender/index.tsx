import React, {useEffect, useState} from "react";
import {Button, Col, Image, Popconfirm, Row, Table, Tag} from "antd";
import Permission from "@/components/Permission";
import CreateModal from "@/pages/Car/Car/TableRender/CreateModal";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {deleteThunk, fetchThunk, initThunk} from "@/store/modules/car";
import {ColumnsType} from "antd/lib/table/interface";
import {getPageQuery} from "@/util/paginationUtil";
import {useLocation, useNavigate} from "react-router-dom";
import {obj2Query} from "@wuchuhengtools/helper";
import PaginationListener from "@/components/PaginationListener";
import EditModel from "@/pages/Car/Car/TableRender/EditModel";
import {successMessage} from "@/util/messageUtil";

const TableRender: React.FC = () => {
  const dispatch = useAppDispatch()
  const {roles} = useAppSelector(state => state.me)
  const [editCarItem, setEditCarItem] = useState<CarItemType | null>( null)
  const {list, loading} = useAppSelector(state => state.cars)
  useEffect(() => {
    if (list.list.length === 0) {
      dispatch(initThunk()).then(() => {
        console.log("Fetch cars.")
      })
    }
  }, [])
  const isAdmin: boolean = roles.includes('ROLE_ADMIN')
  const handleDelete = (id: number) => {
    dispatch(deleteThunk(id)).then(() => {
      successMessage()
    })
  }
  const columns:ColumnsType<CarItemType> = [
    { title: 'ID', dataIndex: 'id', fixed: 'left', width: 100},
    { title: '名称', dataIndex: 'name', fixed: 'left', width: 100 },
    {title: '押金', dataIndex: 'deposit',
      fixed: 'left',
      width: 100,
      render: deposit => `￥${deposit.toFixed(2)}`
    },
    {title: '租金(天)', dataIndex: 'rent',
      fixed: 'left',
      width: 150,
      render: rent => `￥${rent.toFixed(2)}`
    },
    { title: '手续费', dataIndex: 'handlingFee', width: 100 , render: handleFee => `￥${handleFee.toFixed(2)}`,
      fixed: 'left',
    },
    { title: '驾无忧(天)', dataIndex: 'insuranceFee', width: 150, render: insuranceFee => `￥${insuranceFee.toFixed(2)}`, fixed: 'left' },
    { title: '封面', dataIndex: 'cover', width: 100,
      fixed: 'left',
      render: src => <Image src={src} width={'2rem'} />
    },
    ...(isAdmin ? [
      {
        title: '归属门店',
        width: 150,
        render: (_: any, record: { store: { name: string } }) => record.store.name

      }
    ] : []),
    { title: '排量', dataIndex: 'displacement', width: 100, render: displacement => `${displacement.toFixed(1)}`},
    {
      title: '用户自助',
      width: 100,
      render: (_, record) => {
        switch (record.isSelfHelp) {
          case true:
            return <Tag color='green'>是</Tag>
          case false:
            return <Tag color='red'>否</Tag>
        }
      }
    },
    {
      title: '类型',
      width: 100,
      render: (_, record) => {
        return (<>{record.carCategory.name}</>)
      }
    },
    {
      title: '挂档方式',
      width: 100,
      dataIndex: 'shift',
      render: (_, record) => {
        switch (record.shift) {
          case "AUTO":
            return (<>自动档</>)
          case "MANUAL":
            return '手动档'
        }
      }
    },
    { title: '油量(L)', dataIndex: 'gasVolume', width: 100, render: gasVolume => `${gasVolume.toFixed(1)}L`  },
    { title: '座位数', dataIndex: 'seats', width: 100, render: seats => `${seats}座` },
    {title: '车型', dataIndex: 'type', width: 100},
    {title: '车牌号', dataIndex: 'number', width: 100},
    {title: '上/下架', dataIndex: 'isOnline', width: 100,
      render: (_, record) => {
        switch (record.isOnline) {
          case true: return <Tag color='green'>上架</Tag>;
          case false: return <Tag color='red'>下架</Tag>
        }
      }
    },
    {title: '车系', width: 100,
      render: (_, record) => {
        return <>{record.brandSeries.name}</>
      }
    },
    {title: '动力类型',
      width:100,
      render: (_, record) => {
        switch (record.powerType) {
          case "ELECTRIC":
            return (<>纯电动</>)
          case "ELECTRIC_GAS":
            return (<>油电混合</>)
          case "GAS":
            return (<>油</>)
        }
      }
    },
    {title: '发动机类型',
      width:150,
      render: (_, record) => {
        switch ( record.engineType ) {
          case "NATURALLY_ASPIRATED":
            return <>自然吸气</>
          case "SUPERCHARGED":
            return <>增压</>
        }
      }
    },
    {title: '标签',
      width:150,
      render: (_, record) => {
        return (
          <>
            {
              record.tags.map((el, i) => (<Tag key={i}>{el}</Tag>))
            }
          </>
        )
      }
    },
    {title: '汽车配置',
      width: 150,
      render: (_, record) =>
        (<Row gutter={[12, 0]}>
          {
            record.configs.map(el => (
              <Col key={el.id}>
                {el.name}
              </Col>
            ))
          }
        </Row>)
    },
    {title: '修改时间',
      width: 150,
      render: (_, record) => record.updatedAt
    },
    {title: '创建时间',
      width: 150,
      render: (_, record) => record.createdAt
    },
    {title: '操作',
      width: 200,
      fixed: 'right',
      render: (_, record) => {
      return <Row gutter={[12, 0]}>
        <Col>
          <Button type='primary' onClick={() => setEditCarItem(record)} >编辑</Button>
        </Col>
        <Col>
          <Popconfirm placement="top" title='是否确定要删除?' onConfirm={() => handleDelete(record.id)} okText="是" cancelText="否">
          <Button danger>删除</Button>
          </Popconfirm>
        </Col>
      </Row>
      }
    }
  ]
  const {search} = useLocation()
  const handleFetch = () => {
    // const obj = query2Obj(search)
    // if (!((obj.page && obj.page === '1' || !obj.page) && list.list.length > 0 )) {
      dispatch(fetchThunk()).then(() => {
        console.log("Fetched cars.")
      })
    // }
  }
  const navigator = useNavigate()
  const handleChange = (page: number, size: number) => {
    const {pathname}  = document.location
    const queryObj = getPageQuery(page, size)
    const queryStr = obj2Query({...queryObj, page, size})
    navigator(pathname + queryStr)
  }

  return (<>
    <PaginationListener onChange={handleFetch} />
    <Row gutter={[0, 12]}>
      <Permission roles={['ROLE_BUSINESS']} >
        <Col span={24}>
          <CreateModal />
        </Col>
      </Permission>
      <Col span={24} onClick={e => e.stopPropagation()}>
          <Table
            scroll={{ x: 1300 }}
            loading={loading}
            columns={columns}
            dataSource={list.list}
            pagination={{
              pageSize: list.size,
              current: list.currentPage,
              total: list.total,
              showTotal: () => (<>共{list.total}条</>)
          }}
            rowKey={record => record.id }
            onChange={e => handleChange(e.current!, e.pageSize!)}
          />
      </Col>
    </Row>
    <EditModel data={editCarItem} onSuccess={() => setEditCarItem(null)} onCancel={() => setEditCarItem(null)} />
  </>)
}

export default TableRender

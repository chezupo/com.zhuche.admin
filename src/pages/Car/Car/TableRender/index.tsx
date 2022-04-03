import React, {useEffect} from "react";
import {Col, Form, Row, Table, Image, Button, Tag} from "antd";
import Permission from "@/components/Permission";
import {RoleType} from "@/store/modules/me";
import CreateModal from "@/pages/Car/Car/TableRender/CreateModal";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {initThunk} from "@/store/modules/car";
import {ColumnsType} from "antd/lib/table/interface";

const TableRender: React.FC = () => {
  const dispatch = useAppDispatch()
  const {list, loading} = useAppSelector(state => state.cars)
  useEffect(() => {
    if (list.list.length === 0) {
      dispatch(initThunk()).then(() => {
        console.log("Fetch cars.")
      })
    }
  }, [])
  const columns:ColumnsType<CarItemType> = [
    { title: 'ID', dataIndex: 'id', fixed: 'left', width: 100},
    { title: '名称', dataIndex: 'name', fixed: 'left', width: 100 },
    {title: '押金', dataIndex: 'deposit',
      fixed: 'left',
      width: 100
    },
    {title: '价格(天)', dataIndex: 'price',
      fixed: 'left',
      width: 150
    },
    { title: '封面', dataIndex: 'cover', width: 100,
      fixed: 'left',
      render: src => <Image src={src} width={'2rem'} />
    },
    { title: '排量', dataIndex: 'displacement', width: 100 },
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
    { title: '油量(L)', dataIndex: 'gasVolume', width: 100  },
    { title: '座位数', dataIndex: 'seats', width: 100 },
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
    {title: '价格(元/1天)', dataIndex: 'price', width: 150},
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
    {title: '创建时间',
      width: 150,
      render: (_, record) => {
      return record.createdAt
      }
    },
    {title: '操作',
      width: 200,
      fixed: 'right',
      render: (_, record) => {
      return <Row>
        <Col>
          <Button type='primary' >编辑</Button>
        </Col>
      </Row>
      }
    }
  ]

  return (<>
    <Row gutter={[0, 12]}>
      <Permission roles={[RoleType.ROLE_BUSINESS]} >
        <Col span={24}>
          <CreateModal />
        </Col>
      </Permission>
      <Col span={24}>
        <Table
          scroll={{ x: 1300 }}
          loading={loading}
          columns={columns}
          dataSource={list.list}
          rowKey={record => record.id }
        />
      </Col>
    </Row>
  </>)
}

export default TableRender

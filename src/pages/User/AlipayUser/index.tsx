import React, {useState} from "react";
import HeaderPage from "@/components/HeaderPage";
import ContentContainer from "@/components/ContentContainer";
import style from './style.module.less';
import {Col, Image, Row, Table} from "antd";
import {ColumnsType} from "antd/lib/table/interface";
import {getAlipayUsers} from "@/api/users";
import BooleanTag from "@/components/BooleanTag";
import {isPromoter} from "@/util/AuthUtil";
import PromoterRender from "@/pages/User/components/PromoterRender";
import {useIsReloadPagination} from "@/util/paginationHook";
import FilterRender from "@/pages/User/AlipayUser/FilterRender";

const AlipayUser: React.FC = () => {
  const [data, setData] = useState<PageType<UserType>>({ list: [], total: 0, size: 12, currentPage: 1 })
  const [loading, setLoading] = useState<boolean>(false)
  const setReloadPagination= useIsReloadPagination(
    () => {
      setLoading(true)
      getAlipayUsers().then(res => {
        setData(res)
      }).finally(() => setLoading(false))
    }
  );
  const handleChange = (newPage:number, size: number) => {
    setReloadPagination({page: newPage, size})
  }
  const handleChangeUserRole = (newUser: UserType) => {
    const newUserList = data.list.map(user => user.id === newUser.id ? newUser : user)
    setData({...data, list: newUserList})
  }

  const columns: ColumnsType<UserType> = [
    { title: 'ID', render: (_, record) => record.id },
    { title: '昵称', render: (_, record)  => record.alipayAccount?.nickName || '(匿名)' },
    { title: '头像', render: (_, record)  => { return (<Image src={record.alipayAccount?.avatar} width={'1rem'}/>) } },
    { title: '城市', render: (_, record)  => record.alipayAccount?.city || '(暂无)' },
    { title: '手机号', render: (_, record)  => record.alipayAccount?.phone|| '(暂无)' },
    { title: '省份', render: (_, record)  => record.alipayAccount?.province|| '(暂无)' },
    { title: '性别', render: (_, record)  => {
      if (!record.alipayAccount?.gender) {
        return '无'
      }
      return record.alipayAccount.gender.toLocaleLowerCase() === 'm' ? '男' : '女'
    }},
    {
      title: '是否业务员',
      render: (_, record) => {
        return ( <BooleanTag isOk={ isPromoter(record.roles)} /> )
      }
    },
    { title: '创建时间', render: (_, record)  => record.alipayAccount?.createdAt },
    { title: '操作', render: (_, record)  => {
        return (
          <Row>
            <PromoterRender
              id={record.id}
              roles={record.roles}
              onChange={handleChangeUserRole}
            />
          </Row>
        )
      }},
  ]

  return (<>
    <HeaderPage>
      支付宝小程序的用户
    </HeaderPage>
    <ContentContainer >
      <Row gutter={[0, 24]}>
        <Col span={24}>
          <FilterRender />
        </Col>
        <Col span={24}>
          <div className={style.main}>
          <Table
            loading={loading}
            dataSource={data.list}
            rowKey={record => record.id}
            columns={columns}
            pagination={{
              total: data.total,
              pageSize: data.size,
              current: data.currentPage,
              showTotal: () => `共${data.total}条`
            }}
            onChange={e => handleChange(e.current!, e.pageSize!)}
          />
          </div>
        </Col>
    </Row>


    </ContentContainer>
  </>)
}

export default AlipayUser

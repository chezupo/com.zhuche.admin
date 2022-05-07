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
import {useReloadPagination} from "@/util/paginationHook";
import FilterRender from "@/pages/User/AlipayUser/FilterRender";
import CouponModal from "@/pages/User/components/CouponModal";
import {useNavigate} from "react-router-dom";
import {obj2Query} from "@wuchuhengtools/helper";
import {pageDataConvertPagination} from "@/util/paginationUtil";
import MarkSearchKeyword from "@/components/MarkSearchKeyword";

const AlipayUser: React.FC = () => {
  const [data, setData] = useState<PageType<UserItemType>>({ list: [], total: 0, size: 12, currentPage: 1 })
  const [loading, setLoading] = useState<boolean>(false)
  const [setReloadPagination, refreshPagination]= useReloadPagination(
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
  const handleChangeUserRole = (newUser: UserItemType) => {
    const newUserList = data.list.map(user => user.id === newUser.id ? newUser : user)
    setData({...data, list: newUserList})
  }
  const navigate = useNavigate()
  const columns: ColumnsType<UserItemType> = [
    { title: 'ID', render: (_, record) => record.id },
    { title: '昵称', render: (_, record)  => {
        if (!record.alipayAccount?.nickName ) {
          return record.alipayAccount?.nickName || '(匿名)'
        }
        return <MarkSearchKeyword text={record.alipayAccount?.nickName || ''} pathParamKeyword={'nickname'} />
      }
    },
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
    {
      title: '优惠卷',
      render: (_, record) => {
        const content = record.userCoupons.length + '张'
        if (record.userCoupons.length > 0) {
          return <a onClick={() => navigate('/coupon/userCoupons' + obj2Query({userId: record.id}))} >{content}</a>
        }
        return content;
      }
    },
    { title: '创建时间', render: (_, record)  => record.alipayAccount?.createdAt },
    { title: '操作', render: (_, record)  => {
        return (
          <Row gutter={[12, 0]}>
            <PromoterRender
              id={record.id}
              roles={record.roles}
              onChange={handleChangeUserRole}
            />
            <CouponModal
              id={record.id}
              nickname={record.alipayAccount?.nickName}
              onSuccess={refreshPagination}
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
            pagination={pageDataConvertPagination(data)}
            onChange={e => handleChange(e.current!, e.pageSize!)}
          />
          </div>
        </Col>
    </Row>
    </ContentContainer>
  </>)
}

export default AlipayUser

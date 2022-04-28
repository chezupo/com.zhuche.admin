import React from 'react'
import HeaderPage from "@/components/HeaderPage";
import ContentContainer from "@/components/ContentContainer";
import {Col, Image, Popover, Row, Table} from "antd";
import style from './style.module.less';
import {ColumnsType} from "antd/lib/table/interface";
import BooleanTag from "@/components/BooleanTag";
import {orderStatusMapChinese} from "@/util/orderUtil";
import {dateConvertStr} from "@/util/dateUtil";
import {useReloadPagination} from "@/util/paginationHook";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {getOrderThunk} from "@/store/modules/order";
import {pageDataConvertPagination} from "@/util/paginationUtil";
import StoreFieldRender from "@/pages/order/Order/StoreFieldRender";
import UserFieldRender from "@/pages/order/Order/UserFieldRender";
import CarDetailFieldRender from "@/pages/order/Order/CarDetailFieldRender";
import ActionFieldRender from "@/pages/order/Order/ActionFieldRender";

const Order: React.FC = () => {
  const handleCarPickup = (order: OrderItemType) => {
    console.log("carpick")
  }

  const columns: ColumnsType<OrderItemType> = [
    { title:'ID', dataIndex: 'id', fixed: 'left', width: 100 },
    {
      title: '单号',
      render: (_, record) => {
        if (record.payType == 'ALIPAY' ) {
          return record.alipayTradeNo
        } else {
          return record.wechatTradeNo
        }
      },
      fixed: 'left', width: 150
    },
    { title: '标题', dataIndex: 'title', fixed: 'left', width: 150 },
    { title: '租金', dataIndex: 'rent', render: (rent) => `¥${rent}`, fixed: 'left', width: 100 },
    { title: '押金', dataIndex: 'deposit', render: deposit => `¥${deposit}`,  fixed: 'left', width: 100 },
  { title: '手续费', dataIndex: 'handlingFee', render: handlingFee => `¥${handlingFee}` , fixed: 'left', width: 100},
    { title: '合计', render: (_, record) => `¥${record.amount}`, width: 100},
    { title: '是否使用驾无忧', dataIndex: 'isInsurance', render: isInsurance => <BooleanTag isOk={isInsurance} /> ,  width: 150},
    { title: '驾无忧费用', dataIndex: 'insuranceFee', render: insuranceFee => `¥${insuranceFee}`, width: 150},
    { title: '减免费用', dataIndex: 'waiverAmount', render: waiverAmount => `¥${waiverAmount}`,  width: 150},
    { title: '总费用', dataIndex: 'amount', render: amount => `¥${amount}` , width: 150},
    { title: '图片', dataIndex: 'cover', render: cover =>  <Image
        src={cover}
        style={{height: '1rem'}}

      /> , width: 150},
    {
      title: '支付方式', dataIndex: ': OrderPayType', render:  payType=> {
        if (payType === 'ALIPAY') {
          return '支付宝'
        } else {
          return '微信'
        }
      },
      width: 150
    },
    { title: '订单状态', render: (_, record) => orderStatusMapChinese[record.status], width: 200},
    {title: '还车商店', render: (_, record) => (<StoreFieldRender data={ record.endStore } /> ) , width: 150},
    { title: '取车商店', render: (_, record) => (<StoreFieldRender data={ record.startStore} /> ) , width: 150},
    { title: '用户', render: (_, record) => (<UserFieldRender user={record.user} />) , width: 150},
    { title: '车子详情', render: (_, record) => (<CarDetailFieldRender car={record.car} />) , width: 150},
    { title: '取车时间', render: (_, record) => dateConvertStr( new Date( record.startTimeStamp ) ) , width: 150},
    { title: '创建时间', render: (_, record) => dateConvertStr(new Date(record.createdAt)) , width: 150},
    { title: '操作', render: (_, record) => { return (<ActionFieldRender
        order={record}
        onCarPickup={() => handleCarPickup(record)}
      />) }, width: 300, fixed: 'right'},
  ];
  const {loading, pageData} = useAppSelector(state => state.orders)
  const dispatch = useAppDispatch()
  const [reloadPage] = useReloadPagination(() => {
      dispatch(getOrderThunk()).then(() => {
        console.log("loading order.")
      })
  });

  return <>
    <HeaderPage>
      用于管理订单列表
    </HeaderPage>
    <ContentContainer>
      <Row className={style.main}>
        <Col span={24}>
          <Table
            loading={loading}
            columns={columns}
            className={style.table}
            dataSource={pageData.list}
            rowKey={record => record.id}
            onChange={p => reloadPage({page: p.current!, size: p.pageSize!}) }
            pagination={pageDataConvertPagination(pageData)}
            scroll={{ x: 1300 }}
          />
        </Col>
      </Row>
    </ContentContainer>
  </>
}

export default Order

/**
 *  This file is part of emailNotes.
 *
 * @Description Say something for this file.
 * @Author      wuchuheng<root@wuchuheng.com>
 * @Time        2022/12/3 09:50
 */
import React from 'react';
import { Col, Image, Row } from 'antd';
import BooleanTag from '@/components/BooleanTag';
import { orderStatusMapChinese } from '@/util/orderUtil';
import StoreFieldRender from '@/pages/order/Order/StoreFieldRender';
import UserFieldRender from '@/pages/order/Order/UserFieldRender';
import { dateConvertStr } from '@/util/dateUtil';
import CarDetailFieldRender from '@/pages/order/Order/CarDetailFieldRender';

const VisitOrder: React.FC<{ order: OrderItemType }> = ({ order: record }) => {
  const CoverHandleFee: React.FC = () => {
    if (record.waiverHandlingFee > 0) {
      return (
        <>
          <span style={{ textDecoration: 'line-through' }}>
            ¥ {(record.handlingFee + record.waiverHandlingFee).toFixed(2)}
          </span>
          <span style={{ marginLeft: '.5em' }}>
            ¥ {record.handlingFee.toFixed(2)}
          </span>
        </>
      );
    }

    return <>¥{record.handlingFee}</>;
  };
  const CovertPayType: React.FC = () => {
    if (record.payType === 'ALIPAY') {
      return <>支付宝</>;
    } else {
      return <>微信</>;
    }
  };

  const labelWidth = 6;
  return (
    <>
      <Row>
        <Col span={labelWidth}>ID: </Col>
        <Col span={24 - labelWidth}>{record.id}</Col>
      </Row>
      <Row>
        <Col span={labelWidth}>单号: </Col>
        <Col span={24 - labelWidth}>{record.outTradeNo}</Col>
      </Row>
      <Row>
        <Col span={labelWidth}>标题: </Col>
        <Col span={24 - labelWidth}>{record.title}</Col>
      </Row>
      <Row>
        <Col span={labelWidth}>租金: </Col>
        <Col span={24 - labelWidth}>
          <span style={{ textDecoration: 'line-through' }}>
            ¥{(record.rent + record.waiverRent).toFixed(2)}
          </span>
          <span style={{ marginLeft: '.5em' }}>¥{record.rent.toFixed(2)}</span>
        </Col>
      </Row>
      <Row>
        <Col span={labelWidth}>押金: </Col>
        <Col span={24 - labelWidth}>¥ {record.deposit}</Col>
      </Row>
      <Row>
        <Col span={labelWidth}>手续费: </Col>
        <Col span={24 - labelWidth}>
          <CoverHandleFee />
        </Col>
      </Row>
      <Row>
        <Col span={labelWidth}>驾无忧: </Col>
        <Col span={24 - labelWidth}>¥ {record.insuranceFee.toFixed(2)}</Col>
      </Row>
      <Row>
        <Col span={labelWidth}>减免费用: </Col>
        <Col span={24 - labelWidth}>
          ¥ {(record.waiverHandlingFee + record.waiverRent).toFixed(2)}
        </Col>
      </Row>
      <Row>
        <Col span={labelWidth}>合计: </Col>
        <Col span={24 - labelWidth}>¥ {record.amount.toFixed(2)}</Col>
      </Row>
      <Row>
        <Col span={labelWidth}>是否使用驾无忧: </Col>
        <Col span={24 - labelWidth}>
          <BooleanTag isOk={record.isInsurance} />
        </Col>
      </Row>
      <Row>
        <Col span={labelWidth}>封面: </Col>
        <Col span={24 - labelWidth}>
          <Image src={record.cover} style={{ height: '1rem' }} />
        </Col>
      </Row>
      <Row>
        <Col span={labelWidth}>支付方式: </Col>
        <Col span={24 - labelWidth}>
          <CovertPayType />
        </Col>
      </Row>
      <Row>
        <Col span={labelWidth}>订单状态: </Col>
        <Col span={24 - labelWidth}>{orderStatusMapChinese[record.status]}</Col>
      </Row>
      <Row>
        <Col span={labelWidth}>还车门店: </Col>
        <Col span={24 - labelWidth}>
          <StoreFieldRender data={record.endStore} />
        </Col>
      </Row>
      <Row>
        <Col span={labelWidth}>取车门店: </Col>
        <Col span={24 - labelWidth}>
          <StoreFieldRender data={record.startStore} />
        </Col>
      </Row>
      <Row>
        <Col span={labelWidth}>用户: </Col>
        <Col span={24 - labelWidth}>
          <UserFieldRender user={record.user} />
        </Col>
      </Row>
      <Row>
        <Col span={labelWidth}>车子详情: </Col>
        <Col span={24 - labelWidth}>
          {<CarDetailFieldRender car={record.car} />}
        </Col>
      </Row>
      <Row>
        <Col span={labelWidth}>取车时间: </Col>
        <Col span={24 - labelWidth}>
          {dateConvertStr(new Date(record.startTimeStamp))}
        </Col>
      </Row>
      <Row>
        <Col span={labelWidth}>还车时间: </Col>
        <Col span={24 - labelWidth}>
          {dateConvertStr(new Date(record.endTimeStamp))}
        </Col>
      </Row>
      <Row>
        <Col span={labelWidth}>时长(天): </Col>
        <Col span={24 - labelWidth}>
          {(
            (record.endTimeStamp - record.startTimeStamp) /
            (24 * 60 * 60 * 1000)
          ).toFixed(1)}{' '}
          天
        </Col>
      </Row>
      <Row>
        <Col span={labelWidth}>创建时间: </Col>
        <Col span={24 - labelWidth}>
          {dateConvertStr(new Date(record.createdAt))}
        </Col>
      </Row>
    </>
  );
};

export default VisitOrder;

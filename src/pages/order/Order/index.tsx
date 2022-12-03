import React, { useState } from 'react';
import HeaderPage from '@/components/HeaderPage';
import ContentContainer from '@/components/ContentContainer';
import { Col, Image, Modal, Row, Table } from 'antd';
import style from './style.module.less';
import { ColumnsType } from 'antd/lib/table/interface';
import BooleanTag from '@/components/BooleanTag';
import { orderStatusMapChinese } from '@/util/orderUtil';
import { dateConvertStr } from '@/util/dateUtil';
import { useReloadPagination } from '@/util/paginationHook';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getOrderThunk } from '@/store/modules/order';
import { pageDataConvertPagination } from '@/util/paginationUtil';
import StoreFieldRender from '@/pages/order/Order/StoreFieldRender';
import UserFieldRender from '@/pages/order/Order/UserFieldRender';
import CarDetailFieldRender from '@/pages/order/Order/CarDetailFieldRender';
import ActionFieldRender, {
  RenewFormType,
} from '@/pages/order/Order/ActionFieldRender';
import {
  confirmFinished,
  ConfirmPickerCarType,
  confirmPickUpCar,
  renewingOrder,
  unfreezeOrder,
} from '@/api/order';
import { successMessage } from '@/util/messageUtil';
import FilterRender from '@/pages/order/Order/FilterRender';
import ConfirmPickerCarFormRender from '@/pages/order/Order/ConfirmPickerCarFormRender/indexi';

const Order: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { pageData } = useAppSelector((state) => state.orders);
  const dispatch = useAppDispatch();
  const [reloadPage, forceReload] = useReloadPagination(() => {
    setLoading(true);
    dispatch(getOrderThunk())
      .then(() => {
        console.log('loading order.');
      })
      .finally(() => setLoading(false));
  });
  /**
   * 确认取车
   * @param order
   */
  const [pickOrder, setPickOrder] = useState<OrderItemType | undefined>();
  const handleCarPickup = async (
    order: OrderItemType,
    value: ConfirmPickerCarType
  ) => {
    await confirmPickUpCar(order.id, value);
    successMessage();
    forceReload();
    setPickOrder(undefined);
  };
  const handleFinishedOrder = async (order: OrderItemType) => {
    await confirmFinished(order.id);
    successMessage();
    forceReload();
  };
  const handleUnfreeze = (order: OrderItemType) => {
    setLoading(true);
    unfreezeOrder(order.id)
      .then(() => {
        successMessage();
        forceReload();
      })
      .finally(() => setLoading(false));
  };
  const onRenewing = async (
    order: OrderItemType,
    form: RenewFormType
  ): Promise<boolean> => {
    const result = await form.validateFields();
    setLoading(true);
    try {
      await renewingOrder(order.id, result);
      successMessage();
      await forceReload();
      return true;
    } finally {
      setLoading(false);
    }
    return false;
  };
  const columns: ColumnsType<OrderItemType> = [
    { title: 'ID', dataIndex: 'id', fixed: 'left', width: 100 },
    {
      title: '单号',
      render: (_, record) => {
        return record.outTradeNo;
      },
      fixed: 'left',
      width: 150,
    },
    { title: '标题', dataIndex: 'title', fixed: 'left', width: 150 },
    {
      title: '租金',
      render: (rent, record) => {
        if (record.waiverRent > 0) {
          return (
            <>
              <span style={{ textDecoration: 'line-through' }}>
                ¥{(record.rent + record.waiverRent).toFixed(2)}
              </span>
              <span style={{ marginLeft: '.5em' }}>
                ¥{record.rent.toFixed(2)}
              </span>
            </>
          );
        }
        return `¥${record.rent}`;
      },
      width: 150,
    },
    {
      title: '押金',
      dataIndex: 'deposit',
      render: (deposit) => `¥${deposit}`,
      width: 100,
    },
    {
      title: '手续费',
      dataIndex: 'handlingFee',
      render: (handlingFee, record) => {
        if (record.waiverHandlingFee > 0) {
          return (
            <>
              <span style={{ textDecoration: 'line-through' }}>
                ¥{(handlingFee + record.waiverHandlingFee).toFixed(2)}
              </span>
              <span style={{ marginLeft: '.5em' }}>
                ¥{record.handlingFee.toFixed(2)}
              </span>
            </>
          );
        }
        return `¥${handlingFee}`;
      },
      width: 150,
    },
    {
      title: '驾无忧费用',
      dataIndex: 'insuranceFee',
      render: (insuranceFee) => `¥${insuranceFee.toFixed(2)}`,
      width: 150,
    },
    {
      title: '未解冻费用',
      dataIndex: 'unfreezeAmount',
      render: (insuranceFee) => `¥${insuranceFee.toFixed(2)}`,
      width: 150,
    },
    {
      title: '减免费用',
      render: (_, record) =>
        `¥${(record.waiverHandlingFee + record.waiverRent).toFixed(2)}`,
      width: 150,
    },
    {
      title: '合计',
      render: (_, record) => `¥${record.amount.toFixed(2)}`,
      width: 100,
    },
    {
      title: '是否使用驾无忧',
      dataIndex: 'isInsurance',
      render: (isInsurance) => <BooleanTag isOk={isInsurance} />,
      width: 150,
    },
    {
      title: '图片',
      dataIndex: 'cover',
      render: (cover) => <Image src={cover} style={{ height: '1rem' }} />,
      width: 150,
    },
    {
      title: '支付方式',
      render: (_, record) => {
        console.log(record.payType);
        if (record.payType === 'ALIPAY') {
          return '支付宝';
        } else {
          return '微信';
        }
      },
      width: 150,
    },
    {
      title: '订单状态',
      render: (_, record) => orderStatusMapChinese[record.status],
      width: 200,
    },
    {
      title: '还车门店',
      render: (_, record) => <StoreFieldRender data={record.endStore} />,
      width: 150,
    },
    {
      title: '取车门店',
      render: (_, record) => <StoreFieldRender data={record.startStore} />,
      width: 150,
    },
    {
      title: '用户',
      render: (_, record) => <UserFieldRender user={record.user} />,
      width: 150,
    },
    {
      title: '车子详情',
      render: (_, record) => <CarDetailFieldRender car={record.car} />,
      width: 150,
    },
    {
      title: '取车时间',
      render: (_, record) => dateConvertStr(new Date(record.startTimeStamp)),
      width: 150,
    },
    {
      title: '还车时间',
      render: (_, record) => dateConvertStr(new Date(record.endTimeStamp)),
      width: 150,
    },
    {
      title: '创建时间',
      render: (_, record) => dateConvertStr(new Date(record.createdAt)),
      width: 150,
    },
    {
      title: '操作',
      render: (_, record) => (
        <ActionFieldRender
          onUnfreeze={() => handleUnfreeze(record)}
          onFinishedOrder={handleFinishedOrder}
          onSuccessViolation={() => forceReload()}
          order={record}
          onCarPickup={() => setPickOrder(record)}
          onRenewing={(form) => onRenewing(record, form)}
        />
      ),
      width: 250,
      fixed: 'right',
    },
  ];

  return (
    <>
      <HeaderPage>用于管理订单列表</HeaderPage>
      <ContentContainer>
        <Row className={style.main} gutter={[0, 24]}>
          <Col span={24}>
            <FilterRender />
          </Col>
          <Col span={24}>
            <Table
              loading={loading}
              columns={columns}
              className={style.table}
              dataSource={pageData.list}
              rowKey={(record) => record.id}
              onChange={(p) =>
                reloadPage({ page: p.current!, size: p.pageSize! })
              }
              pagination={pageDataConvertPagination(pageData)}
              scroll={{ x: 1300 }}
            />
          </Col>
        </Row>
      </ContentContainer>
      {!!pickOrder && (
        <Modal
          onCancel={() => setPickOrder(undefined)}
          title='确认取车'
          visible={true}
          footer={null}
        >
          <ConfirmPickerCarFormRender
            onSubmit={(v) => handleCarPickup(pickOrder, v)}
            onCancel={() => setPickOrder(undefined)}
          />
        </Modal>
      )}
    </>
  );
};

export default Order;

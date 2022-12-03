import React, { useState } from 'react';
import { Button, Col, Form, Input, Popconfirm, Row, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table/interface';
import { useReloadPagination } from '@/util/paginationHook';
import { getTransaction } from '@/api/Tansaction';
import { pageDataConvertPagination } from '@/util/paginationUtil';
import style from './style.module.less';
import { useNavigate } from 'react-router-dom';
import FontIcon from '@/components/FontIcon';
import { accessWithdraw, getWithdraws, rejectWithdraw } from '@/api/withdraw';
import { CustomerServiceTwoTone } from '@ant-design/icons';
import CancelButtonRender from '@/pages/finance/WithdrawPage/TableRender/CancelButtonRender';
import { successMessage } from '@/util/messageUtil';
const TableRender: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigator = useNavigate();
  const [data, setData] = useState<PageType<TransactionItemType>>({
    total: 0,
    size: 12,
    currentPage: 1,
    list: [],
  });
  /**
   * 拒绝提现申请
   * @param item
   * @param reason
   */
  const handleReject = (item: TransactionItemType, reason: string) => {
    setLoading(true);
    rejectWithdraw(item.id, reason)
      .then((newItem) => {
        setData({
          ...data,
          list: data.list.map((i) => (i.id === newItem.id ? newItem : i)),
        });
        successMessage();
      })
      .finally(() => setLoading(false));
  };
  /**
   * 通过提现申请
   * @param item
   */
  const handleConfirm = (item: TransactionItemType) => {
    setLoading(true);
    accessWithdraw(item.id)
      .then((newItem) => {
        setData({
          ...data,
          list: data.list.map((i) => (i.id === newItem.id ? newItem : i)),
        });
        successMessage();
      })
      .finally(() => setLoading(false));
  };
  const columns: ColumnsType<TransactionItemType> = [
    { title: 'ID', dataIndex: 'id' },
    { title: '标题', dataIndex: 'title' },
    {
      title: '费用',
      render: (_, record) => {
        const flag = record.amount > 0 ? '+' : '';
        return (
          <span
            style={{ color: record.amount > 0 ? 'green' : 'red' }}
          >{`${flag}${record.amount}`}</span>
        );
      },
    },
    {
      title: '余额',
      render: (_, record) => (record.balance * 0.01).toFixed(2),
    },
    { title: '备注', render: (_, record) => record.remark },
    {
      title: '状态',
      render: (_, record) => {
        switch (record.status) {
          case 'FAILED':
            return <Tag color='#f50'>失败</Tag>;
            break;
          case 'FINISHED':
            return <Tag color='#87d068'>完成</Tag>;
            break;
          case 'PROCESSING':
            return <Tag color='orange'>进行中</Tag>;
            break;
        }
      },
    },
    {
      title: '支付方式',
      render: (_, record) => {
        switch (record.payType) {
          case 'ALIPAY':
            return (
              <FontIcon
                name='alipay'
                style={{ fontSize: '1.3rem', color: 'blue' }}
              />
            );
            break;
          case 'WECHAT':
            return (
              <FontIcon
                name='wechat'
                style={{ fontSize: '1.3rem', color: 'green' }}
              />
            );
            break;
        }
      },
    },
    {
      title: '用户',
      render: (_, record) => {
        if (record.payType == 'ALIPAY') {
          return (
            <a
              onClick={() =>
                navigator(
                  `/users/alipayUser?id=${record.user.alipayAccount?.id}`
                )
              }
            >
              {record.user.alipayAccount?.nickName}
            </a>
          );
        } else if (record.payType == 'WECHAT') {
          return (
            <a
              onClick={() =>
                navigator(
                  `/users/wechatUser?id=${record.user.wechatAccount?.id}`
                )
              }
            >
              {record.user.wechatAccount?.nickName}
            </a>
          );
        }
        return '';
      },
    },
    { title: '时间', dataIndex: 'createdAt' },
    {
      title: '操作',
      render: (_, record) => {
        if (record.status === 'PROCESSING') {
          return (
            <Row gutter={[0, 24]}>
              <Col span={12}>
                <Popconfirm
                  onConfirm={() => handleConfirm(record)}
                  title={`您正在向用户的支付宝账号进行转账。同意后，将会从您的支付宝账号向会向用户的支付宝账户转账${Math.abs(
                    record.amount
                  ).toFixed(2)}元，且操作成功后，不可撤消。是否确定操作?`}
                  okText='确定'
                  cancelText='取消'
                >
                  <Button type='primary'>同意</Button>
                </Popconfirm>
              </Col>
              <Col span={12}>
                <CancelButtonRender
                  onCancel={(reason) => handleReject(record, reason)}
                />
              </Col>
            </Row>
          );
        } else {
          return <></>;
        }
      },
    },
  ];
  const [handleChangePage] = useReloadPagination(async () => {
    setLoading(true);
    try {
      setData(await getWithdraws());
    } finally {
      setLoading(false);
    }
  });

  return (
    <>
      <Table
        className={style.main}
        columns={columns}
        dataSource={data.list}
        loading={loading}
        onChange={(e) =>
          handleChangePage({ page: e.current!, size: e.pageSize! })
        }
        pagination={pageDataConvertPagination(data)}
        rowKey={(record) => record.id}
      />
    </>
  );
};

export default TableRender;

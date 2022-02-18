import React from "react";
import {BannerType} from "@/api/Banners";
import {Button, Col, Popconfirm, Row} from "antd";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {destroyBannerThunk} from "@/store/modules/banners";

type ActionRenderPropsType = {
  data: BannerType
  onEdit?: (banner: BannerType) => void
}

const ActionRender: React.FC<ActionRenderPropsType> = (props) => {
  const dispatch = useAppDispatch();
  const handleDestroy = (): void => {
    dispatch(destroyBannerThunk(props.data)).then()
  }
  return (<>
    <Row justify="center">
      <Col span={8}>
        <Button type="primary" onClick={() => props.onEdit && props.onEdit(props.data)} >编辑</Button>
      </Col>
      <Col span={8}>
        <Popconfirm
          placement="topRight"
          title='您确定要删除吗？'
          onConfirm={() => handleDestroy()}
          okText="确定"
          cancelText="取消"
        >
          <Button type="default" danger>删除</Button>
        </Popconfirm>
      </Col>
    </Row>
  </>)

}

export default ActionRender

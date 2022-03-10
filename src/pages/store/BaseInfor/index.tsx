import React from "react";
import HeaderPage from "@/components/HeaderPage";
import ContentContainer from "@/components/ContentContainer";
import { Col, Row, Spin } from 'antd'
import FilterRender from "@/pages/store/BaseInfor/FilterRender";
import Permission from "@/components/Permission";
import {RoleType} from "@/store/modules/me";
import TableRender from "@/pages/store/BaseInfor/TableRender";
import { useAppSelector } from '@/store/hooks'

const BaseInfor: React.FC = () => {
  const loading = useAppSelector(state => state.store.loading)
  return (<>
    <HeaderPage>
      <>用于查看门店的基本情况</>
    </HeaderPage>

    <ContentContainer>
      <Spin spinning={loading}>
      <Row justify='center' gutter={[0, 12]}>
        <Permission roles={[RoleType.ROLE_ADMIN]}>
          <Col span={24}>
            <FilterRender/>
          </Col>
        </Permission>
        <Col span={24}>
          <TableRender />
        </Col>
      </Row>
      </Spin>
    </ContentContainer>

  </>)


}

export default BaseInfor

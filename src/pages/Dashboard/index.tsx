import React, {useEffect, useState} from 'react'
import ContentContainer from "@/components/ContentContainer";
import WelcomeRender from "@/pages/Dashboard/WelcomeRender";
import ShortcutEntranceRender from "@/pages/Dashboard/ShortcutEntranceRender";
import Container from "@/pages/Dashboard/componets/Container";
import {getDashboard} from "@/api/dashboard";
import {Spin} from "antd";

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<DashboardItemType>({
    todayOrderCount: 0,
    userCount: 0,
    todayAmount: 0,
    weekUserAndOrderItems: [],
    logs: []
  })
  useEffect(() => {
    setLoading(true)
    getDashboard()
      .then(res => setData(res))
      .finally(() => setLoading(false))
  }, [])

  return (
    <Spin spinning={loading}>
      <ContentContainer>
        <WelcomeRender data={data} />
        <Container title='数据统计'>
          <ShortcutEntranceRender
            tableData={data.weekUserAndOrderItems}
            logData={data.logs}
          />
        </Container>
      </ContentContainer>
    </Spin>
  )
}

export default Dashboard

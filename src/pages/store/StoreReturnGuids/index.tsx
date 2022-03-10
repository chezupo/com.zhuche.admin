import React from 'react'
import HeaderPage from '@/components/HeaderPage'
import ContentContainer from '@/components/ContentContainer'
import TableRender from '@/pages/store/StoreReturnGuids/TableRender'
import { Spin } from 'antd'
import { useAppSelector } from '@/store/hooks'

const StoreReturnGuids: React.FC = () => {
  const {loading} = useAppSelector(state => state.storeGuids)

  return (<>
    <HeaderPage>
      <>用于查看门店的指引图片</>
    </HeaderPage>

    <Spin spinning={loading}>
      <ContentContainer>
        <TableRender />
      </ContentContainer>
    </Spin>
    </>
  )
}

export default StoreReturnGuids

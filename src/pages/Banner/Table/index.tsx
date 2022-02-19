import React from 'react'
import AddModal from '@/pages/Banner/Table/AddModal'
import TableRender from "@/pages/Banner/Table/TableRender";
import ContentContainer from "@/components/ContentContainer";

const Index: React.FC = () => {
  return (
    <ContentContainer>
      <AddModal/>
      <TableRender/>
    </ContentContainer>
  )
}

export default Index

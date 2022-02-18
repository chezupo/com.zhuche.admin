import React from 'react'
import style from './style.module.less'
import AddModal from '@/pages/Banner/Table/AddModal'
import TableRender from "@/pages/Banner/Table/TableRender";

const Index: React.FC = () => {
  return (
    <div className={style.main}>
        <AddModal />
        <TableRender />
    </div>
  )
}

export default Index

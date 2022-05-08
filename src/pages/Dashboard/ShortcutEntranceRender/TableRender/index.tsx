import React from 'react';
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';


export type TableRenderPropsType = {
  tableData: WeekUserAndOrderItemType[]
}
const TableRender: React.FC<TableRenderPropsType> = ({tableData: data}) => {
  return (
    <div style={{height: '20rem'}}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="userCount" fill="#8884d8" name='用户'/>
          <Bar dataKey="orderCount" fill="#82ca9d" name='订单'/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TableRender

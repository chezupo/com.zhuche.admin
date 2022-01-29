import React from "react";
import style from "./style.module.less";
import classNames from "classnames";

export type TablePropsType = {
  className?: string
}

enum Status {
  SUCCESS,
  WARNING,
  ERROR,
  PRIMARY
}
type RowType = {
  name: string
  price: number
  payment: string
  status: Status
}

const Table: React.FC<TablePropsType> = (props) => {
  const rows: RowType[] = [
    {name: 'star Refrigerator', price: 1200, payment: 'Paid', status: Status.SUCCESS},
    {name: 'star Refrigerator', price: 1200, payment: 'Paid', status: Status.WARNING},
    {name: 'star Refrigerator', price: 1200, payment: 'Paid', status: Status.SUCCESS},
    {name: 'star Refrigerator', price: 1200, payment: 'Paid', status: Status.ERROR},
    {name: 'star Refrigerator', price: 1200, payment: 'Paid', status: Status.SUCCESS},
    {name: 'star Refrigerator', price: 1200, payment: 'Paid', status: Status.PRIMARY},
    {name: 'star Refrigerator', price: 1200, payment: 'Paid', status: Status.SUCCESS},
    {name: 'star Refrigerator', price: 1200, payment: 'Paid', status: Status.ERROR},
    {name: 'star Refrigerator', price: 1200, payment: 'Paid', status: Status.SUCCESS},
  ]

  return (
    <table className={[props.className ? props.className : '', style.main].join('')}>
      <thead>
      <tr>
        <td>Name</td>
        <td>Price</td>
        <td>Payment</td>
        <td>Status</td>
      </tr>
      </thead>
      <tbody>
      { rows.map((row, key) => (
        <tr key={key}>
          <td>{row.name}</td>
          <td>${row.price}</td>
          <td>{row.payment}</td>
          <td><span className={
            classNames({
              [style.status]: true,
              [style.error]: row.status === Status.ERROR,
              [style.warning]: row.status === Status.WARNING,
              [style.primary]: row.status === Status.PRIMARY,
              [style.success]: row.status === Status.SUCCESS
            })
          }>Delivered</span></td>
        </tr>
      ))}

      </tbody>
    </table>

  )
}

export default Table


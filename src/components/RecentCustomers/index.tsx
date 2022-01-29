import React from "react";
import style from './style.module.less'

const RecentCustomers: React.FC = () => {
  const avatar = 'http://storage.360buyimg.com/mtd/home/32443566_635798770100444_2113947400891531264_n1533825816008.jpg'

  return (
    <div className={style.recentCustomers}>
      <div className={style.carHeader}>
        <h2>Recent Customers</h2>
      </div>
      <table>
        {Array.from(Array(8), (el, key) => (
          <tr key={key}>
            <td width='60px'><div className={style.imgBx}><img src={avatar} /> </div></td>
            <td ><h4>David<br/><span>Italy</span></h4></td>
          </tr>
        ))}

      </table>
    </div>
  )
}

export default RecentCustomers

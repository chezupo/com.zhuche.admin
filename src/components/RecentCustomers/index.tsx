import React from "react";
import style from './style.module.less'

const RecentCustomers: React.FC = () => {
  const avatar = 'http://storage.360buyimg.com/mtd/home/32443566_635798770100444_2113947400891531264_n1533825816008.jpg'

  return (
    <div className={style.main}>
      <div className={style.cardHeader}>
        <h2>Recent Customers</h2>
      </div>
      <table>
        {Array.from(Array(8), (e, key) => (
          <tr key={key}>
            <td> <div><img src={avatar} /> </div> </td>
            <td>
              <div className={style.nameWrapper}>
                <h3 className={style.name}>Ashraf <br/> India </h3>
              </div>
            </td>
          </tr>
        ))}

      </table>
    </div>
  )
}

export default RecentCustomers

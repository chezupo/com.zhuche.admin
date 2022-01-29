import React, {MouseEvent, useRef} from "react";
import style from "./style.module.less"
import {
  IoChatbubbleOutline,
  IoEyeOutline,
  IoHelpOutline,
  IoHomeOutline,
  IoLockClosedOutline,
  IoLogoApple,
  IoLogOutOutline,
  IoMenuOutline,
  IoPeopleOutline,
  IoSearchOutline,
  IoSettingsOutline,
  IoCardOutline,
  IoCashOutline,
  IoChatboxOutline
} from "react-icons/io5";
import classNames from "classnames";
import CardBox from "@/components/CardBox";
import Table from "@/components/Table";
import RecentCustomers from "@/components/RecentCustomers";

type NavType = {
  name: string;
  icon: React.ReactElement;
}
const Layout: React.FC = () => {
  const navs: NavType[] = [
    {name: 'Brand Name', icon: <IoLogoApple />},
    { icon: <IoHomeOutline />, name: 'Dashboard' },
    { icon: <IoPeopleOutline />, name: 'Customers' },
    { icon: <IoChatbubbleOutline />, name: 'Messages' },
    { icon: <IoHelpOutline />, name: 'Helpe' },
    { icon: <IoSettingsOutline />, name: 'Settings' },
    { icon: <IoLockClosedOutline />, name: 'Sign out' },
    { icon: <IoLogOutOutline />, name: 'Sign out' }
  ]
  const ulRef = useRef<HTMLUListElement>(null);
  const handleMouseOver = (event: MouseEvent<HTMLLIElement>): void => {
    ulRef.current?.childNodes.forEach((li) =>
      (li as HTMLLIElement).classList.remove(style.hovered)
    )
    event.currentTarget.classList.add(style.hovered)
  }
  const navigationRef = useRef<HTMLDivElement>(null)
  const mainRef = useRef<HTMLDivElement>(null)
  const handleClickToggle = (event: MouseEvent<HTMLDivElement>): void => {
    navigationRef.current?.classList.toggle(style.active)
    mainRef.current?.classList.toggle(style.active)
  }
  const avatar = 'http://storage.360buyimg.com/mtd/home/32443566_635798770100444_2113947400891531264_n1533825816008.jpg'

  return (<div className={style.container}>
    <div className={style.navigation} ref={navigationRef}>
      <ul ref={ulRef}>
        {navs.map((nav, key) => (
          <li key={key} onMouseOver={handleMouseOver} className={classNames(style.nav)}>
            <a href="#">
              <span className={style.icon}>{nav.icon}</span>
              <span className={style.title}>{nav.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>

    <div className={style.main} ref={mainRef}>
      <div className={style.topBar}>
        <div
          className={style.toggle}
          onClick={handleClickToggle}
        ><IoMenuOutline /></div>
        {/* search */}
        <div className={style.search}>
          <label>
            <input placeholder='Search here'/>
            <IoSearchOutline className={style.icon}/>
          </label>
        </div>
        {/* UserImg */}
        <div className={style.user}>
          <img src={avatar} />
        </div>
      </div>

      <div className={style.mainContainer}>
        {/* card */}
        <div className={style.carBoxWrapper}>
          <CardBox name={'Daily Views'} number='1504' icon={<IoEyeOutline />} />
          <CardBox name={'Sales'} number='80' icon={<IoCardOutline/>} />
          <CardBox name={'Comments'} number='284' icon={<IoChatboxOutline/>} />
          <CardBox name={'Earning'} number='$7,842' icon={<IoCashOutline/>} />
        </div>
        {/* detail list */}
        <div className={style.list}>
         <div className={style.recentOrders}>
           <div className={style.cardHeaders}>
             <h2>Recent Orders</h2>
             <a href='#' className={style.btn}>View All</a>
           </div>
           <Table />
        </div>
          {/*Recent Customer */}
          <RecentCustomers />
        </div>
      </div>
    </div>

  </div>)
}

export default Layout

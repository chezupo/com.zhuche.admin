import React from "react";
import style from "./style.module.less"
import {IoHomeOutline, IoLogoApple, IoPeopleOutline,
  IoChatbubbleOutline,
  IoHelpOutline,
  IoSettingsOutline,
  IoLockClosedOutline,
  IoLogOutOutline

} from "react-icons/io5";

const Layout: React.FC = () => {
  return (<div className={style.main}>
    <div className={style.navigation}>
      <ul>
        <li>
          <a href="#"></a>
           <span className={style.icon}> <IoLogoApple /> </span>
          <span className={style.title}>
            Brand Name
          </span>
        </li>
        <li>
          <a href="#"></a>
          <span className={style.icon}> <IoHomeOutline /> </span>
          <span className={style.title}>
            Dashboard</span>
        </li>
        <li>
          <a href="#"></a>
          <span className={style.icon}> <IoPeopleOutline /> </span>
          <span className={style.title}> Customers</span>
        </li>
        <li>
          <a href="#"></a>
          <span className={style.icon}><IoChatbubbleOutline /></span>
          <span className={style.title}>Messages</span>
        </li>
        <li>
          <a href="#"></a>
          <span className={style.icon}><IoHelpOutline /></span>
          <span className={style.title}>Helpe</span>
        </li>
        <li>
          <a href="#"></a>
          <span className={style.icon}><IoSettingsOutline /></span>
          <span className={style.title}>Settings</span>
        </li>
        <li>
          <a href="#"></a>
          <span className={style.icon}><IoLockClosedOutline /></span>
          <span className={style.title}>Sign out</span>
        </li>
        <li>
          <a href="#"></a>
          <span className={style.icon}><IoLogOutOutline /></span>
          <span className={style.title}>Sign out</span>
        </li>

      </ul>
    </div>
  </div>)
}

export default Layout

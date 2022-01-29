import React from "react";
import style from './style.module.less';

export type CardBoxPropsType = {
  number: string;
  name: string;
  icon: React.ReactElement
}
const CardBox: React.FC<CardBoxPropsType> = (props: CardBoxPropsType) => {

  return (
    <div className={style.main}>
      <div>
        <div className={style.numbers}>{props.number}</div>
        <div className={style.cardName}>{props.name}</div>
      </div>
      <div className={style.iconBx}>
        {props.icon}
      </div>
    </div>
  )
}

export default CardBox

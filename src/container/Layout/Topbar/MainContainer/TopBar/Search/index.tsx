import React from 'react'
import {AiOutlineSearch} from 'react-icons/ai';
import style from './style.module.less';

const Search: React.FC = () => {
  return (
    <div className={style.main}>
      <AiOutlineSearch className={style.icon}/>
      <input placeholder='่ฟ้ๆ็ดข' />
    </div>
  )
}

export default Search

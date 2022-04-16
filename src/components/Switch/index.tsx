import React from "react";
import {Switch as AntSwitch} from 'antd'

type SwitchPropsType = {
  value?: boolean
  onChange?: (newValue: boolean) => void
  unCheckedChildren?: React.ReactNode
  checkedChildren?: React.ReactNode
}
const Switch: React.FC<SwitchPropsType> = props => {
  return (
    <AntSwitch
      onChange={e => {
        props.onChange && props.onChange(e)
      }}
      checked={!!props.value}
      unCheckedChildren={props.unCheckedChildren}
      checkedChildren={props.checkedChildren}
    />
  )
}

export default Switch

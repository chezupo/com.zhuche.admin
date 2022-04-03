import React from "react";
import {Switch} from "antd";

type SwitchRenderPropsType = {
  checkedChildren: string
  unCheckedChildren: string
  value?: boolean
  onChange?: (value: boolean) => void
}
const SwitchRender: React.FC<SwitchRenderPropsType> = props => {
  return <Switch
    checkedChildren={props.checkedChildren}
    unCheckedChildren={props.unCheckedChildren}
    {...(props.value ? {checked: props.value} : {})}
    onChange={e => props.onChange && props.onChange(e) }
  />
}

export default SwitchRender

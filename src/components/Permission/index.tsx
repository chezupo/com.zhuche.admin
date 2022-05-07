import React, {ReactChildren} from "react";
import {useAppSelector} from "@/store/hooks";
type PermissionPropsType = {
  roles: RoleType[];
  children: React.ReactChild | ReactChildren | React.ReactChild[] | ReactChildren[]
}

const Permission: React.FC<PermissionPropsType> = (props) => {
  const roles = useAppSelector(state => state.me.roles)
  const index = props.roles.findIndex(r => roles.includes(r))

  return ( <> {index != -1 ? props.children : <></> } </> )
}

export default Permission

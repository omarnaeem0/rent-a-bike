import React from "react";
import "./Avatar.css";
import { ReactComponent as AvatarIcon } from '../assets/avatar.svg';

export const Avatar = (props) => {
  return (
    <AvatarIcon height={75} width={75} fill='rgba(0, 0, 0, 0.4)'  {...props} />
  )
}

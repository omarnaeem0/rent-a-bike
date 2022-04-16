import classNames from "classnames";
import React from "react";
import { Text } from ".";
import "./IconButton.css";
import { ReactComponent as EditIcon } from '../assets/icons/edit.svg';
import { ReactComponent as DeleteIcon } from '../assets/icons/delete.svg';
const Icons = {
  'edit': EditIcon,
  'delete': DeleteIcon,
}
export const IconButton = (props) => {
  const { icon, className, name, ...rest } = props;
  const IconToRender = Icons[name];
  return (
    <button className={`IconButtonContainer ${className ? className : ''}`} {...rest}>
      <IconToRender height={20} width={20} style={{ marginBottom: -4 }}/>
    </button>
  )
}

import React from "react";
import "./Checkbox.css";

export const Checkbox = (props) => {
  const { className, label, ...rest } = props;
  return (
    <input className={'Checkbox'} type='checkbox' {...rest} />
  )
}

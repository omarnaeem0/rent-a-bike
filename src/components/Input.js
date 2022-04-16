import React from "react";
import { Text } from ".";
import "./Input.css";

export const Input = (props) => {
  const { className, label, ...rest } = props;
  return (
    <div className={`InputContainer ${className ? className : ''}`}>
      <Text className='label caption'>{label}</Text>
      <input className={'Input'} {...rest} />
    </div>
  )
}

import classNames from "classnames";
import React from "react";
import { Text } from ".";
import "./Button.css";

export const Button = (props) => {
  const { label, title, className, ...rest } = props;
  return (
    <button className={`ButtonContainer ${className ? className : ''}`} {...rest}>
      <Text className='button'>{title}</Text>
    </button>
  )
}

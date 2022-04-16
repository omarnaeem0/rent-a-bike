import React from "react";
import "./Text.css";

export const Text = (props) => {
  const { className, children } = props;
  return (
    <div className={className}>
      {children}
    </div>
  )
}

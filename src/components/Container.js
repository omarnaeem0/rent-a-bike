import React from "react";
import "./Container.css";

export const Container = (props) => {
  const { className, internalClassName, children } = props;
  return (
    <div className={`Container ${className ? className : ''}`}>
      <div className={`InternalContainer ${internalClassName ? internalClassName : ''}`}>
        {children}
      </div>
    </div>
  )
}
import React from "react";
import "./AuthContainer.css";

export const AuthContainer = (props) => {
  const { className, internalClassName, children } = props;
  return (
    <div className={`AuthContainer ${className ? className : ''}`}>
      <div className={`AuthInternalContainer ${internalClassName ? internalClassName : ''}`}>
        {children}
      </div>
    </div>
  )
}
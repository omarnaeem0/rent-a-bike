import React from "react";
import { TextField as MaterialUITextField } from '@mui/material';

export const TextField = (props) => {
  return (
    <MaterialUITextField size="small" variant="outlined" {...props} />
  )
}

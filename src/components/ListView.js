import React from "react";
import { ListItem } from ".";
import "./ListView.css";

export const ListView = (props) => {
  const { items, refetch } = props;
  return (
    <>
      {items.map((item, index) => {
        return <ListItem refetch={refetch} className={index + 1 === items.length ? 'ListItemNotLast' : ''} {...item} />
      })}
    </>
  )
}

import React, { useState } from "react";
import { Text, IconButton, EditTodoCard, DeleteTodoCard } from ".";
import "./ListItem.css";
import { useModal } from 'react-hooks-use-modal';

export const ListItem = (props) => {
  const { title, description, className } = props;
  const [DeleteModal, openDelete, closeDelete, isDeleteModalOpen] = useModal('root', {
    preventScroll: true,
    closeOnOverlayClick: true
  });
  const [EditModal, openEdit, closeEdit, isEditModalOpen] = useModal('root', {
    preventScroll: true,
    closeOnOverlayClick: true
  });
  return (
    <>
      <div className={`ListItemContainer ${className ? className : ''}`}>
        <div className='text'>
          <Text className='h6'>{title}</Text>
          <Text className='body2'>{description}</Text>
        </div>
        <div>
          <IconButton name="delete" className='marginRight' onClick={openDelete} />
          <IconButton name="edit" onClick={openEdit} />
        </div>
      </div>
      <DeleteModal>
        <DeleteTodoCard {...props} onClose={closeDelete}/>
      </DeleteModal>
      <EditModal>
        <EditTodoCard {...props} onClose={closeEdit}/>
      </EditModal>
    </>
  )
}

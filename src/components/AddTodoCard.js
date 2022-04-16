import React, { useState } from "react";
import { Text, Input, Button, Container } from ".";
import './AddTodoCard.css';

export const AddTodoCard = (props) => {
  const { refetch } = props;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  }
  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  }
  const onClick = async () => {
    // await addTodo({ variables: { title, description } });
    // await refetch();
    setTitle('');
    setDescription('');
  }
  return (
    <Container className='AddTodoContainer'>
      <Text className='h6 AddLabel'>Add Todo</Text>
      <Input className={'TopInput'} label='Title' value={title} onChange={onChangeTitle} />
      <Input className={'BottomInput'} label='Description' value={description} onChange={onChangeDescription} />
      <Button className='AddButton' title='Add' disabled={title === ''} onClick={onClick} />
    </Container>
  )
}

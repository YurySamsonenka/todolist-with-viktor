import Button from '@mui/material/Button';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import TextField from '@mui/material/TextField';

type Props = {
  addItem: (title: string) => void
};
export const AddItemForm = ({ addItem }: Props) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [error, setError] = useState<string | null>(null);

  const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(event.currentTarget.value);
  };

  const addItemHandler = () => {
    if (taskTitle.trim() !== '') {
      addItem(taskTitle.trim());
      setTaskTitle('');
    } else {
      setError('Title is required');
    }
  };

  const addItemOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (event.key === 'Enter') {
      addItemHandler();
    }
  };

  const buttonStyles = { maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px' };

  return (
    <div>
      <TextField
        size={'small'}
        value={taskTitle}
        id="outlined-basic"
        label={error? error :'Enter a title'}
        variant="outlined"
        onChange={changeTaskTitleHandler}
        onKeyUp={addItemOnKeyUpHandler}
        error={!!error}
      />
      <Button variant="contained" onClick={addItemHandler}
        style={buttonStyles}>+</Button>
    </div>
  );
};

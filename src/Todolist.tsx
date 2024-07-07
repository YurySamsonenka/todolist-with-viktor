import { FilterValuesType, TaskType } from './App';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
// import { Button } from './Button';
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { ButtonGroup } from '@mui/material';
import { filterButtonsContainerSx, getListItemSx } from './Todolist.styles';

type PropsType = {
  title: string
  todolistId: string
  tasks: TaskType[]
  removeTask: (taskId: string, todolistId: string) => void
  changeFilter: (filter: FilterValuesType, todolistId: string) => void
  addTask: (title: string, todolistId: string) => void
  changeTaskStatus: (taskId: string, taskStatus: boolean, todolistId: string) => void
  filter: FilterValuesType
  removeTodolist: (todolistId: string) => void
  updateTask: (todolistID: string, taskID: string, newTitle: string) => void
  updateTodolist: (todolistID: string, newTitle: string) => void
}

export const Todolist = (props: PropsType) => {
  const {
    title,
    tasks,
    filter,
    removeTask,
    changeFilter,
    addTask,
    changeTaskStatus,
    todolistId,
    removeTodolist,
    updateTask,
    updateTodolist,
  } = props;

  const changeFilterTasksHandler = (filter: FilterValuesType) => {
    changeFilter(filter, props.todolistId);
  };

  const removeTodolistHandler = () => {
    removeTodolist(todolistId);
  };

  const addTaskHandler = (title: string) => {
    addTask(title, props.todolistId);
  };

  const updateTodolistHandler = (title: string) => {
    updateTodolist(todolistId, title);
  };

  const mappedTasks = tasks.map((task) => {

    const removeTaskHandler = () => {
      removeTask(task.id, todolistId);
    };

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
      const newStatusValue = e.currentTarget.checked;
      changeTaskStatus(task.id, newStatusValue, todolistId);
    };

    const updateTaskHandler = (newTitle: string) => {
      updateTask(todolistId, task.id, newTitle);
    };

    return <ListItem key={task.id}
      className={task.isDone ? 'is-done' : ''}
      sx={getListItemSx(task.isDone)}>
      <Checkbox defaultChecked />
      <EditableSpan oldTitle={task.title} updateItem={updateTaskHandler} />
      <IconButton aria-label="delete" size="small" onClick={removeTaskHandler}>
        <DeleteIcon fontSize="inherit" />
      </IconButton>
    </ListItem>;
  });

  return (
    <div>
      <div className={'todolist-title-container'}>
        <h3>
          <EditableSpan oldTitle={title} updateItem={updateTodolistHandler} />
          <IconButton aria-label="delete" size="small" onClick={removeTodolistHandler}>
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </h3>
      </div>
      <AddItemForm addItem={addTaskHandler} />

      {
        tasks.length === 0
        ? <p>Тасок нет</p>
        : <List>
          {mappedTasks}
        </List>
      }
      <ButtonGroup sx={filterButtonsContainerSx}>
        <Button size={'small'}
          variant={filter === 'all' ? 'outlined' : 'contained'}
          color={'secondary'}
          onClick={() => changeFilterTasksHandler('all')}>All</Button>
        <Button size={'small'}
          variant={filter === 'active' ? 'outlined' : 'contained'}
          color={'info'}
          onClick={() => changeFilterTasksHandler('active')}>Active</Button>
        <Button size={'small'}
          variant={filter === 'completed' ? 'outlined' : 'contained'}
          color={'success'}
          onClick={() => changeFilterTasksHandler('completed')}>Completed</Button>
      </ButtonGroup>
    </div>
  );
};

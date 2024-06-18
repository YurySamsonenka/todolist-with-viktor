import { FilterValuesType, TaskType } from './App';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { Button } from './Button';

type PropsType = {
  title: string
  tasks: TaskType[]
  filter: FilterValuesType
  todolistsid: string

  removeTask: (taskId: string, todolistsId: string) => void
  changeTodolistFilter: (filter: FilterValuesType, todolistsId: string) => void
  addTask: (title: string, todolistsId: string) => void
  changeTaskStatus: (taskId: string, taskStatus: boolean, todolistsId: string) => void
  removeTodolist: (todolistsId: string) => void
}

export const Todolist = (props: PropsType) => {
  const {
    title,
    tasks,
    filter,
    todolistsid,
    removeTask,
    changeTodolistFilter,
    addTask,
    changeTaskStatus,
    removeTodolist,
  } = props;

  const [taskTitle, setTaskTitle] = useState('');
  const [error, setError] = useState<string | null>(null);

  const addTaskHandler = () => {
    if (taskTitle.trim() !== '') {
      addTask(taskTitle.trim(), todolistsid);
      setTaskTitle('');
    } else {
      setError('Title is required');
    }
  };

  const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(event.currentTarget.value);
  };

  const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (event.key === 'Enter') {
      addTaskHandler();
    }
  };

  const changeFilterTasksHandler = (filter: FilterValuesType) => {
    changeTodolistFilter(filter, todolistsid);
  };

  return (
    <div>
      <h3>
        {title}
        <button onClick={() => removeTodolist(todolistsid)}>x</button>
      </h3>
      <div>
        <input
          className={error ? 'error' : ''}
          value={taskTitle}
          onChange={changeTaskTitleHandler}
          onKeyUp={addTaskOnKeyUpHandler}
        />
        <Button title={'+'} onClick={addTaskHandler} />
        {error && <div className={'error-message'}>{error}</div>}
      </div>
      {
        tasks.length === 0
        ? <p>Тасок нет</p>
        : <ul>
          {tasks.map((task) => {

            const removeTaskHandler = () => {
              removeTask(task.id, todolistsid);
            };

            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
              const newStatusValue = e.currentTarget.checked;
              changeTaskStatus(task.id, newStatusValue, todolistsid);
            };

            return <li key={task.id} className={task.isDone ? 'is-done' : ''}>
              <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler} />
              <span>{task.title}</span>
              <Button onClick={removeTaskHandler} title={'x'} />
            </li>;
          })}
        </ul>
      }
      <div>
        <Button className={filter === 'all' ? 'active-filter' : ''}
          title={'All'}
          onClick={() => changeFilterTasksHandler('all')} />
        <Button className={filter === 'active' ? 'active-filter' : ''}
          title={'Active'}
          onClick={() => changeFilterTasksHandler('active')} />
        <Button className={filter === 'completed' ? 'active-filter' : ''}
          title={'Completed'}
          onClick={() => changeFilterTasksHandler('completed')} />
      </div>
    </div>
  );
};

import {FilterValuesType, TaskType} from './App';
import {Button} from './Button';
import React, {useState} from 'react';

type PropsType = {
  title: string
  tasks: TaskType[]
  removeTask: (taskId: string) => void
  changeFilter: (filter: FilterValuesType) => void
  addTasks: (title: string) => void
}

export const Todolist = ({title, tasks, removeTask, changeFilter, addTasks}: PropsType) => {

    const addTaskHandler = () => {
      addTasks(taskTitle);
      setTaskTitle('');
    };

    const [taskTitle, setTaskTitle] = useState('');

    const changeTaskTitleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      setTaskTitle(e.currentTarget.value);
    };

    const keyDownAddTaskHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
      e.key === 'Enter' && addTaskHandler();

    };

    const setAllTasksHandler = () => {
      changeFilter('all');
    };

    const setActiveTasksHandler = () => {
      changeFilter('active');
    };

    const setCompletedTasksHandler = () => {
      changeFilter('completed');
    };

    const isTypeButtonDisabled = !taskTitle || taskTitle.length > 25;

    const userTaskTileLengthWarning = taskTitle.length > 15 && <div>We recommend task title is 15 charters</div>;

    return (
      <div>
        <h3>{title}</h3>
        <div>
          <input value={taskTitle} onChange={changeTaskTitleHandler} onKeyDown={keyDownAddTaskHandler} />
          <Button title={'+'} onClick={addTaskHandler} disabled={isTypeButtonDisabled} />
          {userTaskTileLengthWarning}
        </div>
        {
          tasks.length === 0
            ? <p>Тасок нет</p>
            : <ul>
              {tasks.map(task => {
                const removeTaskHandler = () => {
                  removeTask(task.id);
                };

                return (
                  <li key={task.id}>
                    <input type="checkbox" checked={task.isDone} />
                    <span>{task.title}</span>
                    <Button title={'x'} onClick={removeTaskHandler} />
                  </li>
                );
              })}
            </ul>
        }
        <div>
          <Button title={'All'} onClick={setAllTasksHandler} />
          <Button title={'Active'} onClick={setActiveTasksHandler} />
          <Button title={'Completed'} onClick={setCompletedTasksHandler} />
        </div>
      </div>
    );
  }
;

import { FilterValuesType, TaskType } from './App';
import { Button } from './Button';
import React, { useState } from 'react';

type PropsType = {
  title: string
  tasks: TaskType[]
  filter: FilterValuesType
  removeTask: (taskId: string) => void
  changeFilter: (filter: FilterValuesType) => void
  addTasks: (title: string) => void
  changeTaskStatus: (taskId: string, newIsDoneValue: boolean) => void
}

export const Todolist = ({ title, tasks, filter, removeTask, changeFilter, addTasks, changeTaskStatus }: PropsType) => {

    const [taskInputError, setTaskInputError] = useState<string | null>(null);

    const addTaskHandler = () => {
      const trimmedTitle = taskTitle.trim();
      if (trimmedTitle) {
        addTasks(taskTitle);
      } else {
        setTaskInputError('Title is required!');
      }
      setTaskTitle('');
    };

    const [taskTitle, setTaskTitle] = useState('');

    const changeTaskTitleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      taskInputError && setTaskInputError(null);
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
    const userTaskEmptyTitleError = taskInputError && <div style={{ color: 'red' }}>{taskInputError}</div>;

    return (
      <div className="todolist">
        <h3>{title}</h3>
        <div>
          <input
            value={taskTitle}
            onChange={changeTaskTitleHandler}
            onKeyDown={keyDownAddTaskHandler}
            className={taskInputError ? 'taskInputError' : ''} />
          <Button title={'+'} onClick={addTaskHandler} disabled={isTypeButtonDisabled} />
          {userTaskTileLengthWarning}
          {userTaskEmptyTitleError}
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
                  <input type="checkbox"
                    checked={task.isDone}
                    onChange={(e) => changeTaskStatus(task.id, e.currentTarget.checked)} />
                  <span className={task.isDone ? 'task-done' : 'task'}>{task.title}</span>
                  <Button title={'x'} onClick={removeTaskHandler} />
                </li>
              );
            })}
          </ul>
        }
        <div>
          <Button title={'All'} onClick={setAllTasksHandler} classes={filter === 'all' ? 'active' : ''} />
          <Button title={'Active'} onClick={setActiveTasksHandler} classes={filter === 'active' ? 'active' : ''} />
          <Button title={'Completed'}
            onClick={setCompletedTasksHandler}
            classes={filter === 'completed' ? 'active' : ''} />
        </div>
      </div>
    );
  }
;

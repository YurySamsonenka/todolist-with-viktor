import { FilterValuesType, TodolistType } from '../App';
import { v1 } from 'uuid';

type AddTodolistActionType = {
	type: 'ADD-TODOLIST',
	payload: {
		title: string
		id: string
	}
}

type RemoveTodolistActionType = {
	type: 'REMOVE-TODOLIST',
	payload: {
		id: string
	}
}

type ChangeTodolistFilterActionType = {
	type: 'CHANGE-TODOLIST-FILTER',
	payload: {
		filter: FilterValuesType
		id: string
	}
}

type ChangeTodolistTitleActionType = {
	type: 'CHANGE-TODOLIST-TITLE',
	payload: {
		title: string
		id: string
	}
}

export type ActionType =
	AddTodolistActionType
	| RemoveTodolistActionType
	| ChangeTodolistFilterActionType
	| ChangeTodolistTitleActionType

export const todolistsReducer = (todolists: Array<TodolistType>,
	action: ActionType): Array<TodolistType> => {
	switch (action.type) {
		case 'ADD-TODOLIST': {
			const { title, id } = action.payload;
			return [{
				id,
				title,
				filter: 'all',
			}, ...todolists];
		}

		case 'REMOVE-TODOLIST': {
			const { id } = action.payload;
			return todolists.filter(tl => tl.id !== id);
		}

		case 'CHANGE-TODOLIST-FILTER': {
			const { id, filter } = action.payload;
			return todolists.map(tl => tl.id === id ? { ...tl, filter } : tl);
		}

		case 'CHANGE-TODOLIST-TITLE': {
			const { id, title } = action.payload;
			return todolists.map(tl => tl.id === id ? { ...tl, title } : tl);
		}

		default:
			return todolists;
	}

};

export const AddTodolistAC = (id: string, title: string): AddTodolistActionType => ({
	type: 'ADD-TODOLIST',
	payload: {
		id,
		title,
	},
});

export const RemoveTodolistAC = (id: string): RemoveTodolistActionType => ({
	type: 'REMOVE-TODOLIST',
	payload: {
		id,
	},
});

export const ChangeTodolistFilterAC = (id: string,
	filter: FilterValuesType): ChangeTodolistFilterActionType => ({
	type: 'CHANGE-TODOLIST-FILTER',
	payload: {
		filter,
		id,
	},
});

export const ChangeTodolistTitleAC = (id: string,
	title: string): ChangeTodolistTitleActionType => ({
	type: 'CHANGE-TODOLIST-TITLE',
	payload: {
		title,
		id,
	},
});

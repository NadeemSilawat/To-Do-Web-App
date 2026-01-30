import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface Board_Key {
  id: UUIDString;
  __typename?: 'Board_Key';
}

export interface CreateBoardData {
  board_insert: Board_Key;
}

export interface CreateBoardVariables {
  name: string;
  description: string;
}

export interface CreateTodoData {
  todo_insert: Todo_Key;
}

export interface CreateTodoVariables {
  boardId: UUIDString;
  title: string;
  description: string;
  dueDate?: DateString | null;
  priority?: string | null;
}

export interface ListBoardsData {
  boards: ({
    id: UUIDString;
    name: string;
    description?: string | null;
    createdAt: TimestampString;
  } & Board_Key)[];
}

export interface Todo_Key {
  id: UUIDString;
  __typename?: 'Todo_Key';
}

export interface UpdateTodoData {
  todo_update?: Todo_Key | null;
}

export interface UpdateTodoVariables {
  id: UUIDString;
  isComplete?: boolean | null;
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface CreateBoardRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateBoardVariables): MutationRef<CreateBoardData, CreateBoardVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateBoardVariables): MutationRef<CreateBoardData, CreateBoardVariables>;
  operationName: string;
}
export const createBoardRef: CreateBoardRef;

export function createBoard(vars: CreateBoardVariables): MutationPromise<CreateBoardData, CreateBoardVariables>;
export function createBoard(dc: DataConnect, vars: CreateBoardVariables): MutationPromise<CreateBoardData, CreateBoardVariables>;

interface ListBoardsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListBoardsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListBoardsData, undefined>;
  operationName: string;
}
export const listBoardsRef: ListBoardsRef;

export function listBoards(): QueryPromise<ListBoardsData, undefined>;
export function listBoards(dc: DataConnect): QueryPromise<ListBoardsData, undefined>;

interface CreateTodoRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateTodoVariables): MutationRef<CreateTodoData, CreateTodoVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateTodoVariables): MutationRef<CreateTodoData, CreateTodoVariables>;
  operationName: string;
}
export const createTodoRef: CreateTodoRef;

export function createTodo(vars: CreateTodoVariables): MutationPromise<CreateTodoData, CreateTodoVariables>;
export function createTodo(dc: DataConnect, vars: CreateTodoVariables): MutationPromise<CreateTodoData, CreateTodoVariables>;

interface UpdateTodoRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateTodoVariables): MutationRef<UpdateTodoData, UpdateTodoVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateTodoVariables): MutationRef<UpdateTodoData, UpdateTodoVariables>;
  operationName: string;
}
export const updateTodoRef: UpdateTodoRef;

export function updateTodo(vars: UpdateTodoVariables): MutationPromise<UpdateTodoData, UpdateTodoVariables>;
export function updateTodo(dc: DataConnect, vars: UpdateTodoVariables): MutationPromise<UpdateTodoData, UpdateTodoVariables>;


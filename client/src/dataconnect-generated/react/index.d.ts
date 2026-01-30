import { CreateBoardData, CreateBoardVariables, ListBoardsData, CreateTodoData, CreateTodoVariables, UpdateTodoData, UpdateTodoVariables } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateBoard(options?: useDataConnectMutationOptions<CreateBoardData, FirebaseError, CreateBoardVariables>): UseDataConnectMutationResult<CreateBoardData, CreateBoardVariables>;
export function useCreateBoard(dc: DataConnect, options?: useDataConnectMutationOptions<CreateBoardData, FirebaseError, CreateBoardVariables>): UseDataConnectMutationResult<CreateBoardData, CreateBoardVariables>;

export function useListBoards(options?: useDataConnectQueryOptions<ListBoardsData>): UseDataConnectQueryResult<ListBoardsData, undefined>;
export function useListBoards(dc: DataConnect, options?: useDataConnectQueryOptions<ListBoardsData>): UseDataConnectQueryResult<ListBoardsData, undefined>;

export function useCreateTodo(options?: useDataConnectMutationOptions<CreateTodoData, FirebaseError, CreateTodoVariables>): UseDataConnectMutationResult<CreateTodoData, CreateTodoVariables>;
export function useCreateTodo(dc: DataConnect, options?: useDataConnectMutationOptions<CreateTodoData, FirebaseError, CreateTodoVariables>): UseDataConnectMutationResult<CreateTodoData, CreateTodoVariables>;

export function useUpdateTodo(options?: useDataConnectMutationOptions<UpdateTodoData, FirebaseError, UpdateTodoVariables>): UseDataConnectMutationResult<UpdateTodoData, UpdateTodoVariables>;
export function useUpdateTodo(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateTodoData, FirebaseError, UpdateTodoVariables>): UseDataConnectMutationResult<UpdateTodoData, UpdateTodoVariables>;

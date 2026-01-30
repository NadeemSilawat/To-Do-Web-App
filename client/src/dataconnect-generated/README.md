# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListBoards*](#listboards)
- [**Mutations**](#mutations)
  - [*CreateBoard*](#createboard)
  - [*CreateTodo*](#createtodo)
  - [*UpdateTodo*](#updatetodo)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListBoards
You can execute the `ListBoards` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listBoards(): QueryPromise<ListBoardsData, undefined>;

interface ListBoardsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListBoardsData, undefined>;
}
export const listBoardsRef: ListBoardsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listBoards(dc: DataConnect): QueryPromise<ListBoardsData, undefined>;

interface ListBoardsRef {
  ...
  (dc: DataConnect): QueryRef<ListBoardsData, undefined>;
}
export const listBoardsRef: ListBoardsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listBoardsRef:
```typescript
const name = listBoardsRef.operationName;
console.log(name);
```

### Variables
The `ListBoards` query has no variables.
### Return Type
Recall that executing the `ListBoards` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListBoardsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListBoardsData {
  boards: ({
    id: UUIDString;
    name: string;
    description?: string | null;
    createdAt: TimestampString;
  } & Board_Key)[];
}
```
### Using `ListBoards`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listBoards } from '@dataconnect/generated';


// Call the `listBoards()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listBoards();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listBoards(dataConnect);

console.log(data.boards);

// Or, you can use the `Promise` API.
listBoards().then((response) => {
  const data = response.data;
  console.log(data.boards);
});
```

### Using `ListBoards`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listBoardsRef } from '@dataconnect/generated';


// Call the `listBoardsRef()` function to get a reference to the query.
const ref = listBoardsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listBoardsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.boards);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.boards);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateBoard
You can execute the `CreateBoard` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createBoard(vars: CreateBoardVariables): MutationPromise<CreateBoardData, CreateBoardVariables>;

interface CreateBoardRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateBoardVariables): MutationRef<CreateBoardData, CreateBoardVariables>;
}
export const createBoardRef: CreateBoardRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createBoard(dc: DataConnect, vars: CreateBoardVariables): MutationPromise<CreateBoardData, CreateBoardVariables>;

interface CreateBoardRef {
  ...
  (dc: DataConnect, vars: CreateBoardVariables): MutationRef<CreateBoardData, CreateBoardVariables>;
}
export const createBoardRef: CreateBoardRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createBoardRef:
```typescript
const name = createBoardRef.operationName;
console.log(name);
```

### Variables
The `CreateBoard` mutation requires an argument of type `CreateBoardVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateBoardVariables {
  name: string;
  description: string;
}
```
### Return Type
Recall that executing the `CreateBoard` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateBoardData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateBoardData {
  board_insert: Board_Key;
}
```
### Using `CreateBoard`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createBoard, CreateBoardVariables } from '@dataconnect/generated';

// The `CreateBoard` mutation requires an argument of type `CreateBoardVariables`:
const createBoardVars: CreateBoardVariables = {
  name: ..., 
  description: ..., 
};

// Call the `createBoard()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createBoard(createBoardVars);
// Variables can be defined inline as well.
const { data } = await createBoard({ name: ..., description: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createBoard(dataConnect, createBoardVars);

console.log(data.board_insert);

// Or, you can use the `Promise` API.
createBoard(createBoardVars).then((response) => {
  const data = response.data;
  console.log(data.board_insert);
});
```

### Using `CreateBoard`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createBoardRef, CreateBoardVariables } from '@dataconnect/generated';

// The `CreateBoard` mutation requires an argument of type `CreateBoardVariables`:
const createBoardVars: CreateBoardVariables = {
  name: ..., 
  description: ..., 
};

// Call the `createBoardRef()` function to get a reference to the mutation.
const ref = createBoardRef(createBoardVars);
// Variables can be defined inline as well.
const ref = createBoardRef({ name: ..., description: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createBoardRef(dataConnect, createBoardVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.board_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.board_insert);
});
```

## CreateTodo
You can execute the `CreateTodo` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createTodo(vars: CreateTodoVariables): MutationPromise<CreateTodoData, CreateTodoVariables>;

interface CreateTodoRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateTodoVariables): MutationRef<CreateTodoData, CreateTodoVariables>;
}
export const createTodoRef: CreateTodoRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createTodo(dc: DataConnect, vars: CreateTodoVariables): MutationPromise<CreateTodoData, CreateTodoVariables>;

interface CreateTodoRef {
  ...
  (dc: DataConnect, vars: CreateTodoVariables): MutationRef<CreateTodoData, CreateTodoVariables>;
}
export const createTodoRef: CreateTodoRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createTodoRef:
```typescript
const name = createTodoRef.operationName;
console.log(name);
```

### Variables
The `CreateTodo` mutation requires an argument of type `CreateTodoVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateTodoVariables {
  boardId: UUIDString;
  title: string;
  description: string;
  dueDate?: DateString | null;
  priority?: string | null;
}
```
### Return Type
Recall that executing the `CreateTodo` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateTodoData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateTodoData {
  todo_insert: Todo_Key;
}
```
### Using `CreateTodo`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createTodo, CreateTodoVariables } from '@dataconnect/generated';

// The `CreateTodo` mutation requires an argument of type `CreateTodoVariables`:
const createTodoVars: CreateTodoVariables = {
  boardId: ..., 
  title: ..., 
  description: ..., 
  dueDate: ..., // optional
  priority: ..., // optional
};

// Call the `createTodo()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createTodo(createTodoVars);
// Variables can be defined inline as well.
const { data } = await createTodo({ boardId: ..., title: ..., description: ..., dueDate: ..., priority: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createTodo(dataConnect, createTodoVars);

console.log(data.todo_insert);

// Or, you can use the `Promise` API.
createTodo(createTodoVars).then((response) => {
  const data = response.data;
  console.log(data.todo_insert);
});
```

### Using `CreateTodo`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createTodoRef, CreateTodoVariables } from '@dataconnect/generated';

// The `CreateTodo` mutation requires an argument of type `CreateTodoVariables`:
const createTodoVars: CreateTodoVariables = {
  boardId: ..., 
  title: ..., 
  description: ..., 
  dueDate: ..., // optional
  priority: ..., // optional
};

// Call the `createTodoRef()` function to get a reference to the mutation.
const ref = createTodoRef(createTodoVars);
// Variables can be defined inline as well.
const ref = createTodoRef({ boardId: ..., title: ..., description: ..., dueDate: ..., priority: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createTodoRef(dataConnect, createTodoVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.todo_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.todo_insert);
});
```

## UpdateTodo
You can execute the `UpdateTodo` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateTodo(vars: UpdateTodoVariables): MutationPromise<UpdateTodoData, UpdateTodoVariables>;

interface UpdateTodoRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateTodoVariables): MutationRef<UpdateTodoData, UpdateTodoVariables>;
}
export const updateTodoRef: UpdateTodoRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateTodo(dc: DataConnect, vars: UpdateTodoVariables): MutationPromise<UpdateTodoData, UpdateTodoVariables>;

interface UpdateTodoRef {
  ...
  (dc: DataConnect, vars: UpdateTodoVariables): MutationRef<UpdateTodoData, UpdateTodoVariables>;
}
export const updateTodoRef: UpdateTodoRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateTodoRef:
```typescript
const name = updateTodoRef.operationName;
console.log(name);
```

### Variables
The `UpdateTodo` mutation requires an argument of type `UpdateTodoVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateTodoVariables {
  id: UUIDString;
  isComplete?: boolean | null;
}
```
### Return Type
Recall that executing the `UpdateTodo` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateTodoData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateTodoData {
  todo_update?: Todo_Key | null;
}
```
### Using `UpdateTodo`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateTodo, UpdateTodoVariables } from '@dataconnect/generated';

// The `UpdateTodo` mutation requires an argument of type `UpdateTodoVariables`:
const updateTodoVars: UpdateTodoVariables = {
  id: ..., 
  isComplete: ..., // optional
};

// Call the `updateTodo()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateTodo(updateTodoVars);
// Variables can be defined inline as well.
const { data } = await updateTodo({ id: ..., isComplete: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateTodo(dataConnect, updateTodoVars);

console.log(data.todo_update);

// Or, you can use the `Promise` API.
updateTodo(updateTodoVars).then((response) => {
  const data = response.data;
  console.log(data.todo_update);
});
```

### Using `UpdateTodo`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateTodoRef, UpdateTodoVariables } from '@dataconnect/generated';

// The `UpdateTodo` mutation requires an argument of type `UpdateTodoVariables`:
const updateTodoVars: UpdateTodoVariables = {
  id: ..., 
  isComplete: ..., // optional
};

// Call the `updateTodoRef()` function to get a reference to the mutation.
const ref = updateTodoRef(updateTodoVars);
// Variables can be defined inline as well.
const ref = updateTodoRef({ id: ..., isComplete: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateTodoRef(dataConnect, updateTodoVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.todo_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.todo_update);
});
```


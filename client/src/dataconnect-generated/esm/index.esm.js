import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'client',
  location: 'us-east4'
};

export const createBoardRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateBoard', inputVars);
}
createBoardRef.operationName = 'CreateBoard';

export function createBoard(dcOrVars, vars) {
  return executeMutation(createBoardRef(dcOrVars, vars));
}

export const listBoardsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListBoards');
}
listBoardsRef.operationName = 'ListBoards';

export function listBoards(dc) {
  return executeQuery(listBoardsRef(dc));
}

export const createTodoRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateTodo', inputVars);
}
createTodoRef.operationName = 'CreateTodo';

export function createTodo(dcOrVars, vars) {
  return executeMutation(createTodoRef(dcOrVars, vars));
}

export const updateTodoRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateTodo', inputVars);
}
updateTodoRef.operationName = 'UpdateTodo';

export function updateTodo(dcOrVars, vars) {
  return executeMutation(updateTodoRef(dcOrVars, vars));
}


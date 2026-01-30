const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'client',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

const createBoardRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateBoard', inputVars);
}
createBoardRef.operationName = 'CreateBoard';
exports.createBoardRef = createBoardRef;

exports.createBoard = function createBoard(dcOrVars, vars) {
  return executeMutation(createBoardRef(dcOrVars, vars));
};

const listBoardsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListBoards');
}
listBoardsRef.operationName = 'ListBoards';
exports.listBoardsRef = listBoardsRef;

exports.listBoards = function listBoards(dc) {
  return executeQuery(listBoardsRef(dc));
};

const createTodoRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateTodo', inputVars);
}
createTodoRef.operationName = 'CreateTodo';
exports.createTodoRef = createTodoRef;

exports.createTodo = function createTodo(dcOrVars, vars) {
  return executeMutation(createTodoRef(dcOrVars, vars));
};

const updateTodoRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateTodo', inputVars);
}
updateTodoRef.operationName = 'UpdateTodo';
exports.updateTodoRef = updateTodoRef;

exports.updateTodo = function updateTodo(dcOrVars, vars) {
  return executeMutation(updateTodoRef(dcOrVars, vars));
};

import {
  ADD_TASK,
  REMOVE_TASK,
  MARK_TASK_AS_DONE,
  MARK_TASK_AS_UNDONE,
  INIT_PROGRESS_BAR,
  UPDATE_PROGREES_BAR,
  ON_ADD,
  ON_REMOVE,
  ON_DONE,
  ON_UNDONE,
  SET_STORE_TO_LOCAL_STORAGE,
  GET_STORE_FROM_LOCAL_STORAGE,
} from './types';

function addTask(task = {}) {
  return { type: ADD_TASK, payload: task };
}
function removeTask(id = {}) {
  return { type: REMOVE_TASK, payload: id };
}
function markTaskAsDone(id = {}) {
  return { type: MARK_TASK_AS_DONE, payload: id };
}
function markTaskAsUnDone(id = {}) {
  return { type: MARK_TASK_AS_UNDONE, payload: id };
}
function initProgressBar() {
  return { type: INIT_PROGRESS_BAR };
}
function updateProgressBar(actionType) {
  return { type: UPDATE_PROGREES_BAR, payload: actionType() };
}
function onAdd() {
  return ON_ADD;
}
function onRemove() {
  return ON_REMOVE;
}
function onDone() {
  return ON_DONE;
}
function onUndone() {
  return ON_UNDONE;
}

function setStoreToLocalStorage() {
  return {
    type: SET_STORE_TO_LOCAL_STORAGE,
  };
}
function getStoreFromLocalStorage() {
  return {
    type: GET_STORE_FROM_LOCAL_STORAGE,
  };
}

export {
  addTask,
  removeTask,
  markTaskAsDone,
  markTaskAsUnDone,
  initProgressBar,
  updateProgressBar,
  onAdd,
  onRemove,
  onDone,
  onUndone,
  setStoreToLocalStorage,
  getStoreFromLocalStorage,
};

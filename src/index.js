import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './redux/rootReducer.js';
import { refs } from './js/refs.js';
import { renderTask } from './js/renderTask.js';
import { insertTasktoHTML } from './js/insertTaskToHTML.js';
import {
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
  getStoreFromLocalStorage,
  setStoreToLocalStorage,
} from './redux/actions';

const store = configureStore({
  reducer: rootReducer,
});

window.store = store;

window.addEventListener('load', () => {
  store.dispatch(getStoreFromLocalStorage());
  const {
    tasksList,
    tasksTotal,
    lastUpdate,
    progressBar: { completed, currentProgress },
  } = store.getState();

  insertTasktoHTML(refs.tasksList, renderTask(tasksList));
  refs.lastUpdate.textContent = tasksTotal ? `last update: ${lastUpdate}` : '';
  refs.taskCounter.textContent = tasksTotal ? `${completed} of ${tasksTotal}` : 'no tasks added';
  refs.progressBar.style.strokeDashoffset = currentProgress;
});
refs.addTaskform.addEventListener('submit', onSubmitFormClick);
refs.tasksList.addEventListener('click', onTaskCardClick);

function onSubmitFormClick(e) {
  e.preventDefault();

  const taskName = e.target.elements.taskName.value;
  const taskDetails = e.target.elements.taskDetails.value;

  const newTask = {
    taskName,
    taskDetails,
  };

  store.subscribe(() => {
    const {
      tasksList,
      tasksTotal,
      lastUpdate,
      progressBar: { completed, currentProgress },
    } = store.getState();

    insertTasktoHTML(refs.tasksList, renderTask(tasksList));
    refs.lastUpdate.textContent = tasksTotal ? `last update: ${lastUpdate}` : '';
    refs.taskCounter.textContent = tasksTotal ? `${completed} of ${tasksTotal}` : 'no tasks added';
    refs.progressBar.style.strokeDashoffset = currentProgress;
  });

  store.dispatch(addTask(newTask));
  store.dispatch(initProgressBar());
  store.dispatch(updateProgressBar(onAdd));
  store.dispatch(setStoreToLocalStorage());

  e.target.reset();
}

function onTaskCardClick(e) {
  const isDeleteTaskBtnClicked = e.target.dataset.js === 'delete';
  const isCheckBoxClicked = e.target.dataset.js === 'checkbox';
  const isChecked = e.target.checked;

  if (isDeleteTaskBtnClicked) {
    const { id } = e.target.parentElement.dataset;

    store.dispatch(removeTask(id));
    store.dispatch(updateProgressBar(onRemove));
    store.dispatch(setStoreToLocalStorage());
  }
  if (isCheckBoxClicked) {
    const taskID = e.target.parentElement.parentElement.dataset.id;

    isChecked
      ? store.dispatch(markTaskAsDone(taskID)) &&
        store.dispatch(updateProgressBar(onDone)) &&
        store.dispatch(setStoreToLocalStorage())
      : store.dispatch(markTaskAsUnDone(taskID)) &&
        store.dispatch(updateProgressBar(onUndone)) &&
        store.dispatch(setStoreToLocalStorage());
  }
}

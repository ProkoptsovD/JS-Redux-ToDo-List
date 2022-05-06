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

export function rootReducer(state, action) {
  console.log(action.type);
  switch (action.type) {
    case ADD_TASK:
      const newTaskList = [...state.tasksList];
      const taskId = Date.now().toString();

      action.payload.id = taskId;
      action.payload.isDone = false;
      newTaskList.push(action.payload);

      return {
        ...state,
        noTasksAdded: false,
        lastUpdate: new Date().toLocaleString(action.payload),
        tasksList: newTaskList,
        tasksTotal: newTaskList.length,
      };

    case REMOVE_TASK:
      const filteredTasks = state.tasksList.filter(({ id }) => id !== action.payload);

      return {
        ...state,
        tasksList: filteredTasks,
        noTasksAdded: !Boolean(filteredTasks.length),
        lastUpdate: new Date().toLocaleString(),
        tasksTotal: filteredTasks.length,
      };

    case MARK_TASK_AS_DONE:
      const tasksListMarkedDone = [...state.tasksList].map(task => {
        if (task.id === action.payload) {
          return {
            ...task,
            isDone: true,
          };
        } else {
          return { ...task };
        }
      });

      return {
        ...state,
        tasksList: tasksListMarkedDone,
      };

    case MARK_TASK_AS_UNDONE:
      const tasksListMarkedUnDone = [...state.tasksList].map(task => {
        if (task.id === action.payload) {
          return {
            ...task,
            isDone: false,
          };
        } else {
          return { ...task };
        }
      });

      return {
        ...state,
        tasksList: tasksListMarkedUnDone,
      };

    case INIT_PROGRESS_BAR:
      let initialValue = -288.5;
      let tasksTotal = state.tasksTotal;
      const step = Math.abs(+initialValue / +tasksTotal);

      return {
        ...state,
        progressBar: {
          ...state.progressBar,
          initialValue,
          currentProgress: initialValue,
          step,
        },
      };

    case UPDATE_PROGREES_BAR:
      function updateProgressBar(action) {
        const initial = state.progressBar.initialValue;
        const currentStep =
          state.tasksList.length > 0
            ? state.progressBar.initialValue / state.tasksList.length
            : initial;
        const currentTasksDone = state.tasksList.filter(({ isDone }) => isDone).length;
        let currentProgress = state.progressBar.currentProgress;

        switch (action.payload) {
          case ON_ADD:
            currentProgress = initial + Math.abs(currentStep) * currentTasksDone;
            break;
          case ON_REMOVE:
            currentProgress = initial - currentStep * currentTasksDone;
            break;
          case ON_DONE:
            currentProgress = currentProgress - currentStep;
            break;
          case ON_UNDONE:
            currentProgress = currentProgress + currentStep;
            break;
          default:
            currentProgress = state.progressBar.currentProgress;
            break;
        }

        return {
          ...state,
          progressBar: {
            ...state.progressBar,
            currentProgress,
            step: currentStep,
            completed: currentTasksDone,
          },
        };
      }

      return updateProgressBar(action);

    case SET_STORE_TO_LOCAL_STORAGE:
      const currentStoreStateJSON = JSON.stringify(state);
      localStorage.setItem(state.TASKS_LOCAL_STORE_KEY, currentStoreStateJSON);

      return {
        ...state,
      };
    case GET_STORE_FROM_LOCAL_STORAGE:
      const currentStoreStateRaw = localStorage.getItem(state.TASKS_LOCAL_STORE_KEY);

      if (!currentStoreStateRaw) return { ...state };

      const currentStoreStateParsed = JSON.parse(currentStoreStateRaw);

      return {
        ...currentStoreStateParsed,
      };

    default:
      return {
        TASKS_LOCAL_STORE_KEY: 'current-store-state',
        tasksTotal: 0,
        noTasksAdded: true,
        lastUpdate: '',
        tasksList: [],
        progressBar: {},
      };
  }
}

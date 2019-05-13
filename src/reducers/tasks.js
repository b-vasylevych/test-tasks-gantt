import { takeLatest, put, call } from 'redux-saga/effects'

import api from '../api';

const LOAD_TASKS = 'LOAD_TASKS';
const LOAD_TASKS_SUCCESS = 'LOAD_TASKS_SUCCESS';
const LOAD_TASKS_FAILURE = 'LOAD_TASKS_FAILURE';

const UPDATE_FILTERED_TASKS = 'UPDATE_FILTERED_TASKS';

const ADD_TASK = 'ADD_TASK';
const ADD_TASK_SUCCESS = 'ADD_TASK_SUCCESS';
const ADD_TASK_FAILURE = 'ADD_TASK_FAILURE';

const initialState = {
  data: [],
  links: [],
  error: null,
  loading: false
};

export function tasksReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOAD_TASKS:
      return {
        ...state,
        error: null,
        loading: true
      };
    case LOAD_TASKS_SUCCESS:
      return {
        ...state,
        ...payload,
        loading: false,
      };
    case LOAD_TASKS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case ADD_TASK:
      return {
        ...state,
        error: null,
        loading: true
      };
    case ADD_TASK_SUCCESS:
      return {
        ...state,
        currentVacancy: action.currentVacancy,
        loading: false,
        error: null
      };
    case ADD_TASK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case UPDATE_FILTERED_TASKS:
      return {
        ...state,
        filteredTASKS: action.filteredTASKS
      };
    default:
      return state;
  }
}

export function* fetchTasks() {
  const result = yield call(api.fetchTasks);
  if (result) {
    yield put({ type: LOAD_TASKS_SUCCESS, payload: result })
  } else {
    yield put({ type: LOAD_TASKS_FAILURE, error: 'Something went wrong' })
  }
}

export function* addTask({ payload: { id, taskData } }) {
  debugger
  const result = yield call(api.addTask, { id, taskData });
  if (result) {
    yield put({ type: ADD_TASK_SUCCESS, result })
  } else {
    yield put({ type: ADD_TASK_FAILURE, error: 'Something went wrong' })
  }
}

export function* watchRequest() {
  yield takeLatest(LOAD_TASKS, fetchTasks);
  yield takeLatest(ADD_TASK, addTask);
}

export function onTasksFetch() {
  return {
    type: LOAD_TASKS
  };
}

export function onAddTask(id, taskData) {
  debugger
  return {
    type: ADD_TASK,
    payload: {
      id,
      taskData
    }
  };
}


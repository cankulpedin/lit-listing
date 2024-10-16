import { v4 as uuidv4 } from 'uuid';
import { PAGE_ELEMENT_COUNT } from '../pages/list/list-page.constants';

const INITIAL_STATE = {
  employees: [],
};

export const ADD = 'ADD';
export const GET_ALL = 'GET_ALL';
export const DELETE = 'DELETE';
export const UPDATE = 'UPDATE';

export const employeeSelector = (state, pageNumber) => {
  return state.employees.slice(
    (pageNumber - 1) * PAGE_ELEMENT_COUNT,
    pageNumber * PAGE_ELEMENT_COUNT,
  );
};

export const employeeCount = state => state.employees.length;

export const findEmployee = (state, id) => {
  return state.employees.find(e => e.id === id);
};

export const add = employee => {
  return {
    type: ADD,
    employee,
  };
};

export const deleteEmployee = id => {
  return {
    type: DELETE,
    id,
  };
};

export const updateEmployee = (id, newObject) => {
  return {
    type: UPDATE,
    id,
    newObject,
  };
};

export const getAll = () => {
  return {
    type: GET_ALL,
  };
};

function replaceEmployeeById(array, id, newObject) {
  const index = array.findIndex(obj => obj.id === id);

  if (index !== -1) {
    array[index] = { ...newObject, id: array[index].id };
  }

  return array;
}

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD:
      return {
        ...state,
        employees: [...state.employees, { ...action.employee, id: uuidv4() }],
      };
    case GET_ALL:
      return {
        employees: state.employees,
      };
    case DELETE:
      return {
        ...state,
        employees: state.employees.filter(e => e.id !== action.id),
      };
    case UPDATE:
      return {
        ...state,
        employees: replaceEmployeeById(
          state.employees,
          action.id,
          action.newObject,
        ),
      };
    default:
      return state;
  }
};

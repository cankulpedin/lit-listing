import { v4 as uuidv4 } from 'uuid';
import { PAGE_ELEMENT_COUNT } from '../pages/list/list-page.constants';

const INITIAL_STATE = {
  employees: [],
};

export const ADD = 'ADD';
export const GET_ALL = 'GET_ALL';

export const employeeSelector = (state, pageNumber) => {
  return state.employees.slice(
    (pageNumber - 1) * PAGE_ELEMENT_COUNT,
    pageNumber * PAGE_ELEMENT_COUNT,
  );
};

export const employeeCount = state => state.employees.length;

export const add = employee => {
  return {
    type: ADD,
    employee,
  };
};

export const getAll = () => {
  return {
    type: GET_ALL,
  };
};

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
    default:
      return state;
  }
};

const INITIAL_STATE = {
  employees: [],
};

export const ADD = 'ADD';
export const GET_ALL = 'GET_ALL';

export const employeeSelector = state => state.employees;

export const add = employee => {
  console.log(employee);
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
        employees: [...state.employees, action.employee],
      };
    case GET_ALL:
      return {
        employees: state.employees,
      };
    default:
      return state;
  }
};

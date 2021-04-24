import actions from '../actions/filterActions';

export const setFilter = (payload) => {
  return {
      ...actions.SET_FILTER,
      payload
  }
}

const filterReducer = (state = "", action) => {
  switch (action.type) {
      case actions.SET_FILTER.type:
          return action.payload
      default:
          return state
  }
}

export default filterReducer;
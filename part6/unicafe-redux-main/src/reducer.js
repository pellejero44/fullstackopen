const initialState = {
  good: 0,
  ok: 0,
  bad: 0,
};

const counterReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case '@counter/GOOD':
      return {
        ...state,
        good: state.good + 1,
      };
    case '@counter/OK':
      return {
        ...state,
        ok: state.ok + 1,
      };
    case '@counter/BAD':
      return {
        ...state,
        bad: state.bad + 1,
      };
    case '@counter/ZERO':
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default counterReducer;

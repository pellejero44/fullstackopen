import notificactionActions from '../actions/notificactionActions';

export const createNotification = (payload, time) => {
  return async (dispatch) => {
    dispatch({
      ...notificactionActions.CREATED,
      payload,
    });
    setTimeout(() => {
      dispatch({
        ...notificactionActions.DELETED,
      });
    }, time * 1000);
  };
};

export const deleteNotification = () => {
  return {
    ...notificactionActions.DELETED,
  };
};

const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case notificactionActions.CREATED.type:
      return action.payload;
    case notificactionActions.DELETED.type:
      return '';
    default:
      return state;
  }
};

export default notificationReducer;

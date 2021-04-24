import notificactionActions from '../actions/notificactionActions';

export const createNotification = (payload) => {
  return  {
    ...notificactionActions.CREATED,
    payload,
  }
};

export const deleteNotification = () => {
  return {
    ...notificactionActions.DELETED,
  }
}

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

module.exports = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({
      error: 'Value for id cannot be cast',
    });
  } else if(error.name === 'ValidationError'){
    return response.status(409).send({
      error: error.message,
    });
  } else {
    return response.status(500).send(
      error.response.data
    );
  }
};
